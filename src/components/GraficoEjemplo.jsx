import { PureComponent } from "react";
import {
  ComposedChart,
  Area,
  Legend,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const hoyData = require("../json/precio_hoy.json");
let total = 0;
hoyData.map((tramo) => {
  total += tramo.price;
});
total /= 24;
for (const element of hoyData) {
  element.promedio = total;
}
console.log(total);
console.log(hoyData);

export default class ExampleGraphic extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-area-chart-4ujxw";

  render() {
    return (
      <ResponsiveContainer width="100%" height="90%">
        <ComposedChart
          width={500}
          height={400}
          data={hoyData}
          margin={{
            top: 20,
            right: 80,
            bottom: 20,
            left: 20,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="hour"
            label={{ value: "Horas", position: "insideBottomRight", offset: 0, padding:'10' }}
            scale="band"
          />
          <YAxis
            label={{
              value: "Precio:€ kW/h",
              angle: -90,
              position: "insideLeft",
              
            }}
            tickCount = {10}
          />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="price"
            fill="url(#colorUv)"
            stroke="#8884d8"
          />
          <Line type="monotone" dataKey="promedio" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
