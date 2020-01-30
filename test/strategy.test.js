const test = require("ava");
const CFUAAStrategy = require("../lib/strategy");

const defaultOptions = {
  authorizationURL: "",
  tokenURL: "",
  clientID: "",
  clientSecret: "",
  callbackURL: ""
};

test("A newly created strategy has the name cfuaa", t => {
  const strategy = new CFUAAStrategy(defaultOptions, () => {});
  t.is(strategy.name, "cfuaa");
});

test("If no options object specified than it throws error", t => {
  const error = t.throws(() => {
    const strategy = new CFUAAStrategy();
  });

  t.is(error.message, "Options object was not defined");
});

test("If options object missing authorizationURL then throw error", t => {
  const options = {
    tokenURL: "",
    clientID: "",
    clientSecret: "",
    callbackURL: ""
  };

  const error = t.throws(() => {
    const strategy = new CFUAAStrategy(options, () => {});
  });

  t.is(error.message, "Options object missing authorizationUrl");
});

test("If options object missing tokenURL then throw error", t => {
  const options = {
    authorizationURL: "",
    clientID: "",
    clientSecret: "",
    callbackURL: ""
  };

  const error = t.throws(() => {
    const strategy = new CFUAAStrategy(options, () => {});
  });

  t.is(error.message, "Options object missing tokenURL");
});

test("If options object missing clientID then throw error", t => {
  const options = {
    authorizationURL: "",
    tokenURL: "",
    clientSecret: "",
    callbackURL: ""
  };

  const error = t.throws(() => {
    const strategy = new CFUAAStrategy(options, () => {});
  });

  t.is(error.message, "Options object missing clientID");
});

test("If options object missing clientSecret then throw error", t => {
  const options = {
    authorizationURL: "",
    tokenURL: "",
    clientID: "",
    callbackURL: ""
  };

  const error = t.throws(() => {
    const strategy = new CFUAAStrategy(options, () => {});
  });

  t.is(error.message, "Options object missing clientSecret");
});

test("If options object missing callbackURL then throw error", t => {
  const options = {
    authorizationURL: "",
    tokenURL: "",
    clientID: "",
    clientSecret: ""
  };

  const error = t.throws(() => {
    const strategy = new CFUAAStrategy(options, () => {});
  });

  t.is(error.message, "Options object missing callbackURL");
});

test("If no verify function specified than it throws error", t => {
  const error = t.throws(() => {
    const strategy = new CFUAAStrategy(defaultOptions);
  });

  t.is(error.message, "Verify function was not defined");
});

/*
        authorizationURL: 'https://fd-usr-sso.login.sys.pd01.edc1.cf.ford.com/oauth/authorize',
        tokenURL: 'https://fd-usr-sso.login.sys.pd01.edc1.cf.ford.com/oauth/token',
        clientID: "fd3fe881-8c27-476c-9f9f-0ce63c683792",
        clientSecret: "5a176800-92e2-4db9-bb72-65651ec9be50",
        callbackURL: "https://pdo-metrics-api.apps.pd01i.edc1.cf.ford.com/callback",
 */
