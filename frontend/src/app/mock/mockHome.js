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
export { toursData, bannerTours, tourInfo };
