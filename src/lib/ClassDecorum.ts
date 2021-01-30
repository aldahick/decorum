import { BaseDecorum } from "./BaseDecorum";

export interface ClassTarget {
  name: string;
  constructor: Function;
  methodNames: string[];
}

export class ClassDecorum<Args extends unknown[] = [], ProcessResult = undefined>
  extends BaseDecorum<ClassTarget, ClassDecorator, Args, ProcessResult> {

  decorator = (...args: Args) => (constructor: Function): void =>
    this.addUse({
      name: constructor.name,
      constructor,
      methodNames: Reflect.ownKeys(constructor.prototype)
        .filter(c => c !== "constructor") as string[]
    }, args);
}
