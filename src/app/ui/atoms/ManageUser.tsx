"use client";
import { useUserState } from "@/app/core/application/global-state/user.state";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ManageUser({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const { user } = useUser();
  const { setUser } = useUserState((state) => state);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const {
        id,
        primaryEmailAddress,
        firstName,
        fullName,
        lastName,
        imageUrl,
      } = user;

      if (primaryEmailAddress?.emailAddress.split("@")[1] !== "revenium.io") {
        router.push("/user-not-allowed");
        return;
      }

      setUser({
        id,
        emailAddress: primaryEmailAddress?.emailAddress || "",
        firstName: firstName || "",
        fullName: fullName || "",
        lastName: lastName || "",
        imageUrl,
      });
    }
  }, [user, setUser, router]);
  return <>{children}</>;
}
