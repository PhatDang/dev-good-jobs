import { compare } from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";

import { findOne, findById } from "../models/user";

export default passport => {
    // VALIDATE: {Email} && {Password}
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password"
            },
            (email, password, done) => {
                findOne({ email: email.toLowerCase() })
                    .then(user => {
                        // Check: MATCH EMAIL
                        if (!user) {
                            return done(null, false, {
                                message: `Email ${email} này không tìm thấy!`
                            });
                        }
                        // Check: MATCH PASSWORD
                        compare(
                            password,
                            user.password,
                            (err, isMatch) => {
                                if (err) throw err;
                                if (!isMatch) {
                                    return done(null, false, {
                                        message:
                                            "Mật khẩu không đúng, vui lòng thử lại!"
                                    });
                                }
                                return done(null, user);
                            }
                        );
                    })
                    .catch(err => console.log(err));
            }
        )
    );
    // Serialize Sessions:
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    // Deserialize Sessions:
    passport.deserializeUser((id, done) => {
        findById(id, (err, user) => {
            done(err, user);
        });
    });
};
