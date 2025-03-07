"use client";
import { useUserState } from "@/app/core/application/global-state";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function ManageUser({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const { user } = useUser();
  const { setUser } = useUserState((state) => state);

  console.log("user from manageUser", user);

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

      setUser({
        id,
        emailAddress: primaryEmailAddress?.emailAddress || "",
        firstName: firstName || "",
        fullName: fullName || "",
        lastName: lastName || "",
        imageUrl,
      });
    }
  }, [user, setUser]);
  return <>{children}</>;
}
