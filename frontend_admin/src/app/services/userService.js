import { userData } from "../../mocks/UserData.js";

export const getUsers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(userData), 500);
  });
};
