import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const COUNTER_ENDPOINT =
  "https://counterapi.com/api/tri-portfolio-pi.vercel.app/like/portfolio";

const noStoreHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

async function readCounter(increment: boolean) {
  const url = new URL(COUNTER_ENDPOINT);

  if (!increment) url.searchParams.set("readOnly", "true");
  url.searchParams.set("_", `${Date.now()}-${crypto.randomUUID()}`);

  const response = await fetch(url, {
    cache: "no-store",
    headers: noStoreHeaders,
  });

  if (!response.ok) {
    throw new Error(`CounterAPI returned ${response.status}`);
  }

  const data = (await response.json()) as { value?: number };

  if (typeof data.value !== "number" || !Number.isFinite(data.value)) {
    throw new Error("CounterAPI returned an invalid count");
  }

  return data.value;
}

function json(value: number, status = 200) {
  return NextResponse.json(
    { value },
    {
      status,
      headers: noStoreHeaders,
    },
  );
}

export async function GET() {
  try {
    return json(await readCounter(false));
  } catch {
    return json(0, 502);
  }
}

export async function POST() {
  try {
    // A plain CounterAPI request increments the persistent counter.
    // The browser can only reach this path after an explicit Like click.
    return json(await readCounter(true));
  } catch {
    return json(0, 502);
  }
}
