"use client";
import { MuscleGroups } from "@/app/(auth)/programs/page";
import {
  getExercisesByMuscleGroup,
  type Exercises,
} from "@/services/client/getExercisesByMuscleGroup";
import React, { useState } from "react";
import Modal from "../molecules/modal";
import { useQuery } from "@tanstack/react-query";
import { modalOpenAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import CreateExercisesForm from "../molecules/forms/createExercisesForm";

export default function Exercises({
  muscleGroups,
}: {
  muscleGroups: MuscleGroups;
}) {
  const [selectedMuscleGroupId, setSelectedMuscleGroupId] = useState<string | null>(null);
  const [_, setIsModalOpen] = useAtom(modalOpenAtom);

  const { data: exercises = [] } = useQuery({
    queryKey: ['exercises', selectedMuscleGroupId],
    queryFn: () => selectedMuscleGroupId ? getExercisesByMuscleGroup(selectedMuscleGroupId) : Promise.resolve([]),
    enabled: !!selectedMuscleGroupId,
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    gcTime: 1000 * 60 * 30, // Cache is kept for 30 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });

  return (
    <div className="flex flex-col gap-2 w-full justify-start items-start">
      {muscleGroups.map((muscleGroup) => (
        <button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          key={muscleGroup.id}
          onClick={() => setSelectedMuscleGroupId(muscleGroup.id)}
        >
          {muscleGroup.name}
        </button>
      ))}
      {exercises.map((exercise) => (
        <div className="bg-gray-200 p-2 rounded-md" key={exercise.id}>
          {exercise.name}
        </div>
      ))}
      <button
        className="bg-orange-500 text-white p-2 rounded-md hover:bg-blue-600"
        onClick={() => setIsModalOpen(true)}
      >
        Add Exercise
      </button>
      <Modal>
        <CreateExercisesForm muscleGroups={muscleGroups} />
      </Modal>
    </div>
  );
}
