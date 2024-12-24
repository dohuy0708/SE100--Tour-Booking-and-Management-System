const customersData = [
  {
    id: 1,
    name: "Nguyen Van A",
    email: "dohuy22@gmail.com",
    phone: "012313123",
    birthday: "12-10-2002",
    listTour: [
      {
        bookingId: 1,
        schedule: {
          scheduleId: 1,
          departureDate: "2024-10-10",
          tour: {
            tourId: 1,
            tourName: "Quy Nhơn - Kỳ Co - Eo Gió - Phú Yên",
          },
        },
        bookingDate: "2024-09-30",
        totalPrice: 9470000,
      },
      {
        bookingId: 2,
        schedule: {
          scheduleId: 2,
          departureDate: "2024-11-01",
          tour: {
            tourId: 2,
            tourName: "Nha Trang - Vinpearl Land - Bai Dai Beach",
          },
        },
        bookingDate: "2024-10-01",
        totalPrice: 9997000,
      },
    ],
  },
  {
    id: 2,
    name: "Le Thi B",
    email: "lethib@example.com",
    phone: "0987654321",
    birthday: "15-05-1995",
    listTour: [
      {
        bookingId: 3,
        schedule: {
          scheduleId: 3,
          departureDate: "2024-12-05",
          tour: {
            tourId: 3,
            tourName: "Hạ Long Bay - Dragon Bay",
          },
        },
        bookingDate: "2024-11-10",
        totalPrice: 7890000,
      },
    ],
  },
  {
    id: 3,
    name: "Tran Thi C",
    email: "tranthi@example.com",
    phone: "0912345678",
    birthday: "20-03-1990",
    listTour: [
      {
        bookingId: 4,
        schedule: {
          scheduleId: 4,
          departureDate: "2024-12-12",
          tour: {
            tourId: 4,
            tourName: "Sapa - Fansipan",
          },
        },
        bookingDate: "2024-11-15",
        totalPrice: 8600000,
      },
      {
        bookingId: 5,
        schedule: {
          scheduleId: 5,
          departureDate: "2025-01-10",
          tour: {
            tourId: 5,
            tourName: "Ha Giang - Dong Van Plateau",
          },
        },
        bookingDate: "2024-12-01",
        totalPrice: 7100000,
      },
    ],
  },
  {
    id: 4,
    name: "Pham Minh D",
    email: "minhd@example.com",
    phone: "0934123456",
    birthday: "10-08-1987",
    listTour: [
      {
        bookingId: 6,
        schedule: {
          scheduleId: 6,
          departureDate: "2025-02-01",
          tour: {
            tourId: 6,
            tourName: "Da Nang - Ba Na Hills - My Khe Beach",
          },
        },
        bookingDate: "2024-12-15",
        totalPrice: 10800000,
      },
    ],
  },
];

export const getCustomerData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(customersData), 500);
  });
};
