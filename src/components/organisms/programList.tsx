"use client";
import { Programs } from "@/app/(auth)/programs/page";
import React from "react";
import Modal from "../molecules/modal";
import { useAtom } from "jotai";
import { createProgramModalAtom } from "@/utils/atoms";

export default function ProgramList({ programs }: { programs: Programs }) {
  if (programs.length === 0) {
    return <NoPrograms />;
  }

  return (
    <div className="p-2 bg-gray-200 flex flex-col gap-2">
      {programs.map((program) => (
        <div key={program.id}>{program.name}</div>
      ))}
      <CreateProgramButton />
      <Modal title="Create Program" atom={createProgramModalAtom}>
        <div className="bg-orange-500 w-full h-full">create program here</div>
      </Modal>
    </div>
  );
}

const NoPrograms = () => {
  return (
    <div className="p-2 flex flex-col gap-2 bg-orange-500 items-start justify-start">
      <h1 className="text-2xl font-bold">No programs</h1>
      <CreateProgramButton />
      <Modal title="Create Program" atom={createProgramModalAtom}>
        <div className="bg-orange-500 w-full h-full">create program here</div>
      </Modal>
    </div>
  );
};

const CreateProgramButton = () => {
  const [, setIsModalOpen] = useAtom(createProgramModalAtom);
  return (
    <button
      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      onClick={() => setIsModalOpen(true)}
    >
      Click Here to Create a Program
    </button>
  );
};
