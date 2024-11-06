import {pool} from "../db.config.js";

export const addUser = async (data) => {
    const conn = await pool.getConnection();

    try{
        const [confirm] = await pool.query(
            `SELECT EXISTS(SELECT 1 FROM Users WHERE email = ?) as isExistEmail;`,
            data.email
        );

        if (confirm[0].isExistEmail){
            return null;
        }

        const [result] = await pool.query(
            `INSERT INTO Users (email, name, gender, birth, address, phonenum) VALUES (?,?,?,?,?,?);`,
            [
                data.email,
                data.name,
                data.gender,
                data.birth,
                data.address,
                data.phonenum,
            ]
        );

        return result.insertId;
    }catch(err){
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. )(${err})`
        );
    }finally{
        conn.release();
    }
};

export const getUser = async(userId) => {
    const conn = await pool.getConnection();

    try{
        const [user] = await pool.query(`SELECT * FROM Users WHERE id = ?;`, userId);

        console.log(user);

        if(user.length == 0){
            return null;
        }
        return user;
    } catch (err){
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally{
        conn.release();
    }
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  const conn = await pool.getConnection();

  try {
    await pool.query(
      `INSERT INTO Preference (food_id, user_id) VALUES (?, ?);`,
      [foodCategoryId, userId]
    );

    return;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [preferences] = await pool.query(
      "SELECT ufc.id, ufc.food_id, ufc.user_id, fcl.name " +
        "FROM Preference ufc JOIN Foods fcl on ufc.food_id = fcl.id " +
        "WHERE ufc.user_id = ? ORDER BY ufc.food_id ASC;",
      userId
    );

    return preferences;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};