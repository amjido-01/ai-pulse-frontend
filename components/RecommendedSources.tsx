import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LinkIcon } from 'lucide-react'

export default function RecommendedSources() {
  const sources = [
    { name: "AI News Daily", url: "#" },
    { name: "TechCrunch AI", url: "#" },
    { name: "MIT Technology Review", url: "#" },
    { name: "AI Trends", url: "#" },
  ]

  return (
    <Card className="bg-[#1A1A1A] border-[#333]">
      <CardHeader>
        <CardTitle className="flex items-center">
          <LinkIcon className="mr-2 h-5 w-5" />
          Recommended Sources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {sources.map((source, index) => (
            <li key={index} className="text-sm">
              <a href={source.url} className="hover:text-[#50E3C2]">
                {source.name}
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

