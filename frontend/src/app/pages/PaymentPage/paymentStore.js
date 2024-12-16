// paymentData.js
import { signify } from "react-signify";

export const sPayment = signify({
  info: {
    name: "",
    email: "",
    phone: "",
    address: "",
  },
  passengers: [], // Danh sách hành khách
  note: "",
  paymentMethod: "",
});
