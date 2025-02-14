"use client";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validations/auth";
import { useAuthStore } from "@/stores/authStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setToken, setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const json = await res.json();

      if (!res.ok) throw new Error(json.message);

      setToken(json.token);
      setUser(json.user);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-950 via-black to-purple-950">
      <Link
        href="/"
        className="fixed top-6 left-6 text-white/80 hover:text-white flex items-center gap-2"
      >
        <ArrowLeft size={20} />
        Back to home
      </Link>

      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              MUSA
            </h1>
          </div>

          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur opacity-30"></div>
            <div className="relative p-8 rounded-lg bg-black/40 backdrop-blur-xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-2">
                Create your account
              </h2>
              <p className="text-gray-400 mb-6">
                Join us today and get started
              </p>

              {/* Google Signup Button */}
              <Button
                type="button"
                onClick={handleGoogleSignup}
                className="w-full bg-white hover:bg-gray-100 text-gray-900 mb-4 py-6 flex items-center justify-center gap-2"
              >
                <Image
                  width={20} 
                  height={20}
                  src="/google-icon.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign up with Google
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black/40 text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    {...register("name")}
                    type="text"
                    placeholder="Full Name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.name.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.password.message as string}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-6"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>

              <p className="mt-6 text-center text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-purple-400 hover:text-purple-300"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
