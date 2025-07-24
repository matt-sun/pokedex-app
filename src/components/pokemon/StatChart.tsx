import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

interface Props {
  hp: number;
  attack: number;
  defense: number;
  speAtt: number;
  speDef: number;
  speed: number;
}

const chartConfig = {
  power: {
    label: "Power",
    color: "var(--chart-1)",
  },
  max: {
    label: "Max",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

function StatChart(props: Props) {
  const chartData = [
    { stat: "HP", power: props.hp, max: 255 - props.hp },
    { stat: "Att", power: props.attack, max: 255 - props.attack },
    { stat: "Def", power: props.defense, max: 255 - props.defense },
    { stat: "Sp. Def.", power: props.speAtt, max: 255 - props.speAtt },
    { stat: "Sp. Att.", power: props.speDef, max: 255 - props.speDef },
    { stat: "Speed", power: props.speed, max: 255 - props.speed },
  ];

  return (
    <Card className="min-h-full">
      <CardHeader>
        <CardTitle>Base Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          style={{ width: "100%", aspectRatio: "4/3" }}
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="stat"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 6)}
              style={{ fontSize: "0.7rem" }}
            />
            <Bar
              dataKey="power"
              stackId="a"
              fill="var(--color-pokemon-blue)"
              radius={[0, 0, 8, 8]}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar
              dataKey="max"
              stackId="a"
              fill="var(--color-pokemon-blue)"
              opacity={0.3}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default StatChart;
