"use server"

import { notionConfig, getNotionHeaders } from "@/lib/notion"

// 폼 데이터 타입 정의
type WaitlistFormData = {
  name: string
  email: string
  phone: string
  carType: string
  specialRequest?: string
}

// Notion 데이터베이스에 데이터 저장하는 서버 액션
export async function submitToNotion(data: WaitlistFormData) {
  try {
    // 환경 변수 확인
    if (!notionConfig.apiKey || !notionConfig.databaseId) {
      return {
        success: false,
        error: "Notion API 설정이 완료되지 않았습니다.",
      }
    }

    // 입력값 검증
    if (!data.name || !data.email || !data.phone || !data.carType) {
      return {
        success: false,
        error: "필수 항목을 모두 입력해주세요.",
      }
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        error: "유효한 이메일 주소를 입력해주세요.",
      }
    }

    // 전화번호 형식 검증 (한국 전화번호 형식)
    const phoneRegex = /^[0-9]{2,3}-?[0-9]{3,4}-?[0-9]{4}$/
    const cleanedPhone = data.phone.replace(/[-\s]/g, "")
    if (cleanedPhone.length < 10 || cleanedPhone.length > 11) {
      return {
        success: false,
        error: "유효한 전화번호를 입력해주세요.",
      }
    }

    // Notion API로 페이지 생성
    const response = await fetch(`${notionConfig.apiUrl}/pages`, {
      method: "POST",
      headers: getNotionHeaders(),
      body: JSON.stringify({
        parent: {
          database_id: notionConfig.databaseId,
        },
        properties: {
          이름: {
            title: [
              {
                text: {
                  content: data.name,
                },
              },
            ],
          },
          이메일: {
            email: data.email,
          },
          전화번호: {
            phone_number: data.phone,
          },
          차량종류: {
            select: {
              name: data.carType,
            },
          },
          특별요청: {
            rich_text: data.specialRequest
              ? [
                  {
                    text: {
                      content: data.specialRequest,
                    },
                  },
                ]
              : [],
          },
          등록일: {
            date: {
              start: new Date().toISOString(),
            },
          },
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("Notion API 에러:", errorData)
      return {
        success: false,
        error: "데이터 저장 중 오류가 발생했습니다.",
      }
    }

    return {
      success: true,
      message: "등록이 완료되었습니다!",
    }
  } catch (error) {
    console.error("Notion 제출 에러:", error)
    return {
      success: false,
      error: "등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    }
  }
}

