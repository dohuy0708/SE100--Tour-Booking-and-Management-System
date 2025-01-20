import React, { useState, useEffect } from "react";
import { sPayment } from "../paymentStore";
import { getPaymentMethods } from "../../../Services/userService";
const PaymentMethods = () => {
  const payment = sPayment.slice((n) => n.paymentMethod).use();
  const [paymentList, setPaymentList] = useState([]);
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const paymentRes = await getPaymentMethods();
        if (paymentRes) setPaymentList(paymentRes);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      }
    };

    fetchPaymentMethods();
  }, []);
  const handlePaymentChange = (id) => {
    sPayment.set((pre) => {
      pre.value.paymentMethod = id;
    });
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold">Các hình thức thanh toán</h3>
      <div className="space-y-4 mt-4">
        {paymentList.map((method) => (
          <div
            key={method.id}
            className={`border rounded-lg p-4 flex items-start space-x-4 ${
              payment === method.id ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => handlePaymentChange(method.id)}
          >
            <input
              type="radio"
              id={method.id}
              name="payment"
              checked={payment === method.id}
              onChange={() => handlePaymentChange(method.id)}
              className="mt-1"
            />
            <div>
              <label
                htmlFor={method.id}
                className="font-semibold text-gray-700"
              >
                {method.label}
              </label>
              {method.details && payment === method.id && (
                <div className="mt-2 text-gray-600">{method.details}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
