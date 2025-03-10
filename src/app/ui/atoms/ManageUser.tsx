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
    if (
      user?.primaryEmailAddress?.emailAddress.split("@")[1] !== "revenium.io"
    ) {
      router.push("/user-not-allowed");
      return;
    }
    if (user) {
      const {
        id,
        primaryEmailAddress,
        firstName,
        fullName,
        lastName,
        imageUrl,
      } = user;

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
