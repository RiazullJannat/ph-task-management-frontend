"use client";

import ButtonComponent from "@/components/ui/ButtonComponent";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#030115]">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden border border-purple-500/20 bg-gradient-to-br from-[#1a0533] via-[#0d0a1f] to-[#030115] p-12 md:p-20 text-center"
        >
          {/* Glows */}
          <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 bg-purple-600/20 blur-[100px] rounded-full" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 w-72 h-72 bg-yellow-500/10 blur-[100px] rounded-full" />

          {/* Corner borders */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-purple-500/40 rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-yellow-400/30 rounded-br-3xl" />

          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[4px] text-purple-400 mb-4">
              Get Started Today
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to take control of{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
                your workflow?
              </span>
            </h2>
            <p className="text-[#9B98AE] text-lg max-w-xl mx-auto mb-10">
              Jump into the Kanban board, annotate your first image, and see
              how much smoother your day gets.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/login">
                <ButtonComponent
                  buttonName="Start Now"
                  icon={ArrowRight}
                  varient="yellow"
                  clasName="px-8 py-3 text-base"
                />
              </Link>
              <Link href="/tasks">
                <ButtonComponent
                  buttonName="Explore Tasks"
                  varient="purple"
                  clasName="px-8 py-3 text-base"
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
