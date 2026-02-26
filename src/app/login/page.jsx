import { redirect } from "next/navigation";
import { auth } from "@/components/server/api/auth";
import LoginView from "@/components/server/auth/LoginView";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/");

  return <LoginView />;
}
