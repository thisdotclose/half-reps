import { prisma } from "@/lib/prisma";

export const getMuscleGroups = async () => {
  const muscleGroups = await prisma.muscleGroup.findMany();
  
  return muscleGroups.sort((a, b) => a.name.localeCompare(b.name));
};
