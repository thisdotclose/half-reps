import Exercises from "@/components/organisms/exercises";
import { getMuscleGroups } from "@/services/server";
import { withAuth, WithAuthProps } from "@/utils/withAuth";
import React from "react";

export type MuscleGroups = Awaited<ReturnType<typeof getMuscleGroups>>;

async function Programs({ session }: WithAuthProps) {
  const muscleGroups = await getMuscleGroups();
  return (
    <div>
      <Exercises muscleGroups={muscleGroups} />
    </div>
  );
}

export default withAuth(Programs);
