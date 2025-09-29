import { z } from "zod";

export const createExerciseSchema = z.object({
  name: z.string().min(1, "Exercise name is required"),
  description: z.string().optional(),
  muscleGroupIds: z.array(z.string()).min(1, "Select at least one muscle group"),
});

export type CreateExerciseInput = z.infer<typeof createExerciseSchema>;
