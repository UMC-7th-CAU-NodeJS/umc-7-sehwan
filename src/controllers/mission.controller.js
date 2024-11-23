import { StatusCodes } from "http-status-codes";
import { bodyToMission, challengeMissionDTO, storeMissionDTO } from "../dtos/mission.dto.js";
import {
  createMission,
  challengeMission,
  storeGetMission,
} from "../services/mission.service.js";

export const handleCreateMission = async (req, res, next) => {
  /*
    #swagger.summary = '미션 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              store_id: { type: "integer", example: 111 },
              name: { type: "string", example: "예시 미션" },
              description: { type: "string", example: "퍼주마에서 술을 퍼마시고 인증 사진을 업로드하세요." },
              award: { type: "string", example: "무료 소주 오백병" },
              award_point: { type: "integer", example: 50 }
            },
            required: ["store_id", "name", "description", "award", "award_point"]
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 추가 성공",
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
                  mission_id: { type: "integer", example: 123 },
                  message: { type: "string", example: "미션이 성공적으로 추가되었습니다." }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 추가 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M001" },
                  reason: { type: "string", example: "요청 데이터가 유효하지 않습니다." },
                  data: { type: "object", 
                  properties: {
              store_id: { type: "integer", example: 111 },
              name: { type: "string", example: "예시 미션" },
              description: { type: "string", example: "퍼주마에서 술을 퍼마시고 인증 사진을 업로드하세요." },
              award: { type: "string", example: "무료 소주 오백병" },
              award_point: { type: "integer", example: 50 }
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

  console.log("미션 추가를 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const mission = await createMission(bodyToMission(req.body));
  res.status(StatusCodes.OK).success(mission);
};

export const handleChallengeMission = async (req, res) => {
  /*
    #swagger.summary = '도전 미션 처리 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_id: { type: "integer", example: 1 },
              dday: { type: "string", format: "date", example: "2024-12-01" }
            },
            required: ["user_id", "dday"]
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "도전 미션 처리 성공",
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
                  mission_id: { type: "integer", example: 1234 },
                  user_id: { type: "integer", example: 1 },
                  dday: { type: "string", format: "date", example: "2024-12-01" },
                  message: { type: "string", example: "도전 미션이 성공적으로 처리되었습니다." }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "도전 미션 처리 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "C001" },
                  reason: { type: "string", example: "요청 데이터가 유효하지 않습니다." },
                  data: { type: "object", example: {} }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
*/

    const { storeId, missionId } = req.params; // 경로 파라미터에서 storeId와 missionId 가져오기

    console.log("미션 도전 api가 요청되었습니다.");
    console.log(req.body);
    // DTO 함수로 요청 데이터를 처리 (경로 파라미터와 요청 본문 전달)
    const dto = challengeMissionDTO(storeId, missionId, req.body);

    // 서비스 레이어 호출, DTO 데이터를 전달
    const acceptedMissionId = await challengeMission(dto);

    // 성공 응답
    res.status(StatusCodes.OK).success(acceptedMissionId);
};

export const handleStoreMission = async (req, res, next) => {
    /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
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
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
    console.log("미션 조회를 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    const { storeId } = req.params; // 경로 파라미터에서 storeId와 missionId 가져오기
    const dto = storeMissionDTO(storeId);
    // 서비스 레이어 호출, DTO 데이터를 전달
    const storeMissionId = await storeGetMission(dto);

    // 성공 응답
    res.status(StatusCodes.OK).success(storeMissionId);
};
