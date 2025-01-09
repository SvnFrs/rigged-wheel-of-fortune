import CircularWheel from "../components/CircularWheel";
import React from "react";
import "./page.css";
import AnimatedBackground from "@/components/AnimatedBackground";
import AnimatedHeader from "@/components/AnimatedHeader";
export default function Home() {
  return (
    <main className="container flex min-h-screen min-w-full justify-center items-center">
      <div className="flex flex-col gap-8">
        {/* <h1 className="text-3xl font-bold text-center mb-8" data>Fcoder hên xui</h1> */}
        <AnimatedHeader />
        <div className="relative mb-52">
          <CircularWheel />
        </div>
      </div>
      <AnimatedBackground />
    </main>
  );
}
