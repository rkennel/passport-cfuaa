const STRATEGY_NAME = "cfuaa";

const OAuth2Strategy = require("passport-oauth2")

class CffUaaStrategy extends OAuth2Strategy {

    constructor(options, verify) {

      try{
        super(options, verify);
      }
      catch(e){
        const message = e.message.replace("OAuth2Strategy","CffUaaStrategy");
        e.message = message;
        throw e;
      }

        validateOptionsObject(options);

        if (verify === undefined) {
            throw new Error("Verify function was not defined");
        }

        this.name = STRATEGY_NAME;
    }

}

function validateOptionsObject(options) {
    if (options === undefined) {
        throw new Error("Options object was not defined");
    }

    if (options.clientSecret === undefined) {
        throw new Error("CffUaaStrategy requires a clientSecret option");
    }

}

module.exports = CffUaaStrategy;
