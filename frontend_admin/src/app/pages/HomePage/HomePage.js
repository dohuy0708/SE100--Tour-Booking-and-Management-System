import React from "react";
import RevenueChart from "../../components/RevenueChart";

export default function HomePage() {
  return (
    <div class="p-6   min-h-screen">
      <div class="grid grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex items-center justify-between">
            <div class="text-purple-500 text-3xl font-bold">1221</div>
            <div class="bg-purple-100 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a9 9 0 10-18 0v2h5m-5-6h18m-9 3v3m0 0l-3-3m3 3l3-3"
                />
              </svg>
            </div>
          </div>
          <div class="text-gray-500 mt-2">Tổng khách hàng mới</div>
          <div class="text-green-500 text-sm mt-1">▲ 8.5% tháng trước</div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex items-center justify-between">
            <div class="text-yellow-500 text-3xl font-bold">29</div>
            <div class="bg-yellow-100 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c1.046 0 2 .954 2 2 0 1.046-.954 2-2 2s-2-.954-2-2c0-1.046.954-2 2-2zM12 16c1.046 0 2 .954 2 2 0 1.046-.954 2-2 2s-2-.954-2-2c0-1.046.954-2 2-2z"
                />
              </svg>
            </div>
          </div>
          <div class="text-gray-500 mt-2">Tổng chuyến đi</div>
          <div class="text-green-500 text-sm mt-1">▲ 1.3% tháng trước</div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex items-center justify-between">
            <div class="text-green-500 text-3xl font-bold">$89,000</div>
            <div class="bg-green-100 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c1.046 0 2 .954 2 2 0 1.046-.954 2-2 2s-2-.954-2-2c0-1.046.954-2 2-2zM12 16c1.046 0 2 .954 2 2 0 1.046-.954 2-2 2s-2-.954-2-2c0-1.046.954-2 2-2z"
                />
              </svg>
            </div>
          </div>
          <div class="text-gray-500 mt-2">Tổng doanh thu</div>
          <div class="text-red-500 text-sm mt-1">▼ 4.3% tháng trước</div>
        </div>
      </div>

      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Các thẻ thống kê khác */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              THỐNG KÊ DOANH THU
            </h2>
            <select className="border border-gray-300 rounded-lg p-2">
              <option>October</option>
              <option>November</option>
            </select>
          </div>

          <div className="mt-6">
            {/* Thay thế bằng RevenueChart */}
            <RevenueChart />
          </div>
        </div>
      </div>
    </div>
  );
}
