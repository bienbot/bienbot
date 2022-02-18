import * as express from "express";
import { config } from "dotenv";
import routes from "../routes";
import * as cors from "cors";
import * as session from "express-session";
import * as passport from "passport";
import "../strategies/index";

config();

function createApp(): express.Express {
    const app = express();

    // Parsing middleware
    app.use(express.json());
    app.use(express.urlencoded());

    // Cors
    app.use(
        cors({
            origin: ["http://localhost:3000", "http://localhost:4200"],
            credentials: true,
        })
    );

    // Session
    app.use(
        session({
            secret: "bieniu lyczak",
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 24 * 7,
            },
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/api", routes);
    app.use("/", (req, res) => {
        req.user ? res.send(req.user) : res.status(401).send("Unauthorized");
    });

    return app;
}

export default createApp;
