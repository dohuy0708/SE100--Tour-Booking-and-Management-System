export const tourData = [
  {
    tourId: 1,
    tourName: "Quy Nhơn - Kỳ Co - Eo Gió - Phú Yên",
    duration: 3,
    tourType: "Domestic",
    description: "Explore the beauty of Quy Nhơn and Phú Yên.",
    policyId: 1,
    tourPrice: {
      adult: 2500000,
      child: 1250000,
      infant: 600000,
    },
    schedules: [
      {
        scheduleId: 1,
        departureDate: "2024-10-10",
        departureTime: "08:00:00",
        capacity: 30,
        booked: 20,
        status: "Open",
      },
      {
        scheduleId: 3,
        departureDate: "2024-10-20",
        departureTime: "07:30:00",
        capacity: 20,
        booked: 8,
        status: "Open",
      },
    ],
  },
  {
    tourId: 2,
    tourName: "Hà Nội - Hạ Long - Sa Pa",
    duration: 5,
    tourType: "Domestic",
    description: "Experience the scenic landscapes of northern Vietnam.",
    policyId: 2,
    tourPrice: {
      adult: 2500000,
      child: 1250000,
      infant: 600000,
    },
    schedules: [
      {
        scheduleId: 2,
        departureDate: "2024-10-15",
        departureTime: "09:00:00",
        capacity: 25,
        booked: 20,
        status: "Closed",
      },
      {
        scheduleId: 4,
        departureDate: "2024-10-20",
        departureTime: "09:00:00",
        capacity: 25,
        booked: 20,
        status: "Closed",
      },
    ],
  },
];

export const getTourSchedule = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(tourData), 500);
  });
};
