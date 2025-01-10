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
              borderColor: "#4B40EE",
              backgroundColor: "rgba(75, 64, 238, 0.2)",
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
    <div className="w-full mx-auto py-4">
      <div className="py-2 flex flex-col md:flex-row justify-start md:justify-between space-x-4 max-md:space-y-3">
        <div className="flex flex-row gap-6 text-[#6F7177] font-medium">
          <button className="hover:bg-gray-100 px-4 py-2 rounded-md">
            <i className="fas fa-up-right-and-down-left-from-center mr-2"></i>
            Fullscreen
          </button>
          <button className="hover:bg-gray-100 px-4 py-2 rounded-md">
            <i
              className="far fa-circle-xmark fa-rotate-by fa-lg mr-2"
              style={{ transform: "rotate(45deg)" }}
            ></i>
            Compare
          </button>
        </div>

        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-1.5 rounded-md font-medium ${
                range === timeRange
                  ? "bg-[#4B40EE] text-white"
                  : "text-[#6F7177] hover:bg-gray-100"
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
