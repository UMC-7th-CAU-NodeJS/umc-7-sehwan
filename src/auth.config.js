import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";

dotenv.config();

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);
const googleVerify = async (profile) => {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      throw new Error(`profile.email was not found: ${profile}`);
    }
  
    // 기존 사용자 확인
    const user = await prisma.users.findFirst({ where: { email } });
    if (user !== null) {
      return { id: user.id, email: user.email, name: user.name };
    }
  
    // 새로운 사용자 생성
    const created = await prisma.users.create({
      data: {
        email,
        name: profile.displayName,
        gender: "추후 수정", // gender는 nullable
        birth: new Date(1970, 0, 1), // 기본값을 1970-01-01로 설정
        address: "추후 수정", // address는 nullable
        phonenum: null, // phonenum 필드는 Int 타입
        status: false, // status는 Boolean
      },
    });
  
    return { id: created.id, email: created.email, name: created.name };
  };

  import { Strategy as KakaoStrategy } from "passport-kakao";

export const kakaoStrategy = new KakaoStrategy(
  {
    clientID: process.env.KAKAO_CLIENT_ID,
    clientSecret: process.env.KAKAO_CLIENT_SECRET, // Client Secret (선택)
    callbackURL: process.env.KAKAO_REDIRECT_URI,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // 사용자 정보 처리 로직
      const user = {
        id: profile.id,
        username: profile.username || profile.displayName,
        email: profile._json?.kakao_account?.email || null,
        profileImage: profile._json?.kakao_account?.profile?.profile_image_url || null,
      };
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
);
