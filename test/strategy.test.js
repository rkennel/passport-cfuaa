const CFUAAStrategy = require("../lib/strategy");

function defaultOptions() {
    return {
        authorizationURL: "https://login.com/oauth/authorize",
        tokenURL: "https://login.com/oauth/authorize",
        clientID: "ABC-123-DEF-456",
        clientSecret: "XYZ-789-UVW-123",
        callbackURL: "https://app.com/callback"
    }
};

const doNothing = function () {
};

test("A newly created strategy has the name cfuaa", () => {
    const strategy = new CFUAAStrategy(defaultOptions(), doNothing);
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
        "CffUaaStrategy requires a authorizationURL option"
    );
});

test("If options object missing authorizationURL then throw error", () => {
  const options = defaultOptions();
  options.authorizationURL = undefined;

    validateStrategyInitialization(
        options,
        doNothing,
        "CffUaaStrategy requires a authorizationURL option"
    );
});

test("If options object missing tokenURL then throw error", () => {
  const options = defaultOptions();
  options.tokenURL = undefined;

    validateStrategyInitialization(
        options,
        doNothing,
        "CffUaaStrategy requires a tokenURL option"
    );
});

test("If options object missing clientID then throw error", () => {
  const options = defaultOptions();
  options.clientID = undefined;

    validateStrategyInitialization(
        options,
        doNothing,
        "CffUaaStrategy requires a clientID option"
    );
});

test("If options object missing clientSecret then throw error", () => {
  const options = defaultOptions();
  options.clientSecret = undefined;

    validateStrategyInitialization(
        options,
        doNothing,
        "CffUaaStrategy requires a clientSecret option"
    );
});

test("If options object missing callbackURL then throw error", () => {
    const options = defaultOptions();
    options.callbackURL = undefined;

    validateStrategyInitialization(
        defaultOptions,
        doNothing,
        "CffUaaStrategy requires a authorizationURL option"
    );
});

test("If no verify function specified than it throws error", () => {
    validateStrategyInitialization(
        defaultOptions(),
        undefined,
        "CffUaaStrategy requires a verify callback"
    );
});
