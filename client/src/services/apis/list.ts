import { BASE_URL, getHeaders } from "@/shared/utils/api";
import axios from "axios";

const fetchScrips = async (
  accessToken: string | null,
  onSuccess: (data: any) => void,
  onError: (err: any) => void,
  watchlistId: number,
) => {
  if (!accessToken) return;

  try {
    const response = await axios.post(
      `${BASE_URL}/v1/api/watchlist/scrips/list`,
      {
        // watchlistId: 1321,
        watchlistId: watchlistId,
      },
      {
        headers: getHeaders(accessToken),
      },
    );
    console.log("List data: ", response.data);
    onSuccess(response.data);
  } catch (error: any) {
    console.log("Lists not fetched");
    onError(error);
  }
};
export default fetchScrips;
