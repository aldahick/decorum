export abstract class BaseDecorum<Target, DecoratorType, Args extends any[], ProcessResult> {
  public readonly uses: {
    target: Target;
    args: Args;
    result?: ProcessResult;
  }[] = [];

  constructor(
    private readonly processor?: (target: Target, ...args: Args) => ProcessResult
  ) { }

  abstract decorator: (...args: Args) => DecoratorType;

  addUse(target: Target, args: Args) {
    this.uses.push({
      target, args,
      result: this.processor ? this.processor(target, ...args) : undefined
    });
  }
}
