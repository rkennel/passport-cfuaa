const STRATEGY_NAME = "cfuaa";

const OAuth2Strategy = require("passport-oauth2");
const InternalOAuthError = require("passport-oauth2").InternalOAuthError;

class CffUaaStrategy extends OAuth2Strategy {
  constructor(options, profileVerification) {
    if (profileVerification === undefined) {
      profileVerification = async (
        req,
        accessToken,
        refreshToken,
        profile,
        done
      ) => {
        done(null, profile);
      };
    }

    try {
      super(options, profileVerification);
    } catch (e) {
      const message = e.message.replace("OAuth2Strategy", "CffUaaStrategy");
      e.message = message;
      throw e;
    }

    this.validateOptionsObject(options);

    this.userInfoURL = options.userInfoURL;

    this.name = STRATEGY_NAME;
  }

  validateOptionsObject(options) {
    if (options.userInfoURL === undefined) {
      throw new Error("CffUaaStrategy requires a userInfoURL option");
    }

    if (options.clientSecret === undefined) {
      throw new Error("CffUaaStrategy requires a clientSecret option");
    }
  }

  userProfile(accessToken, doneCallback) {
    this._oauth2.get(this.userInfoURL, accessToken, function(err, body, res) {
      if (err) {
        doneCallback(
          new InternalOAuthError("Failed to fetch user profile", err),
          null
        );
      }

      let profile;

      try {
        profile = JSON.parse(body);
        doneCallback(null, profile);
      } catch (ex) {
        doneCallback(ex, null);
      }
    });
  }
}

module.exports = CffUaaStrategy;
