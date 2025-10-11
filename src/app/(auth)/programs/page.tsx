import Exercises from "@/components/organisms/exercises";
import ProgramList from "@/components/organisms/programList";
import { getMuscleGroups } from "@/services/server";
import { withAuth } from "@/utils/withAuth";
import React from "react";

export type MuscleGroups = Awaited<ReturnType<typeof getMuscleGroups>>;

const programs: Array<{ id: string; name: string; description: string }> = [
  // {
  //   id: "1",
  //   name: "Program 1",
  //   description: "Program 1 description",
  // },
  // {
  //   id: "2",
  //   name: "Program 2",
  //   description: "Program 2 description",
  // },
];

export type Programs = typeof programs;

async function Programs() {
  const muscleGroups = await getMuscleGroups();
  return (
    <div>
      <Exercises muscleGroups={muscleGroups} />
      <ProgramList programs={programs} />
    </div>
  );
}

export default withAuth(Programs);
