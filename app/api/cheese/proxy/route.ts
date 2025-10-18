import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    success: false,
    message: "External image imports are disabled. Using local images instead.",
  })
}

