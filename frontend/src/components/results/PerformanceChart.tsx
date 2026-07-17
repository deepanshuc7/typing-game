import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TypingSample } from "@/types/typing";
import "./PerformanceChart.css";

interface PerformanceChartProps {
  samples: TypingSample[];
}

function describePerformance(samples: TypingSample[]) {
  if (samples.length === 0) {
    return "No performance samples were recorded for this test.";
  }

  const wpmValues = samples.map((sample) => sample.wpm);
  const finalSample = samples.at(-1)!;

  return `WPM ranged from ${Math.min(...wpmValues)} to ${Math.max(
    ...wpmValues,
  )} and finished at ${finalSample.wpm}.`;
}

export function PerformanceChart({ samples }: PerformanceChartProps) {
  const chartData = samples.map((sample, index) => ({
    ...sample,
    mistakeMarker: sample.mistakes > (samples[index - 1]?.mistakes ?? 0) ? sample.wpm : undefined,
  }));

  const description = describePerformance(samples);

  return (
    <figure className="performance-chart" aria-labelledby="performance-chart-title">
      <figcaption id="performance-chart-title" className="performance-chart__title">
        Performance over time
      </figcaption>

      <p className="performance-chart__description">{description}</p>

      {samples.length === 0 ? (
        <div className="performance-chart__empty">Not enough data to draw the graph.</div>
      ) : (
        <div className="performance-chart__canvas" role="img" aria-label={description}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
              <defs>
                <linearGradient id="wpm-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 5" vertical={false} />
              <XAxis
                dataKey="second"
                stroke="var(--color-text-muted)"
                tickLine={false}
                axisLine={false}
                tickFormatter={(second: number) => `${second}s`}
              />
              <YAxis
                stroke="var(--color-text-muted)"
                tickLine={false}
                axisLine={false}
                width={46}
              />
              <Tooltip
                labelFormatter={(second) => `${second} seconds`}
                contentStyle={{
                  background: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                }}
              />
              <Legend iconType="plainline" />

              <Area
                type="monotone"
                dataKey="wpm"
                fill="url(#wpm-area)"
                stroke="none"
                legendType="none"
                tooltipType="none"
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="wpm"
                name="WPM"
                stroke="var(--color-accent)"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5 }}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="rawWpm"
                name="Raw WPM"
                stroke="var(--color-text-muted)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                isAnimationActive={false}
              />
              <Line
                dataKey="mistakeMarker"
                name="Mistake"
                stroke="transparent"
                dot={{ fill: "var(--color-incorrect)", r: 4, strokeWidth: 0 }}
                activeDot={{ fill: "var(--color-incorrect)", r: 5, strokeWidth: 0 }}
                legendType="circle"
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </figure>
  );
}
