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
    cyan,
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
require("./config/passport").default(passport);

// ===SETTINGS:
const log = console.log;
const app = express();
const PORT = process.env.PORT || 2019;

// ===CONNECT DATABASE MONGODB:
const MONGODB_URI =
    "mongodb://func_admin:8512930.Phat@ds147207.mlab.com:47207/heroku_wzkkq1xr";
connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() =>
        log(greenBright("Database connection ") + bgGreen.bold("SUCCESS"))
    )
    .catch((err) => log(redBright(err)));

const database = connection;
database.on("error", (err) => {
    log(
        whiteBright("Database connection ") +
            bgRed.bold("ERROR\n") +
            redBright(err.message)
    );
});

// ===EJS TEMPLATE:
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

// ===GET STATIC FILES:
app.use(static(join(__dirname, "static")));

// ===EXPRESS BODY PARSER:
app.use(morgan("dev"));
app.use(json());
app.use(
    urlencoded({
        extended: false,
    })
);
app.use(cookieParser());

// ===EXPRESS SESSION:
app.use(
    session({
        secret: "Good-Jobs",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 60000,
            secure: false,
        },
        store: new MongoStore({
            mongooseConnection: database,
        }),
    })
);

// ===PASSPORT MIDDLEWARE:
app.use(initialize());
app.use(_session());

// ===CONNECT FLASH:
app.use(flash());
app.use((req, res, next) => {
    res.locals.current_user = req.user;
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

// ===GET ROUTERS:
app.use("/", require("./routes/index").default);
app.use("/users", require("./routes/users").default);
// app.use('/hunters', require('./routes/hunters'));

// ===CATCH 404 Page:
app.use((_req, res, _next) => {
    res.status(404);
    res.render("pages/404");
});

// ===ERROR HANDLER:
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

// RUNNING SERVER ==>
app.listen(PORT, () => {
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

export default app;
