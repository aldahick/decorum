import { BaseDecorum } from "./BaseDecorum";

export type ClassTarget = {
  name: string;
  constructor: Function;
  methodNames: string[];
};

export class ClassDecorum<Args extends any[] = [], ProcessResult = undefined>
  extends BaseDecorum<ClassTarget, ClassDecorator, Args, ProcessResult> {

  decorator = (...args: Args) => (constructor: Function) =>
    this.addUse({
      name: constructor.name,
      constructor,
      methodNames: Reflect.ownKeys(constructor.prototype)
        .filter(c => c !== "constructor") as string[]
    }, args)
}
