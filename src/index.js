import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import {handleUserSignUp, handleUserMission,handleUserReviews} from "./controllers/user.controller.js";
import { handleAddReview } from "./controllers/review.controller.js";
import { handleCreateMission, handleChallengeMission } from "./controllers/mission.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/addReview", handleAddReview);
app.post("/api/v1/mission/addMission", handleCreateMission);
app.post("/api/stores/:storeId/missions/:missionId/challenge", handleChallengeMission);
app.get("/api/v1/:userId/missions", handleUserMission);
app.get("/api/v1/:userId/myReviews", handleUserReviews);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});