import RegisterForm from "@/components/organisms/registerForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function Register() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (session) {
    redirect("/");
  }

  return (
    <div>
      <RegisterForm />
    </div>
  );
}
