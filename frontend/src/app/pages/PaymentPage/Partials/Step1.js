import React from "react";
import ContactInfo from "./ContactInfo";
import PassengerList from "./PassengerList";
import PaymentMethods from "./PaymentMethods";
import NotesSection from "./NotesSection";

const Step1 = () => {
  // const [notes, setNotes] =
  //  useState(sPayment.notes); // Ghi chú
  // const [selectedPayment, setSelectedPayment] = useState("cash"); // Phương thức thanh toán

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">THÔNG TIN LIÊN LẠC</h3>
      <ContactInfo />

      <h3 className="text-lg font-bold mt-8 mb-4">HÀNH KHÁCH</h3>
      <PassengerList />

      {/* Ghi chú */}
      <NotesSection
      // notes={notes} setNotes={setNotes}
      />

      {/* Phương thức thanh toán */}
      <PaymentMethods
      // selectedPayment={selectedPayment}
      // setSelectedPayment={setSelectedPayment}
      />
    </div>
  );
};

export default Step1;
