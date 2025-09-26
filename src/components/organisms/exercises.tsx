"use client";
import { MuscleGroups } from "@/app/(auth)/programs/page";
import {
  getExercisesByMuscleGroup,
  type Exercises,
} from "@/services/client/getExercisesByMuscleGroup";
import React, { useState } from "react";

export default function Exercises({
  muscleGroups,
}: {
  muscleGroups: MuscleGroups;
}) {
  const [exercises, setExercises] = useState<Exercises>([]);

  const handleGetExercisesByMuscleGroup = async (muscleGroupId: string) => {
    const exercises = await getExercisesByMuscleGroup(muscleGroupId);
    setExercises(exercises);
  };


  return (
    <div className="flex flex-col gap-2 w-full justify-start items-start">
      {muscleGroups.map((muscleGroup) => (
        <button
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          key={muscleGroup.id}
          onClick={() => handleGetExercisesByMuscleGroup(muscleGroup.id)}
        >
          {muscleGroup.name}
        </button>
      ))}
      {exercises.map((exercise) => (
        <div className="bg-gray-200 p-2 rounded-md" key={exercise.id}>{exercise.name}</div>
      ))}
    </div>
  );
}
