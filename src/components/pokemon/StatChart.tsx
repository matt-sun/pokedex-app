import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

interface Props {
  hp: number | undefined;
  attack: number | undefined;
  defense: number | undefined;
  speAtt: number | undefined;
  speDef: number | undefined;
  speed: number | undefined;
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
    { stat: "HP", power: props.hp, max: props.hp ? 255 - props.hp : 255 },
    {
      stat: "Att",
      power: props.attack,
      max: props.attack ? 255 - props.attack : 255,
    },
    {
      stat: "Def",
      power: props.defense,
      max: props.defense ? 255 - props.defense : 255,
    },
    {
      stat: "Sp. Def.",
      power: props.speAtt,
      max: props.speAtt ? 255 - props.speAtt : 255,
    },
    {
      stat: "Sp. Att.",
      power: props.speDef,
      max: props.speDef ? 255 - props.speDef : 255,
    },
    {
      stat: "Speed",
      power: props.speed,
      max: props.speed ? 255 - props.speed : 255,
    },
  ];

  return (
    <Card className="min-h-full">
      <CardHeader>
        <CardTitle className="text-pokemon-blue">Base Stats</CardTitle>
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
