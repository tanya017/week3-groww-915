import { BASE_URL, getHeaders } from "@/shared/utils/api";
import { useUIStore } from "@/store/ui.store";


export const useGetFeatures = () => {
  const setFeatures = useUIStore((s) => s.setFeatures);
  const accessToken = useUIStore((s) => s.accessToken);

  const fetchFeatures = async () => {
    if (!accessToken) return;

    try {
      const response = await fetch(`${BASE_URL}/v1/api/profile/dashboard-config`, {
        method: "GET",
        headers: getHeaders(accessToken),
      });

      if (!response.ok) throw new Error("Failed to fetch features");

      const data = await response.json();
      setFeatures(data.dashboard.features);
      console.log('Features fetched', data.dashboard.features);
    } catch (error) {
      console.error("Error fetching features:", error);
    }
  };

  return { fetchFeatures };
};