import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { addReview } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
/*
    #swagger.summary = '리뷰 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "integer", example: 111 },
              storeId: { type: "integer", example: 1 },
              content: { type: "string", example: "조아요!" },
              rating: { type: "integer", example: 5 },
              images: {
                type: "array",
                items: { type: "string", format: "uri" },
                example: [
                  "https://example.com/image1.jpg",
                  "https://example.com/image2.jpg"
                ]
              }
            },
            required: ["userId", "storeId", "content", "rating"]
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "리뷰 추가 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  reviewId: { type: "integer", example: 1234 },
                  message: { type: "string", example: "리뷰가 성공적으로 추가되었습니다." }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "리뷰 추가 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R001" },
                  reason: { type: "string", example: "요청 데이터가 유효하지 않습니다." },
                  data: { type: "object", properties: {
              userId: { type: "integer", example: 111 },
              storeId: { type: "integer", example: 1 },
              content: { type: "string", example: "조아요!" },
              rating: { type: "integer", example: 5 },
              images: {
                type: "array",
                items: { type: "string", format: "uri" },
                example: [
                  "https://example.com/image1.jpg",
                  "https://example.com/image2.jpg"
                ]
              }
            }, }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
*/


  console.log("리뷰 등록을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await addReview(bodyToReview(req.body));
  res.status(StatusCodes.OK).success(user);
};
