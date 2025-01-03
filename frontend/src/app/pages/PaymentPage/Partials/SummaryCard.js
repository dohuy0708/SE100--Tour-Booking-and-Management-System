import React, { useEffect } from "react";
import { sPayment } from "../paymentStore";
import { useNavigate } from "react-router-dom";
export default function SummaryCard({ tour, schedule }) {
  const sPassengers = sPayment.slice((n) => n.passengers).use();
  const sPrice = sPayment.slice((n) => n.price).use();
  const nav = useNavigate();
  const handleChooseOtherDay = () => {
    nav(`/tour/${tour._id}`);
  };
  // useEffect(() => {
  //   console.log("lick :", schedule);
  // }, [sPrice]);
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">TÓM TẮT CHUYẾN ĐI</h3>
      <div className=" bg-white border border-gray-200 rounded-lg shadow-md p-8">
        <div className="">
          <h3 className="text-xl font-bold text-main mb-2">
            {tour?.tour_name}
          </h3>
          <hr className="w-3/4 text-black mx-auto" />
          <p className="my-4">
            <span className="font-bold">Mã tour:</span> {tour?.tour_code}
          </p>
          <p className="my-4">
            <span className="font-bold">Thời gian:</span> {tour?.duration} ngày
          </p>

          <p className="mt-4">
            <span className="font-bold">Ngày đi:</span>{" "}
            {schedule.departure_time}{" "}
            {new Date(schedule.departure_date).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
          <p className="mt-2 mb-4">
            {/* <span className="font-bold">Ngày về:</span> {schedule.end_date} */}
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
                    item.type === "ADULT"
                      ? "Người lớn"
                      : item.type === "CHILDREN"
                      ? "Trẻ em"
                      : item.type === "INFANT"
                      ? "Em bé"
                      : item.type;

                var iN =
                  item.type === "ADULT"
                    ? "adult_price"
                    : item.type === "CHILDREN"
                    ? "children_price"
                    : "infant_price";
                var displayPrice = parseFloat(
                  tour.tourPrice[iN].$numberDecimal
                );
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
          <button
            className="w-full bg-main hover:bg-blue-700 text-white font-bold py-2 rounded-lg"
            onClick={handleChooseOtherDay}
          >
            Chọn ngày khác
          </button>
        </div>
      </div>
    </div>
  );
}
