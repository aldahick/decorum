import { expect } from "chai";
import { MethodDecorum, MethodTarget } from "./MethodDecorum";

function getBaseEquivalencyClass<Args extends any[], Return>(
  decorum: MethodDecorum<Args, Return>,
  partial: Partial<(typeof decorum)["uses"][0]> & {
    target: MethodTarget
  }
): (typeof decorum)["uses"][0] {
  return {
    result: undefined,
    args: [] as any,
    ...partial
  };
}

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
      foo() { }
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
});
