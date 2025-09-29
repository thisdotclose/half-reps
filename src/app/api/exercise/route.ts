import { createExercise } from "@/services/server/createExercise";
import { createExerciseSchema } from "@/lib/validations/exercise";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Validate the user is authenticated
    const result = await auth.api.getSession(req);
    if (!result) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = createExerciseSchema.parse(json);

    const exercise = await createExercise(body);
    return NextResponse.json(exercise);
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 400 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
