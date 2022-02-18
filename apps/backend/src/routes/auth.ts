import { Router } from "express";
import * as passport from "passport";

const router = Router();

router.get("/discord", passport.authenticate("discord"), (req, res) =>
    res.send(200)
);

router.get("/", (req, res) => res.send(req.user));

router.get("/discord/redirect", passport.authenticate("discord"), (req, res) =>
    res.redirect("http://localhost:4200")
);

router.get("/status", (req, res) => {
    return req.user
        ? res.send(req.user)
        : res.status(401).send({ msg: "Unauthorized" });
});

export default router;
