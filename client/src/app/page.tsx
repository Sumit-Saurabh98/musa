"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Users, BarChart3, Zap } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-950 via-black to-purple-950">
      {/* Navbar with Glassmorphism */}
      <header className="fixed top-0 w-full backdrop-blur-md bg-black/20 border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              MUSA
            </h1>
          </div>
          <div className="flex gap-4 items-center">
            <Button variant="ghost" className="text-white/80 hover:text-white" onClick={() => router.push("/login")}>
              Log in
            </Button>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
              onClick={() => router.push("/signup")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Animated Gradient */}
      <motion.div 
        className="pt-32 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Revolutionize Your
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 animate-gradient">
                Project Management
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              Experience the future of collaboration with real-time updates, 
              AI-powered insights, and seamless team coordination.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-6 text-lg"
                onClick={() => router.push("/signup")}
              >
                Start Free Trial <ArrowRight className="ml-2" />
              </Button>
              <Button
                variant="outline"
                className="border-white/20 hover:bg-white/10 px-8 py-6 text-lg"
              >
                Watch Demo
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur opacity-30"></div>
              <div className="relative">
                <Image
                  src="/dashboard-showcase.png"
                  alt="MUSA Dashboard"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl border border-white/10"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Grid with Hover Effects */}
      <div className="mt-32 px-6 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything you need to excel
          </h2>
          <p className="mt-4 text-gray-400">
            Powerful features to boost your productivity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Users className="w-6 h-6 text-purple-400" />,
              title: "Team Collaboration",
              description: "Work together seamlessly with real-time updates and communication."
            },
            {
              icon: <Zap className="w-6 h-6 text-blue-400" />,
              title: "Smart Automation",
              description: "Automate repetitive tasks and focus on what matters most."
            },
            {
              icon: <BarChart3 className="w-6 h-6 text-green-400" />,
              title: "Advanced Analytics",
              description: "Get actionable insights with our powerful analytics dashboard."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="group p-8 rounded-xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-3 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-32 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>© 2025 MUSA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}