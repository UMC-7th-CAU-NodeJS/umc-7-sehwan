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
