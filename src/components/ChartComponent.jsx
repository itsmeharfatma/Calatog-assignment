import React, { useState, useEffect } from "react";
import axios from "axios";
import LineChart from "./LineChart";

const ChartComponent = () => {
  const [timeRange, setTimeRange] = useState("1w"); // Default time range
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  const timeRanges = ["1d", "3d", "1w", "1m", "6m", "1y", "max"];

  const fetchChartData = async () => {
    setLoading(true);
    try {
      // Mock API URL
      const response = await axios.get(
        "https://67801fab0476123f76a9a8b5.mockapi.io/api/chartData"
      );
      const dataForRange = response.data.find(
        (entry) => entry.range === timeRange
      ); // Filter data by selected range
      if (dataForRange) {
        setChartData({
          labels: dataForRange.labels,
          datasets: [
            {
              label: "Price (USD)",
              data: dataForRange.data,
              fill: true,
              borderColor: "#4F46E5",
              backgroundColor: "rgba(79, 70, 229, 0.2)",
              tension: 0.2,
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [timeRange]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        display: false,
        grid: { display: false },
      },
      y: { grid: { color: "#E5E7EB" }, beginAtZero: false },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="text-center mb-4">
        <h2 className="text-4xl font-bold">63,179.71 USD</h2>
        <p className="text-green-500 text-lg">+2,161.42 (3.54%)</p>
      </div>
      <div className="border-t border-b py-2 flex justify-center items-center space-x-4">
        <button className="text-blue-500 font-medium">Fullscreen</button>
        <button className="text-blue-500 font-medium">Compare</button>
        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded ${
                range === timeRange
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6">
        {loading ? (
          <p className="text-center">Loading chart...</p>
        ) : chartData ? (
          <LineChart chartData={chartData} chartOptions={chartOptions} />
        ) : (
          <p className="text-center">No data available</p>
        )}
      </div>
    </div>
  );
};

export default ChartComponent;
