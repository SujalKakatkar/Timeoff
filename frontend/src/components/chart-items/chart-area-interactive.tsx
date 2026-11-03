import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import TimeSeriesChartGrid, { type SeriesConfig } from "./time-series-chart-grid"


type RangeOption = { value: string; label: string; days: number }

export function TimeSeriesChart<TData extends Record<string, unknown>>({
  title,
  description,
  descriptionFull,
  data,
  dateKey = "date",
  series,
  ranges,
  stacked = true,
  days,
  setDays
}: {
  title: string
  description: string
  descriptionFull?: string
  data: TData[]
  dateKey?: string
  series: SeriesConfig[]
  ranges?: RangeOption[]
  defaultRange?: string
  stacked?: boolean
  days: number,
  setDays: React.Dispatch<React.SetStateAction<number>>
}) {

  const isMobile = useIsMobile();

  const activeValue = ranges?.find((r) => r.days === days)?.value

  const handleRangeChange = (value: string | undefined) => {
    const range = ranges?.find((r) => r.value === value)
    if (range) setDays(range.days)
  }

  React.useEffect(() => {
    if (!isMobile || !ranges?.length) return
    setDays(Math.min(...ranges.map((r) => r.days)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])


  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {descriptionFull ? (
            <>
              <span className="hidden @[540px]/card:block">{descriptionFull}</span>
              <span className="@[540px]/card:hidden">{description}</span>
            </>
          ) : (
            description
          )}
        </CardDescription>
        {ranges && ranges.length > 0 && (
          <CardAction>
            <ToggleGroup
              multiple={false}
              value={activeValue ? [activeValue] : []}
              onValueChange={(value) => handleRangeChange(value[0] ?? ranges[0].value)}
              variant="outline"
              className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
            >
              {ranges.map((r) => (
                <ToggleGroupItem key={r.value} value={r.value}>{r.label}</ToggleGroupItem>
              ))}
            </ToggleGroup>
            <Select value={activeValue} onValueChange={(value) => value && handleRangeChange(value)}>
              <SelectTrigger
                className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                size="sm"
                aria-label="Select a range"
              >
                <SelectValue placeholder={ranges[0].label} />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {ranges.map((r) => (
                  <SelectItem key={r.value} value={r.value} className="rounded-lg">
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <TimeSeriesChartGrid data={data} dateKey={dateKey} series={series} stacked={stacked} />
      </CardContent>
    </Card>
  )
}