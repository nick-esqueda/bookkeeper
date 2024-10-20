import { customFetch } from "../../utils/apiUtils";

export const fetchStats = async () => {
  return await customFetch(`/stats`);
};
