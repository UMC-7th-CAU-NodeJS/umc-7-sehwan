import {
  addMission
} from "../repositories/mission.repository.js";

export const createMission = async (data) => {
  const joinStoreId = await addMission({
    store_id : data.store_id,
    name : data.name,
    description : data.description,
    award : data.award,
    award_point : data.award_point,
  });

  if (joinStoreId === null) {
    throw new Error("존재하지 않는 식당입니다.");
  }
};