const auth = function (req, res, next) {
    console.log("Authenticating...");
    next();
}

module.exports = auth;