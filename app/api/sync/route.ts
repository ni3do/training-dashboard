import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    console.log("Manual sync triggered at", new Date().toISOString());

    // Run the sync script
    const { stdout, stderr } = await execAsync("npm run sync:all", {
      cwd: process.cwd(),
      timeout: 300000, // 5 minute timeout
    });

    if (stderr) {
      console.warn("Sync stderr:", stderr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Data sync completed successfully",
        timestamp: new Date().toISOString(),
        output: stdout,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Sync failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Data sync failed",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message: "Use POST to trigger a sync",
      method: "POST",
    },
    { status: 400 }
  );
}
