import { PrimitiveAtom, useAtom } from "jotai";

export default function Modal({
  title,
  children,
  atom,
}: {
  children: React.ReactNode;
  title: string;
  atom: PrimitiveAtom<boolean>;
}) {
  const [isOpen, setIsOpen] = useAtom(atom);

  if (!isOpen) return null; // don’t render the dialog if it’s closed

  return (
    <dialog
      open
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-md w-1/2 flex flex-col justify-center items-center shadow-lg"
    >
      <div className="relative flex justify-end items-center w-full">
        <h1 className="absolute left-1/2 transform -translate-x-1/2">
          {title}
        </h1>
        <button
          className="text-black w-10 h-10 rounded-md hover:bg-gray-400 flex items-center justify-center relative"
          onClick={() => setIsOpen(false)}
        >
          <span
            className="absolute text-2xl font-light"
            style={{ transform: "translateY(-3px)" }}
          >
            ×
          </span>
        </button>
      </div>
      {children}
    </dialog>
  );
}
