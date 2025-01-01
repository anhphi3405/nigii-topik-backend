const bodyparser = require("body-parser");
const cookieParser = require('cookie-parser');

const configExpress = (app) =>{
    app.use(bodyparser.urlencoded({ extended: false }));
    app.use(bodyparser.json());
    app.use(cookieParser());
}

module.exports = configExpress;