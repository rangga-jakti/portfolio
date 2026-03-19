"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import MagneticCursor from "@/components/ui/MagneticCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  useEffect(() => {
    // Prevent layout shift on load
    document.body.style.opacity = "1";
  }, []);

  return (
    <>
      <MagneticCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
