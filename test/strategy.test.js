const CFUAAStrategy = require("../lib/strategy");

const defaultOptions = {
  authorizationURL: "",
  tokenURL: "",
  clientID: "",
  clientSecret: "",
  callbackURL: ""
};

const doNothing = function() {};

test("A newly created strategy has the name cfuaa", () => {
  const strategy = new CFUAAStrategy(defaultOptions, () => {});
  expect(strategy.name).toEqual("cfuaa");
});

function validateStrategyInitialization(options, verify, expectedErrorMessage) {
  let error = undefined;

  try {
    const strategy = new CFUAAStrategy(options, verify);
  } catch (e) {
    error = e;
  }

  expect(error.message).toEqual(expectedErrorMessage);
}

test("If no options object specified than it throws error", () => {
  validateStrategyInitialization(
    undefined,
    doNothing,
    "Options object was not defined"
  );
});

test("If options object missing authorizationURL then throw error", () => {
  const options = {
    tokenURL: "",
    clientID: "",
    clientSecret: "",
    callbackURL: ""
  };

  validateStrategyInitialization(
    options,
    doNothing,
    "Options object missing authorizationUrl"
  );
});

test("If options object missing tokenURL then throw error", () => {
  const options = {
    authorizationURL: "",
    clientID: "",
    clientSecret: "",
    callbackURL: ""
  };

  validateStrategyInitialization(
    options,
    doNothing,
    "Options object missing tokenURL"
  );
});

test("If options object missing clientID then throw error", () => {
  const options = {
    authorizationURL: "",
    tokenURL: "",
    clientSecret: "",
    callbackURL: ""
  };

  validateStrategyInitialization(
    options,
    doNothing,
    "Options object missing clientID"
  );
});

test("If options object missing clientSecret then throw error", () => {
  const options = {
    authorizationURL: "",
    tokenURL: "",
    clientID: "",
    callbackURL: ""
  };

  validateStrategyInitialization(
    options,
    doNothing,
    "Options object missing clientSecret"
  );
});

test("If options object missing callbackURL then throw error", () => {
  const options = {
    authorizationURL: "",
    tokenURL: "",
    clientID: "",
    clientSecret: ""
  };
  validateStrategyInitialization(
    options,
    doNothing,
    "Options object missing callbackURL"
  );
});

test("If no verify function specified than it throws error", () => {
  validateStrategyInitialization(
    defaultOptions,
    undefined,
    "Verify function was not defined"
  );
});
