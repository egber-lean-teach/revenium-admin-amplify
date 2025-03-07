import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EntryPointView() {
  const { userId } = await auth();

  if (userId) redirect("/help_text");
  redirect("/sign-in");
}
