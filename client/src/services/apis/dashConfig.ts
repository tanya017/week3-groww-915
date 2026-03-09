import { BASE_URL, getHeaders } from "@/shared/utils/api";
import axios from "axios";

const dashConfig = async (accessToken: string) => {
  if (!accessToken) return;

  try {
    const response = await axios.get(
      `${BASE_URL}/v1/api/profile/dashboard-config`,
      { headers: getHeaders(accessToken) },
    );

    console.log("Features fetched", response.data.dashboard.features);
    return response.data.dashboard.features;

  } catch (error) {
    console.error("Error fetching features:", error);
  }
};

export default dashConfig;
