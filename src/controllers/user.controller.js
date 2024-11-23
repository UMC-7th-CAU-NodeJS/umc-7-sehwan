import  {StatusCodes} from "http-status-codes";
import  {bodyToUser, userGetReviewDTO, userMissionDTO} from "../dtos/user.dto.js";
import  {userSignUp, userGetReview, userMission} from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
     /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              detailAddress: { type: "string" },
              phoneNumber: { type: "string" },
              preferences: { type: "array", items: { type: "number" } }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
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
                  email: { type: "string" },
                  name: { type: "string" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
                  data: { 
                    type: "object",
                    properties: {
                      email: { type: "string" },
                      name: { type: "string" },
                      gender: { type: "string" },
                      birth: { type: "string", format: "date" },
                      address: { type: "string" },
                      detailAddress: { type: "string" },
                      phoneNumber: { type: "string" },
                      preferences: { type: "array", items: { type: "number" } },
            }  
                  }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
    console.log("SignUp Api called!");
    console.log("body:", req.body);

    const user = await userSignUp(bodyToUser(req.body)); //dtoo를 사용해서 service로 넘김
    res.status(StatusCodes.OK).success(user);
};

export const handleUserMission = async (req, res, next) => {
  /*
    #swagger.summary = '사용자 미션 조회 API';
    #swagger.description = '특정 사용자에 대한 미션 상태를 조회합니다.';
    #swagger.parameters['userId'] = {
      in: 'query',
      description: '조회할 사용자 ID',
      required: true,
      schema: {
        type: 'integer',
        example: 1
      }
    };
    #swagger.responses[200] = {
      description: "사용자 미션 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "integer", example: 1 },
                    userId: { type: "integer", example: 1 },
                    missionId: { type: "integer", example: 1 },
                    reviewId: { type: "integer", example: 1 },
                    state: { type: "boolean", example: true },
                    dday: { type: "string", format: "date-time", example: "2024-12-01T00:00:00.000Z" },
                    mission: {
                      type: "object",
                      properties: {
                        id: { type: "integer", example: 1 },
                        storeId: { type: "integer", example: 1 },
                        name: { type: "string", example: "Mission 1" },
                        description: { type: "string", example: "Description for Mission 1" },
                        award: { type: "string", example: "Award 1" },
                        awardPoint: { type: "integer", example: 50 }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "사용자 미션 조회 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string", example: "유효하지 않은 사용자 ID입니다." }
                }
              },
              success: { type: "array", nullable: true, example: [] }
            }
          }
        }
      }
    };
*/

    console.log("UserMission Api called!");

        const userId = req.params.userId;  // 경로 파라미터에서 userId와 missionId 가져오기
    
        // DTO 함수로 요청 데이터를 처리 (경로 파라미터와 요청 본문 전달)
        console.log(userId);
        const dto = userMissionDTO(userId);
        console.log(dto);
        // 서비스 레이어 호출, DTO 데이터를 전달
        const userMissionId = await userMission(dto);
    
        // 성공 응답
        res.status(StatusCodes.OK).success(userMissionId);
}

export const handleUserReviews = async (req, res, next) => {
  /*
    #swagger.summary = '사용자 미션 조회 API';
    #swagger.description = '특정 사용자 ID로 사용자의 모든 미션 정보를 조회합니다.';
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '조회할 사용자 ID',
      required: true,
      schema: {
        type: 'integer',
        example: 1
      }
    };
    #swagger.responses[200] = {
      description: "사용자 미션 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "integer", example: 1 },
                    userId: { type: "integer", example: 1 },
                    missionId: { type: "integer", example: 1 },
                    reviewId: { type: "integer", example: 1 },
                    state: { type: "boolean", example: true },
                    dday: { type: "string", format: "date-time", example: "2024-12-01T00:00:00.000Z" },
                    mission: {
                      type: "object",
                      properties: {
                        id: { type: "integer", example: 1 },
                        storeId: { type: "integer", example: 1 },
                        name: { type: "string", example: "Mission 1" },
                        description: { type: "string", example: "Description for Mission 1" },
                        award: { type: "string", example: "Award 1" },
                        awardPoint: { type: "integer", example: 50 }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "사용자 미션 조회 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string", example: "유효하지 않은 사용자 ID입니다." },
                  data: {
                      type: "object",
                      properties: {
                        id: { type: "integer", example: 1 },
                        storeId: { type: "integer", example: 1 },
                        name: { type: "string", example: "Mission 1" },
                        description: { type: "string", example: "Description for Mission 1" },
                        award: { type: "string", example: "Award 1" },
                        awardPoint: { type: "integer", example: 50 }
                      }
                    }
                }
              },
              success: { type: "array", nullable: true, example: [] }
            }
          }
        }
      }
    };
*/

    console.log("User Review Api called!");
    console.log("body:", req.body);
    const { userId } = req.params;
    const dto = userGetReviewDTO(userId);
    const userReview = await userGetReview(dto); //dtoo를 사용해서 service로 넘김
    res.status(StatusCodes.OK).success(userReview);
}