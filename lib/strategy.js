const STRATEGY_NAME = "cfuaa";

function Strategy(options, verify) {
  validateOptionsObject(options);

  if (verify === undefined) {
    throw new Error("Verify function was not defined");
  }

  this.name = STRATEGY_NAME;

  function validateOptionsObject(options) {
    if (options === undefined) {
      throw new Error("Options object was not defined");
    }

    if (options.authorizationURL === undefined) {
      throw new Error("Options object missing authorizationUrl");
    }

    if (options.tokenURL === undefined) {
      throw new Error("Options object missing tokenURL");
    }

    if (options.clientID === undefined) {
      throw new Error("Options object missing clientID");
    }

    if (options.clientSecret === undefined) {
      throw new Error("Options object missing clientSecret");
    }

    if (options.callbackURL === undefined) {
      throw new Error("Options object missing callbackURL");
    }
  }
}

module.exports = Strategy;
