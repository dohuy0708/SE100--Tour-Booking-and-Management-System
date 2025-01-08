import React, { useEffect, useState } from "react";
import { useFilterContext } from "../../../context/FilterContext";
import Swal from "sweetalert2";

export default function ViewTourModal({ onClose, tour, reData }) {
  const { locations } = useFilterContext(); // Lấy dữ liệu từ context
  const [tourData, setTourData] = useState({
    tourId: tour.tour_code,
    tourName: tour.tour_name,
    tourType: tour.tour_type,
    description: tour.description,
    duration: tour.duration,
    image: `http://localhost:8080${tour.cover_image}`,
  });
  const [isEdit, setIsEdit] = useState(false);
  // useEffect(() => {
  //   if (tour) setTourData(tour);
  // }, [tour]);
  const [Choose_locations, setLocations] = useState(
    tour.tourLocations?.map((loc) => loc.location_name) || [] // Lấy location_name từ mỗi item
  );

  const [numDays, setNumDays] = useState(tour.tourPrograms?.length);
  const [policy, setPolicy] = useState(""); // To store the policy content
  const [days, setDays] = useState(
    tour.tourPrograms?.map((pro) => ({
      image: `http://localhost:8080${pro?.image}`,
      // Ban đầu không có ảnh, sẽ thêm sau qua input
      imageDesc: pro?.imageDesc || "", // Lấy mô tả ảnh từ dữ liệu
      dayDesc: pro.program_description || "", // Lấy mô tả ngày từ dữ liệu
    })) || []
  );
  const [prices, setPrices] = useState({
    adultPrice: `${parseFloat(tour.tourPrice.adult_price.$numberDecimal)}`,
    childPrice: `${parseFloat(tour.tourPrice.children_price.$numberDecimal)}`,
    infantPrice: `${parseFloat(tour.tourPrice.infant_price.$numberDecimal)}`,
  });
  const handleNumDaysChange = (e) => {
    const value = parseInt(e.target.value, 10); // Get the new number of days
    setNumDays(value); // Update the numDays state

    const newDays = [...days]; // Copy the current days array

    if (value > days.length) {
      // If the new number of days is greater, add empty day objects
      while (newDays.length < value) {
        newDays.push({ image: null, imageDesc: "", dayDesc: "" });
      }
    } else {
      // If the new number of days is smaller, remove extra days
      newDays.length = value;
    }

    setDays(newDays); // Update the days state with the new array
  };
  const handleProgramInputChange = (index, field, value) => {
    const newDays = [...days]; // Copy the current days array
    newDays[index][field] = value; // Update the specific field for the given day
    setDays(newDays); // Update the days state with the new array
  };
  const handlePriceChange = (type, value) => {
    setPrices((prev) => ({
      ...prev,
      [type]: value,
    }));
  };
  const handleAddLocation = () => {
    setLocations([...Choose_locations, ""]); // Thêm một địa điểm mới với giá trị rỗng
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };
  const handleLocationChange = (index, value) => {
    const updatedLocations = [...Choose_locations];
    updatedLocations[index] = value;
    setLocations(updatedLocations);
  };
  const handleRemoveLocation = (index) => {
    const updatedLocations = Choose_locations.filter((_, i) => i !== index);
    setLocations(updatedLocations);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setTourData({ ...tourData, image: file });
  };

  // Đảm bảo là nếu tourData.image là một file thì dùng URL.createObjectURL
  const imageUrl = tourData.image
    ? tourData.image instanceof Blob // Nếu image là file hoặc blob
      ? URL.createObjectURL(tourData.image)
      : tourData.image // Nếu image là URL
    : null;

  const validateForm = () => {
    let errors = [];

    // Check if all required fields are filled
    const isTourDataValid = tourData.description;
    if (!isTourDataValid) errors.push("Mô tả tour");

    const isPricesValid =
      prices.adultPrice && prices.childPrice && prices.infantPrice;
    if (!isPricesValid) errors.push("Giá vé (Người lớn, Trẻ em, Em bé)");

    const isLocationsValid =
      Choose_locations.length > 0 &&
      Choose_locations.every((location) => location);
    if (!isLocationsValid) errors.push("Vị trí lựa chọn");

    const isDaysValid = days.every((day) => day.image && day.dayDesc);
    if (!isDaysValid) errors.push("Thông tin ngày (Ảnh và mô tả ngày)");

    if (errors.length > 0) {
      console.log("Trường hợp thiếu:", errors.join(", "));
    }

    return isTourDataValid && isPricesValid && isLocationsValid && isDaysValid;
  };
  const handleEdit = async () => {
    if (
      tour.tourSchedules.filter(
        (schedule) =>
          schedule.status === "CHỜ DIỄN RA" || schedule.status === "ĐANG BÁN"
      ).length > 0
    ) {
      Swal.fire({
        icon: "info",
        title: "Không thể chỉnh sửa tour",
        text: "Có lịch trình đang sử dụng tour này",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
    } else {
      console.log("cover image", tourData.image);
      days.forEach((day, index) => {
        console.log("Day", index, "image", day.image);
      });
      if (!validateForm()) {
        Swal.fire({
          icon: "info",
          title: "Vui lòng điền đầy đủ thông tin!",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
      } else {
        const formData = new FormData();
        // Thêm cover image

        // if (tourData.image) {
        //   formData.append("cover_image", tourData.image);
        // }
        formData.append("descri", tourData.description);
        formData.append("a_price", prices.adultPrice);
        formData.append("c_price", prices.childPrice);
        formData.append("i_price", prices.infantPrice);
        // Thêm program_images và pro_descris
        days.forEach((day, index) => {
          if (day.image) {
            formData.append(`program_images[${index}]`, day.image);
          }
          formData.append(`pro_descris[${index}]`, day.dayDesc || "");
        });
        console.log("lò ra con");
        try {
          const response = await fetch(
            `http://localhost:8080/tours/${tour._id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: formData,
            }
          );

          if (response.ok) {
            Swal.fire({
              icon: "success",
              title: "Cập nhật tour thành công",
              confirmButtonText: "OK",
              confirmButtonColor: "#3085d6",
            }).then(() => onClose());
          }
        } catch (error) {
          console.error("Error submitting tour:", error);

          Swal.fire({
            icon: "error",
            title: "Cập nhật không thành công",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
          });
        }
      }
    }
  };
  const handleDelete = async () => {
    if (tour.tourSchedules.length > 0) {
      Swal.fire({
        icon: "info",
        title: "Không thể xóa tour",
        text: "Có lịch trình đang sử dụng tour này",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
    } else {
      console.log("xóa tour");
      // gọi api xóa tour
      Swal.fire({
        icon: "info",
        title: "Bạn có chắc chắn muốn xóa tour này không!",
        showCancelButton: true, // Hiển thị nút Cancel
        cancelButtonText: "Cancel", // Text cho nút Cancel
        confirmButtonText: "OK", // Text cho nút OK
        confirmButtonColor: "#3085d6", // Màu cho nút OK
        cancelButtonColor: "#d33", // Màu cho nút Cancel
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Người dùng nhấn OK
          try {
            const response = await fetch(
              `http://localhost:8080/tours/${tour._id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
              }
            );

            if (response.ok) {
              Swal.fire({
                icon: "success",
                title: "Xóa tour  thành công",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6",
              }).then(() => reData());
            }
          } catch (error) {
            console.error("Error submitting tour:", error);

            Swal.fire({
              icon: "error",
              title: "Xóa tour không thành công",

              confirmButtonText: "OK",
              confirmButtonColor: "#3085d6",
            });
          } finally {
            onClose(); // Đóng modal nếu cần
          }
        }
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center pt-8 place-items-start z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 p-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b mb-4">
          <h1 className="text-2xl font-semibold">THÔNG TIN TOUR</h1>
          <button
            onClick={() => onClose()}
            className="text-gray-400 hover:text-gray-600 flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          className="overflow-auto flex-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Tour Info */}
          <div className="mb-4">
            <h4 className="text-xl text-blue-500 font-semibold mb-2">
              Thông tin tour
            </h4>
            <div className="flex border border-gray-300 rounded-lg p-2 bg-slate-50 gap-4">
              {/* Content */}
              <div className="overflow-auto flex-1">
                <div className="grid grid-cols-7 gap-4 mb-4">
                  {/* Image Upload */}
                  <div className="col-span-2">
                    <h4 className="font-semibold mb-2">Ảnh:</h4>
                    <div className="border border-gray-300 rounded-lg p-2 bg-slate-50">
                      {tourData.image ? (
                        <div className="relative">
                          <img
                            id="coverImageInput" // Gán ID duy nhất
                            src={imageUrl}
                            // src={URL.createObjectURL(tourData.image)}
                            // src={`http://localhost:8080${tourData.image}`}
                            alt="Tour Preview"
                            className="w-full h-40 object-cover rounded"
                          />
                          <button
                            onClick={() =>
                              setTourData({ ...tourData, image: null })
                            }
                            className="absolute top-2 right-2  bg-gray-500 text-white p-1 rounded-full hover:bg-red-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center">Chưa có ảnh</p>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mt-2 w-full text-sm"
                      />
                    </div>
                  </div>

                  {/* Tour Information */}
                  <div className="col-span-5">
                    <div className="flex flex-col gap-4">
                      {/* Row 1: Mã tour, Loại tour, Thời gian */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block font-medium">Mã tour:</label>
                          <input
                            type="text"
                            disabled
                            name="tourId"
                            placeholder="MT001"
                            value={tourData.tourId}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="block font-medium">
                            Thời gian:
                          </label>
                          <input
                            type="text"
                            disabled
                            name="duration"
                            placeholder="3N2Đ"
                            value={tourData.duration}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block font-medium">
                            Loại tour:
                          </label>
                          <input
                            disabled
                            name="tourType"
                            value={tourData.tourType}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                          ></input>
                        </div>
                      </div>

                      {/* Row 2: Tên tour */}
                      <div>
                        <label className="block font-medium">Tên tour:</label>
                        <input
                          type="text"
                          name="tourName"
                          disabled
                          value={tourData.tourName}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      {/* Description */}
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Mô tả:</h4>
                        <textarea
                          name="description"
                          value={tourData.description}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full p-2 border rounded"
                          placeholder="Nhập mô tả..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Địa điểm và Giá */}
          <div className="grid grid-cols-2 gap-4 rounded-lg">
            {/* Địa điểm */}
            <div className="mb-4">
              <h4 className="font-semibold text-xl text-blue-500 mb-2">
                Thông tin địa điểm
              </h4>
              <div className="flex flex-col border border-gray-300 rounded-lg p-4 bg-slate-50 gap-4 overflow-y-auto max-h-48">
                {" "}
                {/* Set max height with scroll */}
                {/* Danh sách địa điểm */}
                {Choose_locations.map((location, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <select
                      value={location}
                      disabled
                      onChange={(e) =>
                        handleLocationChange(index, e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Chọn địa điểm</option>
                      {locations.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.location_name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
                {/* Nút thêm địa điểm */}
                {/* <button
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                  onClick={handleAddLocation}
                >
                  Thêm địa điểm
                </button> */}
              </div>
            </div>

            {/* Giá vé */}
            <div className="mb-4">
              <h4 className="font-semibold text-blue-500 text-xl mb-2">
                Thông tin giá tour
              </h4>
              <div className="border border-gray-300 rounded-lg p-2 bg-slate-50">
                <div className="flex flex-col gap-6">
                  {" "}
                  {/* Increased gap between price sections */}
                  <div className="flex items-center gap-4">
                    <label className="w-20  font-medium">Người lớn:</label>
                    <div className="flex items-center gap-2 w-2/3">
                      <input
                        type="number"
                        name="adultPrice"
                        value={prices.adultPrice}
                        onChange={(e) =>
                          handlePriceChange("adultPrice", e.target.value)
                        }
                        className="flex-1 p-2 border rounded"
                        placeholder="Nhập giá"
                        min="0"
                      />
                      <span className="text-yellow-500 font-medium">VND</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-20  font-medium">Trẻ em:</label>
                    <div className="flex items-center gap-2 w-2/3">
                      <input
                        type="number"
                        name="childPrice"
                        value={prices.childPrice}
                        onChange={(e) =>
                          handlePriceChange("childPrice", e.target.value)
                        }
                        className="flex-1 p-2 border rounded"
                        placeholder="Nhập giá"
                        min="0"
                      />
                      <span className="text-yellow-500 font-medium">VND</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-20 font-medium">Em bé:</label>
                    <div className="flex items-center gap-2 w-2/3">
                      <input
                        type="number"
                        name="infantPrice"
                        value={prices.infantPrice}
                        onChange={(e) =>
                          handlePriceChange("infantPrice", e.target.value)
                        }
                        className="flex-1 p-2 border rounded"
                        placeholder="Nhập giá"
                        min="0"
                      />
                      <span className="text-yellow-500 font-medium">VND</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chương trình tour */}
          <div className="mb-4">
            <h4 className="font-semibold text-blue-500 text-xl">
              Chương trình tour
            </h4>
            <div className="border border-gray-300 rounded-lg p-2    bg-slate-50">
              {/* Input for number of days */}
              <div className="mb-4 flex gap-4 items-center">
                <label className="block font-medium text-lg items-center ">
                  Số lượng ngày:
                </label>
                <input
                  type="String"
                  disabled
                  value={numDays}
                  onChange={handleNumDaysChange}
                  className="p-2 border rounded  "
                  min="1"
                />
              </div>

              {/* Day descriptions */}
              {days.map((day, index) => (
                <div className="border border-gray-300 rounded-lg p-2 mb-4 bg-slate-50">
                  <div key={index} className="mb-4  gap-4">
                    <h5 className="font-semibold">Ngày {index + 1}</h5>
                    <div className="flex flex-row  gap-4">
                      <div className="flex flex-col  w-1/2">
                        {/* Image and image description */}
                        <label className="font-medium">Ảnh:</label>
                        <div className="border border-gray-300 rounded-lg p-2 bg-slate-50">
                          {day.image ? (
                            <div className="relative">
                              <img
                                id={`dayImageInput-${index}`} // ID duy nhất cho từng ngày
                                src={day.image}
                                alt={`Ảnh ngày ${index + 1}`}
                                className="w-full h-40 object-cover rounded"
                              />
                              <button
                                onClick={() =>
                                  handleProgramInputChange(index, "image", null)
                                } // Remove the image
                                className="absolute top-2 right-2 bg-gray-500 text-white p-1 rounded-full hover:bg-red-600"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <p className="text-gray-500 text-center">
                              Chưa có ảnh
                            </p>
                          )}
                          <input
                            type="file"
                            accept="image/*" // Only allow images
                            onChange={(e) =>
                              handleProgramInputChange(
                                index,
                                "image",
                                URL.createObjectURL(e.target.files[0])
                              )
                            } // Update state with selected image
                            className="mt-2 w-full text-sm"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col w-5/6 ">
                        {/* Day description */}
                        <label className="font-medium">
                          Chương trình ngày {index + 1}:
                        </label>
                        <textarea
                          value={day.dayDesc}
                          onChange={(e) =>
                            handleProgramInputChange(
                              index,
                              "dayDesc",
                              e.target.value
                            )
                          }
                          placeholder="Mô tả ngày"
                          rows={5}
                          className="p-2 border rounded h-72 "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="mt-6 flex justify-between items-center">
          {/* Nút Xóa Tour ở bên trái */}
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-500 text-white rounded-md"
          >
            Xóa Tour
          </button>

          {/* Hai nút còn lại ở bên phải */}
          <div className="flex space-x-4">
            <button
              onClick={() => onClose()}
              className="px-6 py-2 bg-gray-500 text-white rounded-md"
            >
              Thoát
            </button>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleEdit}
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
