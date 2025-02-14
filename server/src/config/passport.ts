import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "./db";

passport.serializeUser((user: any, done) =>{
  done(null, user.id);
})

passport.deserializeUser(async (id:string, done) =>{
  try {
      const user = await prisma.user.findFirst({
          where: {
              id: id
          }
      });
      done(null, user);
  } catch (error) {
      done(error, null);
  }
})


passport.use(
  new GoogleStrategy(
      {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          callbackURL: process.env.GOOGLE_CALLBACK_URL as string
      },
      async (accessToken, refreshToken, profile, done) => {
          try {
              let user = await prisma.user.findFirst({
                  where: {
                      socialId: profile.id,
                      provider: "google"
                  }
              });

              if(user){
                  return done(null, user);
              }

              // create new user if does not exist

              user = await prisma.user.create({
                  data: {
                      name: profile.displayName,
                      email: profile.emails?.[0].value || "",
                      socialId: profile.id,
                      provider: "google"
                  }
              })

              return done(null, user);
          } catch (error) {
              return done(error as Error, undefined);
          }
      }
  )
)

export default passport;
