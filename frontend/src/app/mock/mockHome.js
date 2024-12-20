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
    title: "Hà Nội - Hạ Long - Yên Tử - Ninh Bình",
    startTime: "08:00 12/12/2024",
    duration: "3N2Đ",
    price: "6.000.000",
    seatsLeft: 3,
    image: "/tour1.png",
  },
  {
    id: 3,
    title: "Hà Nội - Hạ Long - Yên Tử - Ninh Bình",
    startTime: "08:00 12/12/2024",
    duration: "3N2Đ",
    price: "6.000.000",
    seatsLeft: 3,
    image: "/tour1.png",
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
  title: "Hà Nội - Hạ Long - Yên Tử - Ninh Bình",
  img: "/img2.png",
  duration: "3 ngày 2 đêm",
  startPoint: "Bến xe miền Đông, HCM",
  transport: "Xe khách",
  days: [
    {
      date: "2024-12-01",
      seats: 65,
      tickets: [
        { type: "Người lớn", price: "900,000" },
        { type: "Trẻ em", price: "700,000" },
        { type: "Ưu đãi", price: "500,000" },
      ],
    },
    {
      date: "2024-12-05",
      seats: 53,
      tickets: [
        { type: "Người lớn", price: "950,000" },
        { type: "Trẻ em", price: "750,000" },
        { type: "Ưu đãi", price: "550,000" },
      ],
    },
    {
      date: "2024-12-10",
      seats: 43,
      tickets: [
        { type: "Người lớn", price: "1,000,000" },
        { type: "Trẻ em", price: "800,000" },
        { type: "Ưu đãi", price: "600,000" },
      ],
    },
  ],
  scheduleData: [
    {
      description:
        "Ngày đầu tiên, chúng ta sẽ ... tham quan các điểm nổi tiếng.",
      image: "/img2.png",
    },
    {
      description: "Ngày thứ hai, đoàn tham quan ... các danh lam thắng cảnh.",
      image: "img3.png",
    },
    {
      description: "Ngày cuối, du khách tự do khám phá ... và mua sắm.",
      image: "tour1.png",
    },
  ],
};
const paymentMethods = [
  {
    id: "cash",
    label: "Tiền mặt",
    details: (
      <p>
        Quý khách có thể thanh toán trực tiếp bằng tiền mặt tại quầy giao dịch
        của công ty chúng tôi.
      </p>
    ),
  },
  {
    id: "bank",
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
    id: "zalopay",
    label: "Thanh toán bằng ZaloPay",
    details: (
      <p>
        Quý khách có thể thanh toán qua ví điện tử ZaloPay bằng cách quét mã QR
        hoặc thực hiện giao dịch trên ứng dụng ZaloPay.
      </p>
    ),
  },
  {
    id: "credit",
    label: "Thẻ tín dụng",
    details: (
      <p>
        Chúng tôi chấp nhận các loại thẻ tín dụng phổ biến như Visa, Mastercard.
        Vui lòng đảm bảo thẻ của bạn có đủ hạn mức trước khi thanh toán.
      </p>
    ),
  },
];

export { toursData, bannerTours, tourInfo, paymentMethods };
