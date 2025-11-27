import { Card } from "@/components/ui/card"
import { Car, Clock, CreditCard } from "lucide-react"

const services = [
  {
    icon: Car,
    title: "내차량 공유",
    description: "출발 여행자는 주차장 차량을 등록해 두세요.",
  },
  {
    icon: Clock,
    title: "공유차량 찾기",
    description: "도착 여행자는 바로 이용 가능한 차량을 검색합니다.",
  },
  {
    icon: CreditCard,
    title: "자동 정산",
    description: "이용 요금은 간편 결제로 자동 정산됩니다.",
  },
]

export function ServiceSummary() {
  return (
    <section className="py-24 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-700 mb-4 text-balance">
            렌트카보다 합리적으로,
            <br className="md:hidden" /> 공유보다 간편하게.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-8 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-gray-300 hover:-translate-y-2 bg-gray-50"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-200 mb-6">
                <service.icon className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-700">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
