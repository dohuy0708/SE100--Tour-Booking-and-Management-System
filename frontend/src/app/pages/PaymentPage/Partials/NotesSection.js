import React, { useRef } from "react";

const NotesSection = () => {
  const ref = useRef();
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold">Ghi chú</h3>
      <textarea
        placeholder="Vui lòng nhập nội dung lời nhắn bằng tiếng Việt hoặc tiếng Anh"
        className="w-full mt-2 border rounded-lg p-4"
        rows="4"
      ></textarea>
    </div>
  );
};

export default NotesSection;
