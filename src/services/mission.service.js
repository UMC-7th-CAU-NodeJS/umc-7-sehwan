import { pool } from "../db.config.js";
import { checkMissionExists, checkUserChallengeExists, addChallenge } from "../repositories/mission.repository.js";

export const challengeMission = async (dto) => {
  const conn = await pool.getConnection();
  
  try {
    await conn.beginTransaction(); // 트랜잭션 시작

    // 1. Mission ID와 Store ID가 유효한지 확인
    const missionExists = await checkMissionExists(conn, dto.storeId, dto.missionId);
    if (!missionExists) {
      throw new Error("해당 미션 또는 가게가 유효하지 않습니다.");
    }

    // 2. 사용자가 이미 도전 중인지 확인
    const challengeExists = await checkUserChallengeExists(conn, dto.user_id, dto.missionId);
    if (challengeExists) {
      throw new Error("이미 도전 중인 미션입니다.");
    }

    // 3. AcceptedMission 테이블에 미션 도전 정보 삽입
    const acceptedMissionId = await addChallenge(conn, dto.user_id, dto.missionId, dto.dday);

    await conn.commit(); // 트랜잭션 커밋
    return acceptedMissionId; // 삽입된 AcceptedMission의 ID 반환
  } catch (err) {
    await conn.rollback(); // 오류 발생 시 롤백
    throw new Error(`미션 도전 중 오류가 발생했습니다: ${err.message}`);
  } finally {
    conn.release(); // 연결 해제
  }
};
