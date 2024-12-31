export const mockLogin = async (userName, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userName === 'admin@gmail.com' && password === "123456") {
                resolve({ id: 1, userName: userName, token: "fake-jwt-token"});
            } else {
                reject(new Error("Tên đăng nhập hoặc mật khẩu không đúng!"));
            }
        }, 1000);
    });
};