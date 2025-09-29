import { prisma } from "@/lib/prisma";
import { CreateExerciseInput } from "@/lib/validations/exercise";

export const createExercise = async (data: CreateExerciseInput) => {
  const exercise = await prisma.exercise.create({
    data: {
      name: data.name,
      description: data.description,
      muscleGroups: {
        create: data.muscleGroupIds.map((muscleGroupId) => ({
          muscleGroup: {
            connect: {
              id: muscleGroupId,
            },
          },
        })),
      },
    },
    include: {
      muscleGroups: {
        include: {
          muscleGroup: true,
        },
      },
    },
  });

  return exercise;
};
