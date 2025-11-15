import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginBasePage from "./LoginBasePage";


export default function LoginPage() {
  const cookieStore = cookies();
  const access = cookieStore.get("Authorization");
  const refresh = cookieStore.get("Authorization-refresh");

  if (access && refresh) {
    redirect("/home");
  }

  return (
    <LoginBasePage />   
  );
}
