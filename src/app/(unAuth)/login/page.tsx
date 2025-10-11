import LoginForm from "@/components/molecules/forms/loginForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (session) {
    redirect("/");
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
}
