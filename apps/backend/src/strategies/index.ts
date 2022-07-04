import * as passport from "passport";
import { Profile, Strategy } from "passport-discord";
import { VerifyCallback } from "passport-oauth2";
import "../../services/firebase";
const admin = require("firebase-admin");

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new Strategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
            callbackURL: process.env.DISCORD_CALLBACK_URL,
            scope: ["identify", "email", "guilds"],
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: VerifyCallback
        ) => {
            try {
                const database = admin.firestore();
                const userRef = database.collection("users");
                // Update user data
                await userRef.doc(profile.id).set(profile);
                return done(null, profile);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);
