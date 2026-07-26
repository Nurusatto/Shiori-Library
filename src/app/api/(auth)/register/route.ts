import { NextRequest } from "next/server";
import { registerTrigger } from "./functions";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();

    await registerTrigger(data);

    return Response.json({
      success: true,
      message: "Check your email to confirm your account.",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 400,
      },
    );
  }
};
