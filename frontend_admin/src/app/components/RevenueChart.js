import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  const chartRef = useRef(null); // Dùng để lưu trữ instance của biểu đồ
  const canvasRef = useRef(null); // Dùng để tham chiếu đến phần tử canvas

  useEffect(() => {
    // Hủy biểu đồ cũ nếu đã tồn tại
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Tạo biểu đồ mới
    const ctx = canvasRef.current.getContext("2d");
    chartRef.current = new ChartJS(ctx, {
      type: "line",
      data: {
        labels: [
          "5k",
          "10k",
          "15k",
          "20k",
          "25k",
          "30k",
          "35k",
          "40k",
          "45k",
          "50k",
          "55k",
          "60k",
        ],
        datasets: [
          {
            label: "Doanh thu",
            data: [20, 40, 60, 100, 80, 90, 70, 60, 50, 80, 90, 70],
            borderColor: "#4F46E5",
            backgroundColor: "rgba(79, 70, 229, 0.2)",
            fill: true,
            tension: 0.4, // Làm mượt đường
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + "%"; // Hiển thị đơn vị %
              },
            },
          },
        },
      },
    });

    // Cleanup khi component bị unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", height: "400px" }}>
      <canvas ref={canvasRef} id="revenueChart"></canvas>
    </div>
  );
};

export default RevenueChart;
