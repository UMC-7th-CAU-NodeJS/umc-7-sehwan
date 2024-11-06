import {pool} from "../db.config.js";

// Review 데이터 삽입
export const setReview = async(data)=>{
    const conn = await pool.getConnection();

    try {
        const [confirm] = await pool.query(
            `SELECT EXISTS(SELECT 1 FROM Stores WHERE id = ?) as isExistStore;`,
            [data.store_id]
        );

        if(confirm[0].isExistStore){
            return null;
        }
        const [result] = await pool.query(
            `INSERT INTO Reviews (user_id, store_id, mission_id, content, rating ) VALUES (?,?,?,?,?)`,
            [
                data.user_id,
                data.store_id,
                data.mission_id,
                data.content,
                data.rating,
            ]
        );
        return result.insertId;
    }catch(err){
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해 주세요. (${err})`
        );
    }finally{
        conn.release();
    }
};

export const setImage = async (reviewId, imageUrl) => {
    const conn = await pool.getConnection();

    try{
        const [imageResult] = await pool.query(
            `INSERT INTO Images (url) VALUES (?)`,
            [imageUrl]
        );
        const imgId = imageResult.insertId;

        await conn.query(
            `INSERT INTO ReviewImg (img_id, review_id) VALUES (?, ?);`,
            [imgId, reviewId]
          );
    }catch(err){
        throw new Error(
            `이미지 저장에 문제가 생겼습니다. (${err})`
        );
    } finally{
        conn.release();
    }
};