// Future: POST /api/create-order for agent commerce or UCP
import { NextRequest, NextResponse } from 'next/server'

export async function POST(_request: NextRequest) {
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}
