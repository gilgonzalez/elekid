import { useCallback, useEffect, useState } from "react";
import {
  Area,
  CartesianGrid, ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart
} from "recharts";
import { useAppSelector } from "store/store";

//const hoyData = require("../json/precio_hoy.json");

const GraficoPrecioPorHoras = () => {
  let hoyData = useAppSelector((state) => state.consulta.datos);
  //Refresca la página para recoger los datos más actualizados   
  useCallback(()=>{window.location.href = window.location.href;},[])

  if(hoyData === undefined){
    hoyData = require("../json/precio_hoy.json");
  }

  const [hoyDataExt, setHoyDataExt] = useState(undefined);

  let total = hoyData?.reduce((prev, tramo) => prev + tramo.price, 0);
  
  total /= 24;

  useEffect(() => {
    if(!hoyData) return;
    
    const hoyDataAux = [];
    for (const element of hoyData) {
      hoyDataAux.push({ ...element, promedio: total });
    }

    setHoyDataExt(hoyDataAux);
  }, [hoyData]);

  /*const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.uv));
    const dataMin = Math.min(...data.map((i) => i.uv));
  
    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }
  
    return dataMax / (dataMax - dataMin);
  };
  
  const off = gradientOffset();*/
  return (
    <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={hoyData}
          margin={{
            top: 20,
            right: 20,
            left: -10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" label={{
            value: "Horas",
            position: "insideBottomRight",
            offset: -3,
            padding: "10",
          }}/>
          <YAxis type="number" tickCount={20} domain={[0, 0.5]}
          />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={total} stopColor="red" stopOpacity={1} />
              <stop offset={total} stopColor="green" stopOpacity={0.75} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="price" stroke="#000" fill="url(#splitColor)" />
        </AreaChart>
      </ResponsiveContainer>
    
  );
};

export default GraficoPrecioPorHoras;
