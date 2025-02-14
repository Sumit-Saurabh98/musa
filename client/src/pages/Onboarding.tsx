"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";
import Image from "next/image";

// Validation Schema
const orgSchema = z.object({
  orgName: z.string().min(3, "Organization name must be at least 3 characters"),
  orgLogo: z.any(),
});

interface OnboardFormData {
  orgName: string;
  orgLogo: File;
}

export default function Onboarding() {
  const [mode, setMode] = useState<"join" | "create" | null>(null);
  const [orgKey, setOrgKey] = useState("");

  // Form Handling
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OnboardFormData>({
    resolver: zodResolver(orgSchema),
  });

  const onSubmit = (data: OnboardFormData) => {
    if (mode === "create") {
      const generatedKey = `ORG-${Math.random()
        .toString(36)
        .substr(2, 8)
        .toUpperCase()}`;
      setOrgKey(generatedKey);
      console.log("Created Organization:", {
        ...data,
        privateKey: generatedKey,
      });
    } else {
      console.log("Joining Organization with Key:", orgKey);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-black to-purple-950 px-4">
      <Card className="w-full max-w-lg bg-black/20 border border-white/10 backdrop-blur-md text-white p-6">
        <CardContent className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Welcome to MUSA</h2>
          {!mode && (
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => setMode("join")}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Join an Organization
              </Button>
              <Button
                onClick={() => setMode("create")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Create a New Organization
              </Button>
            </div>
          )}

          {mode === "join" && (
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <label className="text-gray-300">
                Enter Organization Private Key:
              </label>
              <Input
                type="text"
                placeholder="ORG-XXXXXX"
                value={orgKey}
                onChange={(e) => setOrgKey(e.target.value)}
              />
              <Button type="submit" className="bg-purple-500 w-full">
                Join
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setMode(null)}
              >
                Go Back
              </Button>
            </motion.form>
          )}

          {mode === "create" && (
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <label className="text-gray-300">Organization Name:</label>
              <Input
                type="text"
                placeholder="Enter name"
                {...register("orgName")}
              />
              {errors.orgName && (
                <p className="text-red-500 text-sm">{errors.orgName.message}</p>
              )}

              <label className="text-gray-300">Upload Logo:</label>
              <div className="relative w-full flex justify-center items-center p-4 border border-dashed border-gray-400 rounded-lg">
                <Upload className="text-gray-400 w-8 h-8" />
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  {...register("orgLogo")}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setValue("orgLogo", file);
                    }
                  }}
                />
              </div>
              {watch("orgLogo") && (
                <Image
                  src={URL.createObjectURL(watch("orgLogo"))}
                  alt="Logo Preview"
                  width={80}
                  height={80}
                  className="mx-auto mt-2 rounded-full border border-white/20"
                />
              )}

              <Button type="submit" className="bg-blue-500 w-full">
                Create Organization
              </Button>
              {orgKey && (
                <p className="text-green-400 text-center mt-2">
                  Generated Key: {orgKey}
                </p>
              )}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setMode(null)}
              >
                Go Back
              </Button>
            </motion.form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
