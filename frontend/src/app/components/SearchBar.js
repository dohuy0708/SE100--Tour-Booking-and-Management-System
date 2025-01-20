import React, { useState } from "react";
const SearchBar = ({ onSearchChange, initialValue = "" }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    const keyword = e.target.value;
    setValue(keyword);
    onSearchChange(keyword);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Bạn tìm gì hôm nay?"
        className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-main"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
