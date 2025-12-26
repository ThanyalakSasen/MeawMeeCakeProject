const crypto = require("crypto");
const sendVerifyEmail = require("../utils/sendVerifyEmail");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/uers");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.BASE_URL + "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        // 🔹 LOGIN ครั้งแรก
        if (!user) {
          const customer = await Customer.create({
            customers_fullname: profile.displayName
          });

          const token = crypto.randomBytes(32).toString("hex");

          user = await User.create({
            email: profile.emails?.[0]?.value,
            googleId: profile.id,
            provider: "google",
            roleType: "CUSTOMER",
            refModel: "Customer",
            refId: customer._id,
            isVerified: false,
            emailVerifyToken: token,
            emailVerifyExpires: Date.now() + 24 * 60 * 60 * 1000
          });
           await sendVerifyEmail(user.email, token);
        }
        // ยังไม่ยืนยันอีเมล → login ไม่ได้
      if (!user.isVerified) {
        return done(null, false, {
          message: "Please verify your email first"
        });
      }

        return done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).populate("refId");
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
