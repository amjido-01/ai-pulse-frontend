import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookmarkIcon, ShareIcon } from 'lucide-react'

interface NewsItem {
  id: number
  title: string
  category: string
  // Add more properties as needed
}

interface NewsCardProps {
  news: NewsItem
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <Card className="bg-[#1A1A1A] border-[#333] hover:border-[#50E3C2] transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg">{news.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-400 mb-4">{news.category}</p>
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="sm">
            Read More
          </Button>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <BookmarkIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShareIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

