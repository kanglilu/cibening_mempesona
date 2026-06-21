import { NextResponse } from "next/server";

const GOOGLE_SHEETS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyesgTMPb6SIZHrkfn2A3gRLFsMpE8_CRFgxm-g5PewKQ8alzY0FHqT8HCOMEe2A88N/exec";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { website, ...safePayload } = payload;

    if (website) {
      return NextResponse.json(
        {
          status: "error",
          message: "Aspirasi tidak dapat diproses."
        },
        { status: 400 }
      );
    }

    const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(safePayload),
      cache: "no-store"
    });

    const text = await response.text();
    let result: unknown = null;

    try {
      result = JSON.parse(text);
    } catch {
      result = { status: response.ok ? "ok" : "error", raw: text };
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          status: "error",
          message: "Google Apps Script gagal menerima aspirasi.",
          detail: result
        },
        { status: 502 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Gagal mengirim aspirasi."
      },
      { status: 500 }
    );
  }
}
