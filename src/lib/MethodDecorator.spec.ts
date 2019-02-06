import { expect } from "chai";
import { MethodDecorum } from "./MethodDecorum";

describe("MethodDecorum", () => {
  it("should work", () => {
    const decorum = new MethodDecorum();
    class DecorumSubject {
      @decorum.decorator()
      foo(bar: string): number { return Number(bar); }
    }
    expect(decorum.uses).to.deep.equal([{
      result: undefined,
      args: [],
      target: {
        name: "foo",
        constructor: DecorumSubject.prototype,
        params: {
          bar: String
        },
        return: Number
      }
    }]);
  });
  it("should not require binding .decorator", () => {
    const decorum = new MethodDecorum();
    const decorator = decorum.decorator;
    class DecorumSubject {
      @decorator()
      foo() { }
    }
    expect(decorum.uses).to.deep.equal([{
      result: undefined,
      args: [],
      target: {
        name: "foo",
        constructor: DecorumSubject.prototype,
        params: {},
        return: undefined
      }
    }]);
  });
  it("should accept arguments", () => {
    const decorum = new MethodDecorum<[string]>();
    class DecorumSubject {
      @decorum.decorator("foo")
      bar() { }
    }
    expect(decorum.uses).to.deep.equal([{
      result: undefined,
      args: ["foo"],
      target: {
        name: "bar",
        constructor: DecorumSubject.prototype,
        params: {},
        return: undefined
      }
    }]);
  });
});
