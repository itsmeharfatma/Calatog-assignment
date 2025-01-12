import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import LineChart from "./LineChart";
import useWindowWidth from "./useWindowWidth";

const ChartComponent = () => {
  const [timeRange, setTimeRange] = useState("1w"); // Default time range
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const chartContainerRef = useRef(null);
  const windowWidth = useWindowWidth();

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
    aspectRatio: windowWidth < 768 ? 1 / 2 : undefined,
  };

  // Full-Screen Functionality with ESC Handling
  const toggleFullScreen = () => {
    const element = chartContainerRef.current;
    if (!document.fullscreenElement) {
      element?.requestFullscreen().then(() => setIsFullScreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullScreen(false));
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <div className="w-full mx-auto py-4">
      <div className="py-2 flex flex-col md:flex-row justify-start md:justify-between space-x-4 max-md:space-y-3">
        <div className="flex flex-row gap-2 text-grayColor text-sm font-medium">
          <button
            className="hover:bg-gray-100 px-4 py-2 rounded-md"
            onClick={toggleFullScreen}
          >
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

        <div className="flex flex-row flex-wrap space-x-2 max-md:space-y-2">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-1.5 rounded-md font-medium text-sm ${
                range === timeRange
                  ? "bg-accentColor text-white"
                  : "text-grayColor hover:bg-gray-100"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <div
        className={`${
          isFullScreen
            ? "fixed inset-0 bg-white z-50 top-0 left-0 lg:pt-20 lg:px-20"
            : "relative"
        } mt-6`}
        ref={chartContainerRef}
      >
        {loading ? (
          <p className="mt-32 font-medium text-center text-grayColor lg:text-2xl">
            Loading chart...
          </p>
        ) : chartData ? (
          <div className="justify-center w-full">
            <LineChart chartData={chartData} chartOptions={chartOptions} />
          </div>
        ) : (
          <p className="text-center">No data available</p>
        )}

        {isFullScreen && (
          <button
            className="absolute top-4 right-4 bg-red-600 text-sm text-white px-4 py-2 rounded-md"
            onClick={toggleFullScreen}
          >
            <i class="fas fa-down-left-and-up-right-to-center mr-2"></i>
            Exit Fullscreen
          </button>
        )}
      </div>
    </div>
  );
};

export default ChartComponent;
