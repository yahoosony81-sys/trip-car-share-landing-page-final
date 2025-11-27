// Notion API 설정 및 유틸리티 함수

const NOTION_API_KEY = process.env.NOTION_API_KEY
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID

if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
  console.warn("Notion API 키 또는 데이터베이스 ID가 설정되지 않았습니다.")
}

export const notionConfig = {
  apiKey: NOTION_API_KEY,
  databaseId: NOTION_DATABASE_ID,
  apiVersion: "2022-06-28",
  apiUrl: "https://api.notion.com/v1",
}

// Notion API 요청 헤더 생성
export function getNotionHeaders() {
  return {
    Authorization: `Bearer ${notionConfig.apiKey}`,
    "Content-Type": "application/json",
    "Notion-Version": notionConfig.apiVersion,
  }
}

