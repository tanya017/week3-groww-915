import { BASE_URL, getHeaders } from "@/shared/utils/api";
import axios from "axios";

// export const useGetFeatures = () => {
//   const setFeatures = useUIStore((s) => s.setFeatures);
//   const accessToken = useUIStore((s) => s.accessToken);

//   const fetchFeatures = async () => {
//     if (!accessToken) return;

//     try {
//       const response = await fetch(`${BASE_URL}/v1/api/profile/dashboard-config`, {
//         method: "GET",
//         headers: getHeaders(accessToken),
//       });

//       if (!response.ok) throw new Error("Failed to fetch features");

//       const data = await response.json();
//       setFeatures(data.dashboard.features);
//       console.log('Features fetched', data.dashboard.features);
//     } catch (error) {
//       console.error("Error fetching features:", error);
//     }
//   };

//   return { fetchFeatures };
// };

const features = async (accessToken: string) => {
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

export default features;
