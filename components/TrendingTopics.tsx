import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUpIcon } from 'lucide-react'

export default function TrendingTopics() {
  const trendingTopics = [
    "GPT-4", "Quantum AI", "Autonomous Vehicles", "AI Ethics", "Computer Vision"
  ]

  return (
    <Card className="bg-[#1A1A1A] border-[#333]">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUpIcon className="mr-2 h-5 w-5" />
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {trendingTopics.map((topic, index) => (
            <li key={index} className="text-sm hover:text-[#50E3C2] cursor-pointer">
              #{topic}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

