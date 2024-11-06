export const challengeMissionDTO = (storeId, missionId, body) => {
    // 요청 본문에서 필요한 데이터 추출
    const user_id = body.user_id;
    const dday = body.dday ? new Date(body.dday) : null;
  
    // 필수 데이터 검증
    if (!user_id) {
      throw new Error("user_id가 누락되었습니다.");
    }
  
    if (!storeId || !missionId) {
      throw new Error("storeId 또는 missionId가 누락되었습니다.");
    }
  
    // DTO 객체 반환
    return {
      storeId,
      missionId,
      user_id,
      dday
    };
  };
  