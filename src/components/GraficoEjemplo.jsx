import { useEffect, useState } from "react";
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
import { useAppSelector } from "store/store";

//const hoyData = require("../json/precio_hoy.json");

const ExampleGraphic = () => {
  let hoyData = useAppSelector((state) => state.consulta.datos);

  if(hoyData === undefined){
    hoyData = require("../json/precio_hoy.json");
  }

  const [hoyDataExt, setHoyDataExt] = useState(undefined);
  useEffect(() => {
    if(!hoyData) return;
    
    let total = hoyData?.reduce((prev, tramo) => prev + tramo.price, 0);
    total /= 24;

    const hoyDataAux = [];
    for (const element of hoyData) {
      hoyDataAux.push({ ...element, promedio: total });
    }

    setHoyDataExt(hoyDataAux);
  }, [hoyData]);

  return (
    <ResponsiveContainer width="100%" height="90%">
      <ComposedChart
        width={500}
        height={400}
        data={hoyDataExt}
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
          label={{
            value: "Horas",
            position: "insideBottomRight",
            offset: 0,
            padding: "10",
          }}
          scale="band"
        />
        <YAxis
          label={{
            value: "Precio:€ kW/h",
            angle: -90,
            position: "insideLeft",
          }}
          tickCount={10}
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
};

export default ExampleGraphic;
