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