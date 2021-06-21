import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User"

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // Match Email's User
      const user = await User.findOne({ email: email });
      //done es un callback que determina como termina la autentiacion, sea con un usuario o un error
      if (!user) {
        return done(null, false, { message: "Not User found." }); //donde (user, error, message)
      } else {
        // Match Password's User
        const match = await user.matchPassword(password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password." });
        }
      }
    }
  )
);
//tomar un usuario y un callback, para que el usuario solo se identifique una sola vez
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
