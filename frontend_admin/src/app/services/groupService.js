import { groupData } from "../../mocks/GroupData.js";

export const getGroups = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(groupData), 500); // Mô phỏng thời gian tải
  });
};
