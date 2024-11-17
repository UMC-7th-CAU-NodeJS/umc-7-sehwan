import { prisma } from "../db.config.js";
import { StoreNotFoundError } from "../errors.js";

// Review 데이터 삽입
export const setReview = async (data) => {
  console.log(data);
  // store_id가 제대로 전달되고 있는지 확인
  if (!data.storeId) {
    throw new StoreNotFoundError("storeId가 전달되지 않았습니다.");
  }

  // Store가 존재하는지 확인
  const store = await prisma.stores.findUnique({
    where: { id: data.store_id },
  });

  if (!store) {
    throw new StoreNotFoundError("존재하지 않는 가게입니다.");
  }

  // 리뷰 생성
  const review = await prisma.reviews.create({
    data: {
      userId: data.user_id,
      storeId: data.store_id,
      missionId: data.mission_id,
      content: data.content,
      rating: data.rating,
    },
  });

  return review;
};

// 이미지와 리뷰 간 관계 설정
export const setImage = async (reviewId, imageUrl) => {
  try {
    // 이미지 생성
    const image = await prisma.images.create({
      data: {
        url: imageUrl,
      },
    });

    // ReviewImg 테이블에 이미지와 리뷰 간 관계 생성
    await prisma.reviewImg.create({
      data: {
        imgId: image.id, // Prisma 스키마에 정의된 필드 명에 맞게 조정
        reviewId: reviewId, // Prisma 스키마에 정의된 필드 명에 맞게 조정
      },
    });
  } catch (err) {
    throw new ImageSaveError(
      `이미지 저장에 문제가 생겼습니다. ,${err.message}`
    );
  }
};
