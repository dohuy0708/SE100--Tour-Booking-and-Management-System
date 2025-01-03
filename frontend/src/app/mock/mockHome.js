const toursData = [
  {
    id: 1,
    title: "Hà Nội - Hạ Long - Yên Tử - Ninh Bình ",
    startTime: "08:00 12/12/2024",
    duration: "3N2Đ",
    price: "6.000.000",
    seatsLeft: 3,
    image: "/tour1.png",
  },
  {
    id: 2,
    title: "Đà Nẵng - Hội An - Bà Nà Hills",
    startTime: "07:30 15/12/2024",
    duration: "4N3Đ",
    price: "7.500.000",
    seatsLeft: 5,
    image: "/img2.png",
  },
  {
    id: 3,
    title: "Phú Quốc - Vinpearl Safari - Nam Đảo",
    startTime: "09:00 20/12/2024",
    duration: "5N4Đ",
    price: "10.000.000",
    seatsLeft: 2,
    image: "/img3.png",
  },
];
const bannerTours = [
  {
    id: 1,
    place: "Đà Nẵng",
    title: "ĐÓN TẾT DƯƠNG LỊCH 2025",
    image: "/img1.png",
  },
  {
    id: 2,
    place: "Hạ Long",
    title: "Du xuân trên Vịnh 2025",
    image: "/img2.png",
  },
  {
    id: 3,
    place: "Hội An",
    title: "Phố cổ đón xuân 2025",
    image: "/img3.png",
  },
];
const tourInfo = {
  id: 1,
  title: "Hà Nội - Hạ Long - Yên Tử - Ninh Bình",
  img: "/img2.png",
  duration: "3 ngày 2 đêm",
  startPoint: "Bến xe miền Đông, HCM",
  days: [
    {
      id: 1,
      date: "01/01/2025",
      end_date: "04/01/2025",
      capacity: 100,
      available_slots: 65,
      tickets: [
        { type: "Người lớn", price: 900000 },
        { type: "Trẻ em", price: 700000 },
        { type: "Em bé", price: 500000 },
      ],
    },
    {
      id: 2,
      date: "01/01/2025",
      end_date: "04/01/2025",
      capacity: 100,
      available_slots: 76,
      tickets: [
        { type: "Người lớn", price: 950000 },
        { type: "Trẻ em", price: 750000 },
        { type: "Em bé", price: 550000 },
      ],
    },
    {
      id: 3,
      date: "01/01/2025",
      end_date: "04/01/2025",
      capacity: 100,
      available_slots: 23,
      tickets: [
        { type: "Người lớn", price: 1000000 },
        { type: "Trẻ em", price: 800000 },
        { type: "Em bé", price: 600000 },
      ],
    },
  ],
  scheduleData: [
    {
      id: 1,
      description:
        "Ngày đầu tiên, chúng ta sẽ ... tham quan các điểm nổi tiếng.",
      image: "/img2.png",
    },
    {
      id: 2,
      description: "Ngày thứ hai, đoàn tham quan ... các danh lam thắng cảnh.",
      image: "img3.png",
    },
    {
      id: 3,
      description: "Ngày cuối, du khách tự do khám phá ... và mua sắm.",
      image: "tour1.png",
    },
  ],
};
const paymentMethods = [
  {
    id: "CASH",
    label: "Tiền mặt",
    details: (
      <p>
        Quý khách có thể thanh toán trực tiếp bằng tiền mặt tại quầy giao dịch
        của công ty chúng tôi.
      </p>
    ),
  },
  {
    id: "BANK_TRANSFER",
    label: "Chuyển khoản",
    details: (
      <>
        <p>
          Quý khách sau khi thực hiện việc chuyển khoản vui lòng gửi email đến{" "}
          <a href="mailto:22520538@gm.uit.edu.vn" className="text-blue-500">
            22520538@gm.uit.edu.vn
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
  {
    id: "CREDIT_CARD",
    label: "Thẻ tín dụng",
    details: (
      <p>
        Chúng tôi chấp nhận các loại thẻ tín dụng phổ biến như Visa, Mastercard.
        Vui lòng đảm bảo thẻ của bạn có đủ hạn mức trước khi thanh toán.
      </p>
    ),
  },
];
const userInfo = {
  id: 1,
  email: "22520462@gm.uit.edu.vn",
  name: "Lê Huy Hoàng",
  phone: "0916097570",
  dob: "18/07/2004",
};
export { toursData, bannerTours, tourInfo, paymentMethods, userInfo };
