import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
  } from 'recharts'
  
  const ProgressChart = ({ data }) => {
    return (
      <div className="chart-container">
        <h3>Weight Progress Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#00f7ff"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
  
  export default ProgressChart
  