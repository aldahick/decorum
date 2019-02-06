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
});
