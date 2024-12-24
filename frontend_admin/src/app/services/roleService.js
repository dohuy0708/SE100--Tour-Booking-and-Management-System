import { roleData } from "../../mocks/RoleData.js";

export const getRoles = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(roleData), 500); // Mô phỏng thời gian tải
  });
};
