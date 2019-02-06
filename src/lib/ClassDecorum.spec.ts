import { expect } from "chai";
import { ClassDecorum } from "./ClassDecorum";

describe("ClassDecorum", () => {
  it("should work", () => {
    const decorum = new ClassDecorum();
    @decorum.decorator()
    class DecorumSubject {
      foo = 2;
      bar() { }
    }
    expect(decorum.uses).to.deep.equal([{
      result: undefined,
      args: [],
      target: {
        name: "DecorumSubject",
        constructor: DecorumSubject,
        methodNames: ["bar"]
      }
    }]);
  });
  it("should not require binding .decorator", () => {
    const decorum = new ClassDecorum();
    const decorator = decorum.decorator;
    @decorator()
    class DecorumSubject { }
    expect(decorum.uses).to.deep.equal([{
      result: undefined,
      args: [],
      target: {
        name: "DecorumSubject",
        constructor: DecorumSubject,
        methodNames: []
      }
    }]);
  });
  it("should accept arguments", () => {
    const decorum = new ClassDecorum<[string]>();
    @decorum.decorator("foo")
    class DecorumSubject { }
    expect(decorum.uses).to.deep.equal([{
      result: undefined,
      args: ["foo"],
      target: {
        name: "DecorumSubject",
        constructor: DecorumSubject,
        methodNames: []
      }
    }]);
  });
});
