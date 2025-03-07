import { SignIn } from "@clerk/nextjs";

export default function SignInSectionOrganisms(): React.ReactNode {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <SignIn />
    </div>
  );
}
