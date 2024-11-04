// 헬퍼 함수: 생일을 Date 형식으로 변환
const formatBirth = (birthDate) => {
  return new Date(birthDate); // 공통된 birth 변환 로직
};

// 클라이언트 요청 데이터를 User 형식으로 변환 (주로 POST 요청 시 사용)
export const bodyToUser = (body) => {
  const birth = formatBirth(body.birth);

  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth, // 헬퍼 함수 사용
    address: body.address,
    phonenum: body.phonenum,
    preference: body.preferences, // 사용자가 선택한 음식 선호도 (선택 항목)
  };
};

// DB에서 가져온 데이터를 클라이언트 응답 형식으로 변환 (GET 요청 응답 시 사용)
export const responseFromUser = ({ user, preferences }) => {
  const birth = formatBirth(user[0].birth); // 헬퍼 함수 사용

  const userData = {
    id: user[0].id,
    email: user[0].email,
    name: user[0].name,
    gender: user[0].gender,
    birth, // 헬퍼 함수 사용
    address: user[0].address,
    detailAddress: user[0].detail_address, // 상세 주소
    phoneNumber: user[0].phone_number, // 전화번호
  };
};
//     // 사용자가 선호하는 음식 리스트
//     const userPreferences = preferences.map((pref) => ({
//       food_id: pref.food_id,
//       name: pref.name,  // 음식의 이름
//     }));

//     return {
//       ...userData,
//       preferences: userPreferences,  // 선호 항목 리스트 포함
//     };
//   };
