"use client"

import { Meteors } from "@/components/ui/meteors";

function HeroSectionTwo() {
  return (
    <div className="h-screen">
      <div className=" w-full relative h-full">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden flex flex-col justify-end items-start">
 
          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
            Meteors because they&apos;re cool
          </h1>
 
          <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
            I don&apos;t know what to write so I&apos;ll just paste something
            cool here. One more sentence because lorem ipsum is just
            unacceptable. Won&apos;t ChatGPT the shit out of this.
          </p>
 
          <button className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">
            Explore
          </button>

          <Meteors number={50} />
        </div>
      </div>
    </div>
  )
}

export default HeroSectionTwo