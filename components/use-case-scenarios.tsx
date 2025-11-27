import { Card } from "@/components/ui/card"
import { Plane, MapPin, Briefcase } from "lucide-react"

const scenarios = [
  {
    icon: Plane,
    userType: "출발 여행자",
    description: "제주 출장을 가며 공항 주차비가 아깝다? 차량을 등록하고 수익으로 전환하세요.",
    bgColor: "bg-gray-100",
  },
  {
    icon: MapPin,
    userType: "도착 여행자",
    description: "비행기 내리자마자 바로 차 타고 숙소로 — 렌트 대기 없이 출발!",
    bgColor: "bg-gray-100",
  },
  {
    icon: Briefcase,
    userType: "빈번한 출장자",
    description: "매번 렌트카 예약 스트레스 없이, 지역 차량을 즉시 예약하세요.",
    bgColor: "bg-gray-100",
  },
]

export function UseCaseScenarios() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-4xl mb-4">
            <Plane className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            이런 순간, 트립카셰어가 해결합니다
          </h2>
          <p className="text-lg text-muted-foreground">공항 주차비 아끼고, 여행자는 바로 출발하세요.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {scenarios.map((scenario, index) => (
            <Card
              key={index}
              className={`p-6 ${scenario.bgColor} border-none hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md">
                  <scenario.icon className="w-10 h-10 text-black" />
                </div>
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-xl">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-foreground">{scenario.userType}</h3>
                <p className="text-foreground/80 leading-relaxed">{scenario.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
