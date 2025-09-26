import { GetExercisesByMuscleGroupIdResponse } from "@/app/api/exercise_by_group/route";

export type Exercises = GetExercisesByMuscleGroupIdResponse;

export const getExercisesByMuscleGroup = async (muscleGroupId: string) => {
  try {
    const exercisesResponse = await fetch(
      `/api/exercise_by_group?muscleGroupId=${muscleGroupId}`
    );

    const exercises: Exercises = await exercisesResponse.json();

    return exercises;
  } catch (error: unknown) {
    return [];
  }
};
