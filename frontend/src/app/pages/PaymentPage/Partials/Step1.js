import React, { useEffect } from "react";
import ContactInfo from "./ContactInfo";
import PassengerList from "./PassengerList";
import PaymentMethods from "./PaymentMethods";
import NotesSection from "./NotesSection";
import SummaryCard from "./SummaryCard";
import { sPayment } from "../paymentStore";
const Step1 = ({ tour, schedule }) => {
  const sPrice = sPayment.slice((n) => n.price).use();
  useEffect(() => {
    console.log(sPrice);
  }, [sPrice]);
  return (
    <div className="grid grid-cols-3 gap-x-8">
      <div className="col-span-2">
        <h3 className="text-lg font-bold mb-4">THÔNG TIN LIÊN LẠC</h3>
        <ContactInfo />
        <h3 className="text-lg font-bold mt-8 mb-4">HÀNH KHÁCH</h3>
        <PassengerList price={tour.tourPrice} />
        <NotesSection />
        <PaymentMethods />
      </div>
      <SummaryCard tour={tour} schedule={schedule} />
    </div>
  );
};

export default Step1;
