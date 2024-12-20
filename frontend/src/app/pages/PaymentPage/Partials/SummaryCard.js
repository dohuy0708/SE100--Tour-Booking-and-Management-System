import React from "react";
import { sPayment } from "../paymentStore";
export default function SummaryCard({ tour, day }) {
  const sPassengers = sPayment.slice((n) => n.passengers).use();
  const sPrice = sPayment.slice((n) => n.price).use();
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">TÓM TẮT CHUYẾN ĐI</h3>
      <div className=" bg-white border border-gray-200 rounded-lg shadow-md p-8">
        <div className="">
          <h3 className="text-xl font-bold text-main mb-2">{tour.title}</h3>
          <hr className="w-3/4 text-black mx-auto" />
          <p className="my-2">
            <span className="font-bold">Mã tour:</span> {tour.id}
          </p>
          <p className="my-2">
            <span className="font-bold">Thời gian:</span> {tour.duration}
          </p>
          <p className="mt-2 mb-4 ">
            <span className="font-bold">Xuất phát:</span> {tour.startPoint}
          </p>
          <hr className="w-3/4 text-black mx-auto" />
          <p className="mt-4">
            <span className="font-bold">Ngày đi:</span> {day.date}
          </p>
          <p className="mt-2 mb-4">
            <span className="font-bold">Ngày về:</span> {day.end_date}
          </p>
        </div>
        <hr className="w-3/4 text-black mx-auto" />
        <div className="mt-2  pt-4">
          <h4 className="font-bold text-gray-800 mb-2">KHÁCH HÀNG</h4>
          <div className="space-y-1">
            {sPassengers
              .reduce((acc, passenger) => {
                const existingType = acc.find(
                  (item) => item.type === passenger.type
                );
                if (existingType) {
                  existingType.quantity += 1;
                } else {
                  acc.push({ type: passenger.type, quantity: 1 });
                }

                return acc;
              }, [])
              .map((item, index) => {
                if (item.quantity > 0)
                  var displayType =
                    item.type === "adult"
                      ? "Người lớn"
                      : item.type === "child"
                      ? "Trẻ em"
                      : item.type === "baby"
                      ? "Em bé"
                      : item.type;
                var displayPrice =
                  item.type === "adult"
                    ? day.tickets[0].price
                    : item.type === "child"
                    ? day.tickets[1].price
                    : item.type === "baby"
                    ? day.tickets[2].price
                    : item.type;

                return (
                  <p key={index}>
                    <span className="font-semibold">{displayType}:</span>{" "}
                    {item.quantity} × {displayPrice.toLocaleString()} đ
                  </p>
                );
              })}
          </div>
        </div>
        <div className="mt-6 text-right">
          <p className="text-xl font-bold  mb-2">
            Tổng tiền:{" "}
            <span className="text-red">{sPrice.toLocaleString()} đ</span>
          </p>
          <button className="w-full bg-main hover:bg-blue-700 text-white font-bold py-2 rounded-lg">
            Đặt Ngay
          </button>
        </div>
      </div>
    </div>
  );
}
