import passport from "passport";
import googleOAuth from "passport-google-oauth20";

//require('dotenv').config();

import { UserModel } from "../database/allModels";

const GoogleStrategy = googleOAuth.Strategy;

export default (passport) => {
    passport.use(
        new GoogleStrategy({
                clientID: "170115409508-a1b6uosqlgi5ppd1ttop2mg9jij1mjj1.apps.googleusercontent.com",
                clientSecret: "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",
                callbackURL: "http://localhost:5000/auth/google/callback",
            },
            async(accessToken, refreshToken, profile, done) => {
                //creating a new user
                const newUser = {
                    fullName: profile.displayName,
                    email: profile.emails[0].value,
                    profilePic: profile.photos[0].value
                };
                try {
                    //check whether user exists or not
                    const user = await UserModel.findOne({ email: newUser.email });


                    if (user) {
                        //generate jwt token
                        const token = user.generateJwtToken();

                        //return user
                        done(null, { user, token });
                    } else {
                        //creating a new user
                        const user = await UserModel.create(newUser);

                        //generate jwt token
                        const token = user.generateJwtToken();

                        //return user
                        done(null, { user, token });
                    }
                } catch (error) {
                    done(error, null);
                }
            }

        )
    );
    passport.serializeUser((userData, done) => done(null, {...userData }));

    passport.deserializeUser((id, done) => done(null, id));
};