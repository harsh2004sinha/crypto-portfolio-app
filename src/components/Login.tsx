"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Vortex } from "./ui/vortex";
import { FormEvent, useContext } from "react";
import { LoginContext } from "@/context/login.context";
import { useRouter } from "next/navigation"; // Use this for client-side navigation

// Gradient bottom span
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

// Container for label and input
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

// User type definition
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
  const router = useRouter(); // Initialize useRouter

  if (!context) {
    throw new Error("SignUp must be used within a LoginContextProvider");
  }

  const { user, setUser } = context;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // Parse the JSON response
      const userData: Userss = await res.json();

      // Update the context with the fetched user data
      setUser(userData);
      localStorage.setItem("userkadata",JSON.stringify(userData))

      // Redirect to the home page
      router.push('/'); // Use router.push for client-side redirection

      console.log("Form submitted and user updated:");
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <Vortex
      backgroundColor="black"
      className="flex items-center flex-col justify-center md:px-10 w-full h-screen -mt-20"
    >
      <div className="max-w-md w-full mx-auto rounded-2xl md:rounded-2xl p-8 md:p-12 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to My-Crypto-App
        </h2>
        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              placeholder="projectmayhem@fc.com"
              type="email"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Login &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
    </Vortex>
  );
}

export default SignUp;
