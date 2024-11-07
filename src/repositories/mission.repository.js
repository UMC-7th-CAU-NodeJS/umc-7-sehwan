import { prisma } from "../db.config.js";

// Mission 추가
export const addMission = async (data) => {
  try {
    // Store 존재 여부 확인
    const storeExists = await prisma.stores.findUnique({
      where: { id: data.store_id }
    });

    if (!storeExists) {
      return null; // Store가 존재하지 않으면 null 반환
    }

    // Mission 삽입
    const mission = await prisma.missions.create({
      data: {
        storeId: data.store_id,
        name: data.name,
        description: data.description,
        award: data.award,
        awardPoint: data.award_point
      }
    });

    return mission.id; // 생성된 Mission의 ID 반환
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  }
};

// 특정 Store ID와 Mission ID가 유효한지 확인하는 함수
export const checkMissionExists = async (storeId, missionId) => {
  const mission = await prisma.missions.findFirst({
    where: {
      id: missionId,
      storeId: storeId
    }
  });

  return mission !== null; // 미션이 존재하면 true, 아니면 false 반환
};

// 사용자가 특정 미션에 이미 도전 중인지 확인하는 함수
export const checkUserChallengeExists = async (userId, missionId) => {
  const challenge = await prisma.acceptedMission.findFirst({
    where: {
      userId: userId,
      missionId: missionId
    }
  });

  return challenge !== null; // 도전 중인 미션이 있으면 true, 아니면 false 반환
};

// AcceptedMission 테이블에 새로운 도전 정보를 추가하는 함수
export const addChallenge = async (userId, missionId, dday) => {
  const challenge = await prisma.acceptedMission.create({
    data: {
      userId: userId,
      missionId: missionId,
      state: true, // 도전 중 상태 (boolean)
      dday: dday || null
    }
  });

  return challenge.id; // 생성된 AcceptedMission의 ID 반환
};
