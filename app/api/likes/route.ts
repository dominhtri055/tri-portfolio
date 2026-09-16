import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ABACUS_BASE = "https://abacus.jasoncameron.dev";
const NAMESPACE = "tri-portfolio-pi.vercel.app";
const KEY = "portfolio-likes-v2";

const noStoreHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

type CounterResponse = {
  value?: number;
};

function json(value: number, status = 200) {
  return NextResponse.json(
    { value },
    {
      status,
      headers: noStoreHeaders,
    },
  );
}

async function requestCounter(mode: "get" | "hit") {
  const url = `${ABACUS_BASE}/${mode}/${NAMESPACE}/${KEY}`;

  const response = await fetch(url, {
    cache: "no-store",
    headers: noStoreHeaders,
  });

  // A counter does not exist until the first hit. Treat that as zero on reads.
  if (mode === "get" && response.status === 404) return 0;

  if (!response.ok) {
    throw new Error(`Abacus returned ${response.status}`);
  }

  const data = (await response.json()) as CounterResponse;

  if (typeof data.value !== "number" || !Number.isFinite(data.value)) {
    throw new Error("Abacus returned an invalid count");
  }

  return data.value;
}

export async function GET() {
  try {
    return json(await requestCounter("get"));
  } catch {
    return json(0, 502);
  }
}

export async function POST() {
  try {
    // /hit increments atomically and immediately returns the new global value.
    return json(await requestCounter("hit"));
  } catch {
    return json(0, 502);
  }
}
