import getParameterNames = require("get-parameter-names");
import { BaseDecorum } from "./BaseDecorum";

export type MethodTarget = {
  name: string;
  constructor: any;
  params: {[key: string]: Function};
  return?: Function;
};

export class MethodDecorum<Args extends any[] = [], ProcessResult = undefined>
  extends BaseDecorum<MethodTarget, MethodDecorator, Args, ProcessResult> {
  decorator = (...args: Args) => (constructor: any, name: string | symbol) => {
    const params: {[key: string]: Function} = {};
    const paramTypes: Function[] = Reflect.getMetadata("design:paramtypes", constructor, name);
    getParameterNames(constructor[name]).forEach((name, i) =>
      params[name] = paramTypes[i]
    );
    this.addUse({
      name: name.toString(),
      constructor,
      params,
      return: Reflect.getMetadata("design:returntype", constructor, name)
    }, args);
  }
}
