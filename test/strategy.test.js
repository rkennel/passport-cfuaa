const CFUAAStrategy = require("../lib/strategy");

const OAuth2 = require("oauth").OAuth2;
const InternalOAuthError = require("passport-oauth2").InternalOAuthError;
function defaultOptions() {
  return {
    authorizationURL: "https://login.com/oauth/authorize",
    tokenURL: "https://login.com/oauth/authorize",
    userInfoURL: "https://lgoin.com/userinfo",
    clientID: "ABC-123-DEF-456",
    clientSecret: "XYZ-789-UVW-123",
    callbackURL: "https://app.com/callback"
  };
}

function validateStrategyInitialization(options, expectedErrorMessage) {
  let error = undefined;

  try {
    const strategy = new CFUAAStrategy(options);
  } catch (e) {
    error = e;
  }

  expect(error.message).toEqual(expectedErrorMessage);
}

describe("Instantiating Strategy", () => {
  test("If no profileLookup function specified than it uses a default method and does not throw an error", () => {
    const strategy = new CFUAAStrategy(defaultOptions());
  });

  test("If no options object specified than it throws error", () => {
    validateStrategyInitialization(
      undefined,
      "CffUaaStrategy requires a authorizationURL option"
    );
  });

  test("If options object missing authorizationURL then throw error", () => {
    const options = defaultOptions();
    options.authorizationURL = undefined;

    validateStrategyInitialization(
      options,
      "CffUaaStrategy requires a authorizationURL option"
    );
  });

  test("If options object missing tokenURL then throw error", () => {
    const options = defaultOptions();
    options.tokenURL = undefined;

    validateStrategyInitialization(
      options,
      "CffUaaStrategy requires a tokenURL option"
    );
  });

  test("If options object missing userInfoURL then throw error", () => {
    const options = defaultOptions();
    options.userInfoURL = undefined;

    validateStrategyInitialization(
      options,
      "CffUaaStrategy requires a userInfoURL option"
    );
  });

  test("If options object missing clientID then throw error", () => {
    const options = defaultOptions();
    options.clientID = undefined;

    validateStrategyInitialization(
      options,
      "CffUaaStrategy requires a clientID option"
    );
  });

  test("If options object missing clientSecret then throw error", () => {
    const options = defaultOptions();
    options.clientSecret = undefined;

    validateStrategyInitialization(
      options,
      "CffUaaStrategy requires a clientSecret option"
    );
  });

  test("If options object missing callbackURL then throw error", () => {
    const options = defaultOptions();
    options.callbackURL = undefined;

    validateStrategyInitialization(
      defaultOptions,
      "CffUaaStrategy requires a authorizationURL option"
    );
  });

  test("A newly created strategy has the name cfuaa", () => {
    const strategy = new CFUAAStrategy(defaultOptions());
    expect(strategy.name).toEqual("cfuaa");
  });
});

describe("User Profile Function", () => {
  function instantiateStrategyWithOauthDouble(err, json) {
    const options = defaultOptions();

    const strategy = new CFUAAStrategy(options);

    const mockGet = jest.fn();
    mockGet.mockReturnValue(json);

    const oauth2Double = new OAuth2(
      options.clientID,
      options.clientSecret,
      "",
      options.authorizationURL,
      options.tokenURL,
      options.customHeaders
    );

    oauth2Double.__proto__.get = function(url, access_token, callback) {
      callback(err, json);
    };

    strategy._oauth2 = oauth2Double;
    return strategy;
  }

  test("Under normal circumstances, it will retrieve profile from call to user info", () => {
    const err = undefined;

    const profile = {
      user_id: "3fd2b704-e40c-4a65-88d2-f887965568e4",
      user_name: "fCQELg@test.org",
      given_name: "PasswordResetUserFirst",
      family_name: "PasswordResetUserLast",
      phone_number: "+15558880000",
      email: "fCQELg@test.org",
      email_verified: true,
      previous_logon_time: null,
      sub: "3fd2b704-e40c-4a65-88d2-f887965568e4",
      name: "PasswordResetUserFirst PasswordResetUserLast"
    };

    const strategy = instantiateStrategyWithOauthDouble(
      err,
      JSON.stringify(profile)
    );

    const mockCallback = jest.fn((err, profile) => {});

    strategy.userProfile("", mockCallback);

    expect(mockCallback.mock.calls[0][0]).toEqual(null);
    expect(mockCallback.mock.calls[0][1]).toEqual(profile);
  });

  test("If error during request then pass error to callback", () => {
    const err = new Error("Could not get user info");
    const json = "";
    const strategy = instantiateStrategyWithOauthDouble(
      err,
      JSON.stringify(json)
    );

    const mockCallback = jest.fn((err, profile) => {});

    const expectedError = new InternalOAuthError(
      "Failed to fetch user profile",
      err
    );

    strategy.userProfile("", mockCallback);

    expect(mockCallback.mock.calls[0][0]).toEqual(expectedError);
    expect(mockCallback.mock.calls[0][1]).toEqual(null);
  });
});
