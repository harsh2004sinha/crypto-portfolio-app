"use client"
import Link from "next/link"
import { Vortex } from "./ui/vortex"

function HeroSectionTwo() {
  return (
    <div className="h-screen -mt-2">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-yellow-400 text-2xl md:text-6xl font-bold text-center">
        Detailed Analytics
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
        Analyze your portfolio performance with detailed charts, historical data, and trend analysis.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button className="px-4 py-2 bg-blue-600 hover:bg-transparent transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            <Link href="#">WatchList</Link>
          </button>
        </div>
      </Vortex>
    </div>

  )
}

export default HeroSectionTwo