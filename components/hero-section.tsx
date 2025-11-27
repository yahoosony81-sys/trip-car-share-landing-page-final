"use client"

import { Button } from "@/components/ui/button"
import { Car } from "lucide-react"
import { useState } from "react"
import { WaitlistModal } from "./waitlist-modal"

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 py-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/business-traveler-happy-finding-shared-car-at-airp.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 text-white/90 text-sm font-medium bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Car className="w-5 h-5" />
                <span>TripCarShare</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance mb-8">
              여행 중, 내 차가
              <br />
              <span className="text-white/95">누군가의 발이 된다</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12">
              출발하는 여행자는 차량을 맡기고,
              <br />
              도착하는 여행자는 바로 이용하세요.
            </p>

            <div>
              <Button
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="bg-white hover:bg-gray-100 text-black font-bold text-lg px-10 py-7 rounded-full shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:scale-105"
              >
                지금 웨이팅 리스트 등록하기
              </Button>
            </div>
          </div>
        </div>
      </section>

      <WaitlistModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  )
}
