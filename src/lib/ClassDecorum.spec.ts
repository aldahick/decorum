import { expect } from "chai";

import { ClassDecorum, ClassTarget } from "./ClassDecorum";

const getBaseEquivalencyClass = <Args extends unknown[], Return>(
  decorum: ClassDecorum<Args, Return>,
  subject: Function,
  partial: Partial<(typeof decorum)["uses"][0]> = {},
  partialTarget: Partial<ClassTarget> = {}
): (typeof decorum)["uses"][0] => ({
  result: undefined,
  args: [] as unknown as Args,
  target: {
    name: subject.name,
    constructor: subject,
    methodNames: [],
    ...partialTarget
  },
  ...partial
});

describe("ClassDecorum", () => {
  it("should work", () => {
    const decorum = new ClassDecorum();
    @decorum.decorator()
    class DecorumSubject { }
    expect(decorum.uses).to.deep.equal([
      getBaseEquivalencyClass(decorum, DecorumSubject)
    ]);
  });
  it("should not require binding .decorator", () => {
    const decorum = new ClassDecorum();
    const decorator = decorum.decorator;
    @decorator()
    class DecorumSubject { }
    expect(decorum.uses).to.deep.equal([
      getBaseEquivalencyClass(decorum, DecorumSubject)
    ]);
  });
  it("should accept arguments", () => {
    const decorum = new ClassDecorum<[string]>();
    @decorum.decorator("foo")
    class DecorumSubject { }
    expect(decorum.uses).to.deep.equal([
      getBaseEquivalencyClass(decorum, DecorumSubject, {
        args: ["foo"]
      })
    ]);
  });
  it("should assign result correctly", () => {
    const decorum = new ClassDecorum(() => 2);
    @decorum.decorator()
    class DecorumSubject { }
    expect(decorum.uses).to.deep.equal([
      getBaseEquivalencyClass(decorum, DecorumSubject, {
        result: 2
      })
    ]);
  });
});
