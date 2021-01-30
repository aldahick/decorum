import getParameterNames from "get-parameter-names";

import { BaseDecorum } from "./BaseDecorum";

export interface MethodTarget {
  name: string;
  constructor: Object;
  params: {[key: string]: Function};
  return?: Function;
}

export class MethodDecorum<Args extends unknown[] = [], ProcessResult = undefined>
  extends BaseDecorum<MethodTarget, MethodDecorator, Args, ProcessResult> {
  decorator = (...args: Args) => (constructor: Object, name: string | symbol): void => {
    const params: {[key: string]: Function} = {};
    const paramTypes = Reflect.getMetadata("design:paramtypes", constructor, name) as Function[];
    const func = (constructor as unknown as {[key: string]: Function})[name.toString()];
    getParameterNames(func).forEach((paramName, i) =>
      params[paramName] = paramTypes[i]
    );
    this.addUse({
      name: name.toString(),
      constructor,
      params,
      return: Reflect.getMetadata("design:returntype", constructor, name) as Function
    }, args);
  };
}
