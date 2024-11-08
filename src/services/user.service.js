import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  checkUserExists,
  getUserReview,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }
  console.log(data.preference);
  for (const preference of data.preference) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const userGetReview = async (userId) => {
    if (isNaN(userId)){
        throw new Error("유효하지 않은 userId입니다.")
    }
    const joinUserId = await checkUserExists(userId);
    if (joinUserId === null){
        throw new Error("존재하지 않는 사용자입니다.");
    }
    const userReviews = await getUserReview(userId);
    console.log(userReviews);
    return userReviews;
}