import { useCallback, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid, Legend, Line, ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { useLocalStorage } from "store/useLocalStorage";


const GraficoConsultasRealizadas = () => {
    const defaultListadoConsultas = require('../json/mockListadoConsultas.json');
    const [listadoConsultas, setListadoConsultas] = useLocalStorage('consulta', defaultListadoConsultas); 
    //Refresca la página para recoger los datos más actualizados   
    

  return (
    
    <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={listadoConsultas}
          margin={{
            top: 20,
            right: 20,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hora" />
          <YAxis dataKey="precioReal"  orientation="left"  tickCount={10}/>
          
          <Tooltip />
          <Legend />
          <Bar  dataKey="precioReal" fill="#DC593E" />
          <Bar  dataKey="precioConPlacas" fill="#32B43A" />
        </BarChart>
      </ResponsiveContainer>   
  );
};

export default GraficoConsultasRealizadas;