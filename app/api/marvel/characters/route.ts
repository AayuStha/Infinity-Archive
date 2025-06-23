import { type NextRequest, NextResponse } from "next/server"
import md5 from "blueimp-md5"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const offset = searchParams.get("offset") || "0"
    const limit = searchParams.get("limit") || "20"

    const publicKey = process.env.MARVEL_PUBLIC_KEY
    const privateKey = process.env.MARVEL_PRIVATE_KEY
    const baseUrl = process.env.MARVEL_API_BASE

    if (!publicKey || !privateKey || !baseUrl) {
      return NextResponse.json({ error: "Marvel API credentials not configured" }, { status: 500 })
    }

    const ts = Date.now().toString()
    const hash = md5(ts + privateKey + publicKey)

    const url = new URL(`${baseUrl}/characters`)
    url.searchParams.append("ts", ts)
    url.searchParams.append("apikey", publicKey)
    url.searchParams.append("hash", hash)
    url.searchParams.append("limit", limit)
    url.searchParams.append("offset", offset)

    if (search) {
      url.searchParams.append("nameStartsWith", search)
    }

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`Marvel API error: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      characters: data.data.results,
      total: data.data.total,
      offset: data.data.offset,
      limit: data.data.limit,
    })
  } catch (error) {
    console.error("Marvel API Error:", error)
    return NextResponse.json({ error: "Failed to fetch Marvel characters" }, { status: 500 })
  }
}
