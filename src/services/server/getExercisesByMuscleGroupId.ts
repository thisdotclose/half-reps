import { prisma } from "@/lib/prisma";

export const getExercisesByMuscleGroupId = async (muscleGroupId: string) => {
  const exerciseOnMuscleGroupsResponse =
    await prisma.exerciseOnMuscleGroup.findMany({
      where: {
        muscleGroupId,
      },
      select: {
        exerciseId: true,
      },
    });

  const exerciseIds = exerciseOnMuscleGroupsResponse.map(
    (exercise) => exercise.exerciseId
  );

  const exercises = await prisma.exercise.findMany({
    where: {
      id: {
        in: exerciseIds,
      },
    },
  });

  return exercises;
};
