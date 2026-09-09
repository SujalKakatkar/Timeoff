
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { StatsCardType } from "@/types/staticTypes"

type SectionCardsType = {
    cardItems:StatsCardType[]
}

export function SectionCards({cardItems}:SectionCardsType) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">

      {cardItems.length > 0 && cardItems?.map((item)=>(
        <Card key={item.title} className="@container/card">
          <CardHeader>
            <CardDescription>{item.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {item.count}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {item.icon}
              
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {item.footerHeadline}
            </div>
            <div className="text-muted-foreground">
              {item.footerSubtext}
            </div>
          </CardFooter>
        </Card>
      ))}


      {/* first card */}
     

      
    </div>
  )
}
