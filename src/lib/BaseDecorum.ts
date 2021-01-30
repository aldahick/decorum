export abstract class BaseDecorum<Target, DecoratorType, Args extends unknown[], ProcessResult> {
  readonly uses: {
    target: Target;
    args: Args;
    result?: ProcessResult;
  }[] = [];

  constructor(
    private readonly processor?: (target: Target, ...args: Args) => ProcessResult
  ) { }

  addUse(target: Target, args: Args): void {
    this.uses.push({
      target, args,
      result: this.processor ? this.processor(target, ...args) : undefined
    });
  }

  abstract decorator(...args: Args): DecoratorType;
}
