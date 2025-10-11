"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createExerciseSchema,
  type CreateExerciseInput,
} from "@/lib/validations/exercise";
import { createExercise } from "@/services/client/createExercise";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { MuscleGroups } from "@/app/(auth)/programs/page";
import { createExerciseModalAtom } from "@/utils/atoms";

export default function CreateExercisesForm({
  muscleGroups,
}: {
  muscleGroups: MuscleGroups;
}) {
  const [, setIsModalOpen] = useAtom(createExerciseModalAtom);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateExerciseInput>({
    resolver: zodResolver(createExerciseSchema),
    defaultValues: {
      name: "",
      description: "",
      muscleGroupIds: [],
    },
  });

  const onSubmit = async (data: CreateExerciseInput) => {
    try {
      await createExercise(data);
      // Invalidate all exercise queries
      await queryClient.invalidateQueries({ queryKey: ["exercises"] });
      reset();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create exercise:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Exercise Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description (Optional)
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Muscle Groups
        </label>
        <div className="mt-2 space-y-2">
          {muscleGroups.map((muscleGroup) => (
            <div key={muscleGroup.id} className="flex items-center">
              <input
                type="checkbox"
                id={muscleGroup.id}
                value={muscleGroup.id}
                {...register("muscleGroupIds")}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor={muscleGroup.id}
                className="ml-2 block text-sm text-gray-900"
              >
                {muscleGroup.name}
              </label>
            </div>
          ))}
        </div>
        {errors.muscleGroupIds && (
          <p className="mt-1 text-sm text-red-600">
            {errors.muscleGroupIds.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setIsModalOpen(false)}
          className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Exercise"}
        </button>
      </div>
    </form>
  );
}
