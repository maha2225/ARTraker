import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdherenceChart = ({ data }) => {
  // Transform data: [{ date: '2025-11-01', status: 'Taken' }, ...]
  const chartData = data.map(entry => ({
    date: entry.date,
    value: entry.status === 'Taken' ? 1 : 0, // 1 for Taken, 0 for Missed
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Adherence Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis ticks={[0, 1]} domain={[0, 1]} />
          <Tooltip formatter={value => (value === 1 ? 'Taken' : 'Missed')} />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdherenceChart;
