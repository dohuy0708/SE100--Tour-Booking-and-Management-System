import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-main text-white py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Logo và giới thiệu */}
        <div>
          <img src="logo.png" alt="Kaze Travel Logo" className="h-16 mb-4" />
          <p className="text-sm">
            Kaze Travel - Nơi khởi đầu hành trình của bạn. Chúng tôi cam kết
            mang đến những chuyến đi thú vị, tiện lợi và đáng nhớ.
          </p>
        </div>

        {/* Menu nhanh */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Menu nhanh</h4>
          <ul className="text-sm space-y-2">
            <li>
              <Link to="/search?type=domestic" className="hover:underline">
                Tour trong nước
              </Link>
            </li>
            <li>
              <Link to="/search?type=abroad" className="hover:underline">
                Tour nước ngoài
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        {/* Thông tin liên hệ */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
          <ul className="text-sm space-y-2">
            <li>Email: contact@kazetravel.com</li>
            <li>Hotline: 1900 123 456</li>
            <li>Địa chỉ: 123 Đường Lữ Hành, Quận 1, TP. Hồ Chí Minh</li>
          </ul>
        </div>

        {/* Mạng xã hội */}
      </div>

      {/* Footer bottom */}
      <div className="mt-8 border-t border-gray-500 pt-4 text-center text-sm">
        © 2025 Kaze Travel. All rights reserved.
      </div>
    </footer>
  );
}
