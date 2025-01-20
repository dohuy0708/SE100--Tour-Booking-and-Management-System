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

const RevenueChart = ({ labels, data }) => {
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
        labels,
        datasets: [
          {
            label: "Doanh thu",
            data,
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
                return value.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                });
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
  }, [labels, data]);

  return (
    <div style={{ position: "relative", height: "400px" }}>
      <canvas ref={canvasRef} id="revenueChart"></canvas>
    </div>
  );
};

export default RevenueChart;
