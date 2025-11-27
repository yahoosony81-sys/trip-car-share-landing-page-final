"use client"

import { Card } from "@/components/ui/card"

export function DemoPreview() {
  return (
    <section className="py-24 px-4 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            트립카셰어는 이렇게 쉽습니다
          </h2>
          <p className="text-base text-muted-foreground italic">*데모는 예시 화면이며 실제 기능은 추후 제공됩니다</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <Card className="p-6 bg-white hover:shadow-xl transition-all duration-300">
            <div className="space-y-4">
              <div className="bg-secondary/50 rounded-2xl p-6 aspect-[4/5] flex items-center justify-center overflow-hidden">
                <img
                  src="/mobile-app-screenshot-car-location-map-interface-p.jpg"
                  alt="차량 등록 화면"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-foreground">내 차량 등록하기</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  공항 주차장에 차를 두고 여행 일정을 입력하세요
                </p>
              </div>
            </div>
          </Card>

          {/* Step 2 */}
          <Card className="p-6 bg-white hover:shadow-xl transition-all duration-300">
            <div className="space-y-4">
              <div className="bg-secondary/50 rounded-2xl p-6 aspect-[4/5] flex items-center justify-center overflow-hidden">
                <img
                  src="/mobile-app-screenshot-available-cars-list-search-r.jpg"
                  alt="차량 검색 화면"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-foreground">원하는 차량 찾기</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  도착 시간에 맞는 차량을 검색하고 즉시 예약하세요
                </p>
              </div>
            </div>
          </Card>

          {/* Step 3 */}
          <Card className="p-6 bg-white hover:shadow-xl transition-all duration-300">
            <div className="space-y-4">
              <div className="bg-secondary/50 rounded-2xl p-6 aspect-[4/5] flex items-center justify-center overflow-hidden">
                <img
                  src="/mobile-app-screenshot-booking-confirmation-success.jpg"
                  alt="예약 완료 화면"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-foreground">바로 픽업하기</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  비행기 내리자마자 바로 차량을 픽업하고 출발하세요
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
