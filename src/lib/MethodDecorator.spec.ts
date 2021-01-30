import { expect } from "chai";

import { MethodDecorum, MethodTarget } from "./MethodDecorum";

const getBaseEquivalencyClass = <Args extends unknown[], Return>(
  decorum: MethodDecorum<Args, Return>,
  partial: Partial<(typeof decorum)["uses"][0]> & {
    target: MethodTarget;
  }
): (typeof decorum)["uses"][0] => ({
  result: undefined,
  args: [] as unknown as Args,
  ...partial
});

describe("MethodDecorum", () => {
  it("should work", () => {
    const decorum = new MethodDecorum();
    class DecorumSubject {
      @decorum.decorator()
      foo(): void { }
    }
    expect(decorum.uses).to.deep.equal([
      getBaseEquivalencyClass(decorum, {
        target: {
          name: "foo",
          constructor: DecorumSubject.prototype,
          params: {},
          return: undefined
        }
      })
    ]);
  });
  it("should not require binding .decorator", () => {
    const decorum = new MethodDecorum();
    const decorator = decorum.decorator;
    class DecorumSubject {
      @decorator()
      foo(): void { }
    }
    expect(decorum.uses).to.deep.equal([
      getBaseEquivalencyClass(decorum, {
        target: {
          name: "foo",
          constructor: DecorumSubject.prototype,
          params: {},
          return: undefined
        }
      })
    ]);
  });
  it("should accept arguments", () => {
    const decorum = new MethodDecorum<[string]>();
    class DecorumSubject {
      @decorum.decorator("bar")
      foo(): void { }
    }
    expect(decorum.uses).to.deep.equal([
      getBaseEquivalencyClass(decorum, {
        args: ["bar"],
        target: {
          name: "foo",
          constructor: DecorumSubject.prototype,
          params: {},
          return: undefined
        }
      })
    ]);
  });
  it("should include parameters", () => {
    const decorum = new MethodDecorum();
    class DecorumSubject {
      @decorum.decorator()
      foo(a: number, b: string, c: {}): void {
        console.log(a, b, c);
      }
    }
    expect(decorum.uses).to.deep.equal([
      getBaseEquivalencyClass(decorum, {
        target: {
          name: "foo",
          constructor: DecorumSubject.prototype,
          params: {
            a: Number,
            b: String,
            c: Object
          },
          return: undefined
        }
      })
    ]);
  });
});
