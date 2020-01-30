const test = require("ava");
const CFUAAStrategy = require("../lib/strategy");

test("A newly created strategy has the name cfuaa", t => {
  const strategy = new CFUAAStrategy();
  t.is(strategy.name, "cfuaa");
});
