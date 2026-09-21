import React from 'react'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '../ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

export type SeriesConfig = { key: string, label: string, color: string }

function TimeSeriesChartGrid<CData extends Record<string, unknown>>(
    {
        data,
        dateKey,
        series,
        stacked
    }: {
        data: CData[],
        dateKey: string,
        series: SeriesConfig[]
        stacked: boolean
    }
) {

    const instanceId = React.useId();

    const chartConfig = Object.fromEntries(
        series.map((s) => [s.key, { label: s.label, color: s.color }])
    ) satisfies ChartConfig

    return (
        <ChartContainer config={chartConfig} className="aspect-auto h-62.5 w-full">
            <AreaChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
                <defs>
                    {series.map((s) => (
                        <linearGradient key={s.key} id={`${instanceId}-fill-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={`var(--color-${s.key})`} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={`var(--color-${s.key})`} stopOpacity={0.1} />
                        </linearGradient>
                    ))}
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey={dateKey}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) =>
                        new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    }
                />
                <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            labelFormatter={(value) =>
                                new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                            }
                            indicator="dot"
                        />
                    }
                />
                {series.map((s) => (
                    <Area
                        key={s.key}
                        dataKey={s.key}
                        type="natural"
                        fill={`url(#${instanceId}-fill-${s.key})`}
                        stroke={`var(--color-${s.key})`}
                        stackId={stacked ? "a" : undefined}
                    />
                ))}
            </AreaChart>
        </ChartContainer>
    )
}

export default TimeSeriesChartGrid  