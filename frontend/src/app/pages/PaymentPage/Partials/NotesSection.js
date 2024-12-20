import React from "react";
import { sPayment } from "../paymentStore";
const NotesSection = () => {
  const info = sPayment.slice((n) => n.note).use();

  const handleOnChangeInput = (event) => {
    const val = event.target.value;
    sPayment.set((pre) => {
      pre.value.note = val;
    });
    console.log(sPayment.value);
  };
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold">Ghi chú</h3>
      <textarea
        placeholder="Vui lòng nhập nội dung lời nhắn bằng tiếng Việt hoặc tiếng Anh"
        className="w-full mt-2 border rounded-lg p-4"
        rows="4"
        value={info}
        onChange={handleOnChangeInput}
      ></textarea>
    </div>
  );
};

export default NotesSection;
