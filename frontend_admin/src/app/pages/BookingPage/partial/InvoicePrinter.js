// src/utils/InvoicePrinter.js

export const handleExport = (Booking) => {
  const billContent = `
      <div style="width: 100%; padding: 20px; font-family: Arial, sans-serif; border: 1px solid #ddd;">
        <h1 style="text-align: center;">HÓA ĐƠN </h1>
        
        <div style="margin-bottom: 20px;">
          <h3>Thông tin khách hàng:</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 20px;">
            <div style="flex: 1 1 45%;">
              <p><strong>Họ tên:</strong> ${Booking.customer.user_name}</p>
              <p><strong>Số điện thoại:</strong> ${
                Booking.customer.phone_number
              }</p>
            </div>
            <div style="flex: 1 1 45%;">
              <p><strong>Email:</strong> ${Booking.customer.email}</p>
              <p><strong>Ngày sinh:</strong> ${new Date(
                Booking.customer.date_of_birth
              ).toLocaleDateString("vi-VN")}</p>
            </div>
          </div>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3>Thông tin tour:</h3>
          <p><strong>Tour:</strong> ${Booking.tour_name}</p>
          <p><strong>Ngày đi:</strong> ${new Date(
            Booking.schedule_date
          ).toLocaleDateString("vi-VN")}</p>
          <p><strong>Số lượng vé:</strong> ${Booking.number_slots}</p>
        </div>
  
        <div style="margin-bottom: 20px;">
          <h3>Thông tin hành khách:</h3>
          ${Booking.passengers
            .map(
              (passenger, index) => `
              <div style="margin-bottom: 20px;">
                <p><strong>Khách ${index + 1}:</strong></p>
                <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                  <div style="flex: 1 1 45%;">
                    <p><strong>Loại khách:</strong> ${
                      passenger.passenger_type === "ADULT"
                        ? "Người lớn"
                        : passenger.passenger_type === "CHILD"
                        ? "Trẻ em"
                        : "Em bé"
                    }</p>
                  </div>
                  <div style="flex: 1 1 45%;">
                    <p><strong>Họ tên:</strong> ${passenger.passenger_name}</p>
                  </div>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                  <div style="flex: 1 1 45%;">
                    <p><strong>Ngày sinh:</strong> ${new Date(
                      passenger.passenger_date
                    ).toLocaleDateString("vi-VN")}</p>
                  </div>
                  <div style="flex: 1 1 45%;">
                    <p><strong>Giá vé:</strong> ${
                      passenger.passenger_type === "ADULT"
                        ? `${parseFloat(
                            Booking.adult_price.$numberDecimal
                          ).toLocaleString()} VND`
                        : passenger.passenger_type === "CHILD"
                        ? `${parseFloat(
                            Booking.children_price.$numberDecimal
                          ).toLocaleString()} VND`
                        : `${parseFloat(
                            Booking.infant_price.$numberDecimal
                          ).toLocaleString()} VND`
                    }</p>
                  </div>
                </div>
              </div>
            `
            )
            .join("")}
        </div>
  
        <div style="margin-bottom: 20px;">
          <h3>Thông tin đơn hàng:</h3>
          <p><strong>Tổng cộng:</strong> ${parseFloat(
            Booking.total_price.$numberDecimal
          ).toLocaleString()} VND</p>
        </div>
  
        <div style="text-align: center; margin-top: 30px;">
          <p><strong>Cảm ơn bạn đã đặt tour tại chúng tôi!</strong></p>
        </div>
      </div>
    `;

  // Tạo một cửa sổ mới và chèn nội dung hóa đơn vào
  const printWindow = window.open("", "_blank", "width=800,height=600");
  printWindow.document.write(billContent);
  printWindow.document.close(); // Đóng tài liệu để có thể in
  printWindow.print(); // Mở cửa sổ in
};
