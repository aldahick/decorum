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
});
