import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EntryPointView() {
  try {
    const { userId } = await auth();
    console.log("user id", userId);
    if (userId) redirect("/help_text");
    redirect("/sign-in");
  } catch (error: unknown) {
    throw error;
  }
}
