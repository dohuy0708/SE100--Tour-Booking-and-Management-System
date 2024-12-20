// src/services/authService.js
export const login = async (userName, password) => {
  try {
    // Giả lập gọi API - thay thế đường dẫn bằng API thật
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Đăng nhập thất bại!");
    }

    const data = await response.json();
    return data; // Trả về dữ liệu sau khi đăng nhập thành công
  } catch (error) {
    console.error("Lỗi trong quá trình đăng nhập:", error.message);
    throw error; // Ném lỗi để component xử lý
  }
};
export const mockLogin = async (userName, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userName === "admin@gmail.com" && password === "123456") {
        resolve({ id: 1, userName: userName, token: "fake-jwt-token" });
      } else {
        reject(new Error("Tên đăng nhập hoặc mật khẩu không đúng!"));
      }
    }, 1000);
  });
};
