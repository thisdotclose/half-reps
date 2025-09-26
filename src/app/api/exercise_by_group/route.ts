import { getExercisesByMuscleGroupId } from "@/services/server";
import { NextResponse } from "next/server";

export type GetExercisesByMuscleGroupIdResponse = Awaited<ReturnType<typeof getExercisesByMuscleGroupId>>;

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const muscleGroupId = searchParams.get("muscleGroupId");
  if (!muscleGroupId) {
    return NextResponse.json(
      { error: "Muscle group ID is required" },
      { status: 400 }
    );
  }
  const exercises = await getExercisesByMuscleGroupId(muscleGroupId);
  return NextResponse.json(exercises);
};
