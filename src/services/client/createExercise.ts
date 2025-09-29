import { CreateExerciseInput } from "@/lib/validations/exercise";

export const createExercise = async (data: CreateExerciseInput) => {
  const response = await fetch("/api/exercise", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};
