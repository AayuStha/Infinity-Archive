import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    hasPublicKey: !!process.env.MARVEL_PUBLIC_KEY,
    hasPrivateKey: !!process.env.MARVEL_PRIVATE_KEY,
    hasBaseUrl: !!process.env.MARVEL_API_BASE,
    publicKeyLength: process.env.MARVEL_PUBLIC_KEY?.length,
    baseUrl: process.env.MARVEL_API_BASE,
    nodeEnv: process.env.NODE_ENV,
  })
}
