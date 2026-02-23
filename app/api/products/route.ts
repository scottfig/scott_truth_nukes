// Future: GET /api/products for agent commerce or UCP
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}
