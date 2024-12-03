import React from "react";

const PaymentMethods = ({ selectedPayment, setSelectedPayment }) => {
  const paymentMethods = [
    { id: "cash", label: "Tiền mặt" },
    {
      id: "bank",
      label: "Chuyển khoản",
      details: (
        <>
          <p>
            Quý khách sau khi thực hiện việc chuyển khoản vui lòng gửi email đến{" "}
            <a href="mailto:tructuyen@vietravel.com" className="text-blue-500">
              tructuyen@vietravel.com
            </a>{" "}
            hoặc gọi tổng đài <strong>19001839</strong> để được xác nhận từ công
            ty chúng tôi.
          </p>
          <p className="mt-2">
            <strong>Tên Tài Khoản:</strong> Công ty CP Du lịch và Tiếp thị GTVT
            Việt Nam - Vietravel
          </p>
          <p>
            <strong>Số Tài Khoản:</strong> 190261 6659 4669
          </p>
          <p>
            <strong>Ngân hàng:</strong> Techcombank - Chi nhánh Tp.HCM
          </p>
        </>
      ),
    },
    { id: "zalopay", label: "Thanh toán bằng ZaloPay" },
    { id: "credit", label: "Thẻ tín dụng" },
  ];

  const handlePaymentChange = (id) => {
    setSelectedPayment(id);
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold">Các hình thức thanh toán</h3>
      <div className="space-y-4 mt-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`border rounded-lg p-4 flex items-start space-x-4 ${
              selectedPayment === method.id
                ? "border-blue-500"
                : "border-gray-300"
            }`}
            onClick={() => handlePaymentChange(method.id)}
          >
            <input
              type="radio"
              id={method.id}
              name="payment"
              checked={selectedPayment === method.id}
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
              {method.details && selectedPayment === method.id && (
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
