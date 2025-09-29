import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      <h1>Hello World</h1>
      <Link className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" href="/programs">Programs</Link>
    </div>
  );
}
