import { NextResponse } from "next/server"

import { leadRequestSchema } from "@/lib/lead-schema"

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 })
  }

  const parsed = leadRequestSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid request body", issues: parsed.error.issues },
      { status: 400 }
    )
  }

  const { website, data } = parsed.data

  if (website && website.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 201 })
  }

  const apiUrl = process.env.LEADS_API_URL
  const apiKey = process.env.LEADS_API_KEY

  if (!apiUrl || !apiKey) {
    console.error("[api/leads] Missing LEADS_API_URL or LEADS_API_KEY")
    return NextResponse.json(
      { message: "Lead service is not configured" },
      { status: 500 }
    )
  }

  const upstreamUrl = `${apiUrl.replace(/\/$/, "")}/customers/external-leads`

  let upstreamResponse: Response

  try {
    upstreamResponse = await fetch(upstreamUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ data }),
    })
  } catch (error) {
    console.error("[api/leads] Upstream unreachable:", error)
    return NextResponse.json(
      { message: "Lead service is temporarily unavailable" },
      { status: 502 }
    )
  }

  let upstreamBody: unknown = null

  try {
    upstreamBody = await upstreamResponse.json()
  } catch {
    upstreamBody = null
  }

  if (!upstreamResponse.ok) {
    const message =
      typeof upstreamBody === "object" &&
      upstreamBody !== null &&
      "message" in upstreamBody &&
      typeof upstreamBody.message === "string"
        ? upstreamBody.message
        : "Lead submission failed"

    return NextResponse.json(
      { message },
      { status: upstreamResponse.status >= 400 ? upstreamResponse.status : 502 }
    )
  }

  return NextResponse.json(upstreamBody ?? { ok: true }, {
    status: upstreamResponse.status,
  })
}
