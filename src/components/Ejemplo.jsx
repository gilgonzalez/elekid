import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'ENERO',
    alta: 4000,
    baja: 2400,
    amt: 3000,
  },
  {
    name: 'FEBRERO',
    alta: 3000,
    baja: 1398,
    amt: 2210,
  },
  {
    name: 'MARZO',
    alta: 9800,
    baja: 4000,
    amt: 5342,
  },
  {
    name: 'ABRIL',
    alta: 5499,
    baja: 3908,
    amt: 4500,
  },
  {
    name: 'MAYO',
    alta: 10000,
    baja: 6000,
    amt: 7500,
  },
  {
    name: 'JUNIO',
    alta: 5000,
    baja: 3800,
    amt: 4500,
  },
  {
    name: 'JULIO',
    alta: 3456,
    baja: 1654,
    amt: 2100,
  },
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="alta" stroke="#ff0000" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="baja" stroke="#0000ff" />
          <Line type="monotone" dataKey="amt" stroke="#008f39" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}