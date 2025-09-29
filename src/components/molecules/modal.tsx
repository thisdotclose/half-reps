import { useAtom } from "jotai";
import { modalOpenAtom } from "@/utils/atoms";

export default function Modal({
    children,
  }: {
    children: React.ReactNode;
  }) {

    const [isOpen, setIsOpen] = useAtom(modalOpenAtom);

    if (!isOpen) return null; // don’t render the dialog if it’s closed
  
    return (
      <dialog
        open
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-4 rounded-md w-1/2 flex flex-col justify-center items-center shadow-lg"
      >
        <div className="flex justify-between items-center w-full">
          <h1>Modal</h1>
          <button
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            onClick={() => setIsOpen(false)}
          >
            X
          </button>
        </div>
        {children}
      </dialog>
    );
  }
  