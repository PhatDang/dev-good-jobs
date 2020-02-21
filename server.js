/* eslint-disable semi */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-curly-newline */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
// ===============================
/**
 * SETUP DEPENDENCY:
 */
import { json, urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import {
    greenBright,
    bgGreen,
    redBright,
    whiteBright,
    bgRed,
    yellowBright,
    cyan
} from "chalk";
import express, { static } from "express";
import flash from "connect-flash";
import morgan from "morgan";
import { connect, connection } from "mongoose";
import { join } from "path";
import passport, { initialize, session as _session } from "passport";
import session from "express-session";

const MongoStore = require("connect-mongo")(session);

// ===CONFIG MIDDLEWARE:
require("./config/passport")(passport);

// ===SETTINGS:
const log = console.log;
const goodjob = express();
const PORT = process.env.PORT || 2019;

// ===CONNECT DATABASE MONGODB:
const MONGODB_URI =
    "mongodb://func_admin:8512930.Phat@ds147207.mlab.com:47207/heroku_wzkkq1xr";
connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() =>
        log(greenBright("Database connection ") + bgGreen.bold("SUCCESS"))
    )
    .catch(err => log(redBright(err)));

const database = connection;
database.on("error", err => {
    log(
        whiteBright("Database connection ") +
            bgRed.bold("ERROR\n") +
            redBright(err.message)
    );
});

// ===EJS TEMPLATE:
goodjob.set("views", join(__dirname, "views"));
goodjob.set("view engine", "ejs");

// ===GET STATIC FILES:
goodjob.use(static(join(__dirname, "static")));

// ===EXPRESS BODY PARSER:
goodjob.use(morgan("dev"));
goodjob.use(json());
goodjob.use(
    urlencoded({
        extended: false
    })
);
goodjob.use(cookieParser());

// ===EXPRESS SESSION:
goodjob.use(
    session({
        secret: "Good-Jobs",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 60000,
            secure: false
        },
        store: new MongoStore({
            mongooseConnection: database
        })
    })
);

// ===PASSPORT MIDDLEWARE:
goodjob.use(initialize());
goodjob.use(_session());

// ===CONNECT FLASH:
goodjob.use(flash());
goodjob.use((req, res, next) => {
    res.locals.current_user = req.user;
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

// ===GET ROUTERS:
goodjob.use("/", require("./routes/index"));
goodjob.use("/users", require("./routes/users"));
// goodjob.use('/hunters', require('./routes/hunters'));

// ===CATCH 404:
goodjob.use((_req, res, _next) => {
    res.status(404);
    res.render("pages/404");
});

// ===ERROR HANDLER:
goodjob.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

// LOADING SERVER...
goodjob.listen(PORT, () => {
    log(
        whiteBright("SERVER STARTED, CLICK [Ctrl] + ") +
            yellowBright(`http://localhost:${PORT}`)
    );
    log(
        `${whiteBright(" Press ") + cyan("[Ctrl] + [C]")} to ${bgRed.bold(
            "STOP\n"
        )}`
    );
});

export default goodjob;
