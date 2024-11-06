import { pool } from "../db.config.js";

// User 데이터 삽입
export const addMission = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM Stores WHERE id = ?) as isExistStore;`,
      [data.store_id]
    );

    if (!confirm[0].isExistStore) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO Missions (store_id, name, description, award, award_point) VALUES (?, ?, ?, ?, ?);`,
      [data.store_id, data.name, data.description, data.award, data.award_point]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
// mission.repository.js

// 특정 Store ID와 Mission ID가 유효한지 확인하는 함수
export const checkMissionExists = async (conn, storeId, missionId) => {
    const [missionResult] = await conn.query(
      `SELECT id FROM Missions WHERE id = ? AND store_id = ?;`,
      [missionId, storeId]
    );
    return missionResult.length > 0;
  };
  
  // 사용자가 특정 미션에 이미 도전 중인지 확인하는 함수
  export const checkUserChallengeExists = async (conn, userId, missionId) => {
    const [existingChallenge] = await conn.query(
      `SELECT id FROM AcceptedMission WHERE user_id = ? AND mission_id = ?;`,
      [userId, missionId]
    );
    return existingChallenge.length > 0;
  };
  
  // AcceptedMission 테이블에 새로운 도전 정보를 추가하는 함수
  export const addChallenge = async (conn, userId, missionId, dday) => {
    const [result] = await conn.query(
      `INSERT INTO AcceptedMission (user_id, mission_id, state, dday) 
       VALUES (?, ?, ?, ?);`,
      [
        userId,       // 도전하는 사용자 ID
        missionId,    // 도전할 미션 ID
        1,            // 미션 상태 (1 = 도전 중)
        dday || null  // dday가 null일 수 있음
      ]
    );
    return result.insertId; // 삽입된 AcceptedMission의 ID 반환
  };
