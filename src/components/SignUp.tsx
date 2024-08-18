"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Vortex } from "./ui/vortex";
import { LoginContext } from "@/context/login.context";
import { useContext } from "react";
import { useRouter } from "next/navigation";

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

// import { addUser } from "@/backend/user.methods";

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

interface Userss {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  id: string;
}

// Sign-up form component

function SignUp() {
  const context = useContext(LoginContext);
  const router = useRouter();

  if (!context) {
    throw new Error("SignUp must be used within a LoginContextProvider");
  }

  const { user, setUser } = context;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const firstName: String = (
      document.getElementById("firstname") as HTMLInputElement
    ).value;
    const lastName: String = (
      document.getElementById("lastname") as HTMLInputElement
    ).value;
    const email: String = (document.getElementById("email") as HTMLInputElement)
      .value;
    const password: String = (
      document.getElementById("password") as HTMLInputElement
    ).value;

    const res = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    });
    // Parse the JSON response
    const userData: Userss = await res.json();

    // Update the context with the fetched user data
    setUser(userData);
    localStorage.setItem("userkadata", JSON.stringify(userData));

    router.push("/");

    console.log("Form submitted");
  };
  return (
    <Vortex
      backgroundColor="black"
      className="flex items-center flex-col justify-center md:px-10 w-full h-screen -mt-20"
    >
      <div className="max-w-md w-full mx-auto rounded-2xl md:rounded-2xl p-8 md:p-12 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-2xl md:text-3xl text-neutral-800 dark:text-neutral-200 mb-6">
          Welcome to My-Crypto-App
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <LabelInputContainer className="flex-1">
              <Label htmlFor="firstname">First name</Label>
              <Input id="firstname" placeholder="Tyler" type="text" />
            </LabelInputContainer>
            <LabelInputContainer className="flex-1">
              <Label htmlFor="lastname">Last name</Label>
              <Input id="lastname" placeholder="Durden" type="text" />
            </LabelInputContainer>
          </div>

          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-12 md:h-14 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-px w-full" />
        </form>
      </div>
    </Vortex>
  );
}

export default SignUp;
