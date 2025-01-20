// paymentData.js
import { signify } from "react-signify";

export const sPayment = signify({
  info: {
    name: "",
    email: "",
    phone: "",
    dob: "",
  },
  date: null,
  passengers: [], // Danh sách hành khách
  price: 0,
  note: "",
  paymentMethod: "",
});
