import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email } = body

    // Validate input
    if (!name || !email) {
      return NextResponse.json({ error: "이름과 이메일을 입력해주세요." }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "유효한 이메일 주소를 입력해주세요." }, { status: 400 })
    }

    // Notion API integration
    const notionDatabaseId = process.env.NOTION_DATABASE_ID
    const notionApiKey = process.env.NOTION_API_KEY

    if (!notionDatabaseId || !notionApiKey) {
      console.error("Missing Notion configuration")
      // Return success anyway for demo purposes
      return NextResponse.json({ success: true })
    }

    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionApiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: notionDatabaseId },
        properties: {
          이름: {
            title: [
              {
                text: {
                  content: name,
                },
              },
            ],
          },
          이메일: {
            email: email,
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
      throw new Error("Failed to add to Notion")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Waitlist submission error:", error)
    return NextResponse.json({ error: "등록 중 오류가 발생했습니다." }, { status: 500 })
  }
}
