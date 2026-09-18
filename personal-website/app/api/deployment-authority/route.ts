import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      service: "MusaAllama.com",
      source: {
        repository: "mgarba50/personal-website",
        authoritativeBranch: "master",
        rootDirectory: "personal-website",
      },
      vercel: {
        projectId: "prj_lv9tE5OVHY0nckOH8Mljr5vbaKG4",
        teamId: "team_0RltCXqqT9vE1V8gvR6MgxAy",
        environment: process.env.VERCEL_ENV ?? "unknown",
        targetEnvironment: process.env.VERCEL_TARGET_ENV ?? "unknown",
        deploymentUrl: process.env.VERCEL_URL ?? "unknown",
        gitCommitRef: process.env.VERCEL_GIT_COMMIT_REF ?? "unknown",
        gitCommitSha: process.env.VERCEL_GIT_COMMIT_SHA ?? "unknown",
      },
      canon: {
        schema: "sovereign-publication-canon",
        reconciliationVersion: "2026-09-18.2",
        generalBooksRoute: "/books",
        generalPublicationArchiveRoute: "/books/archive",
        diwanCanonRoute: "/al-maqam",
        mainDiwanRecords: 50,
        extendedDiwanRecords: 2,
        archivePolicy: "Public identity and approved assets only; private paid masters remain outside public Git.",
      },
      generatedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
