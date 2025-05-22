import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex h-dvh flex-col bg-[url('/bg.jpg')] bg-cover bg-center">
      <div className="z-10 flex h-full w-full flex-col items-center justify-center">
        <div className="h-auto w-full max-w-lg">
          <LoginForm />
        </div>
        <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.5),rgba(0,0,0,0.4),rgba(0,0,0,0.5))]" />
      </div>
    </div>
  );
}
