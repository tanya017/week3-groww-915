import { WatchlistResponse } from "@/shared/types";
import { BASE_URL, getHeaders } from "@/shared/utils/api";
import axios from "axios";

const fetchWatchlist = async (
  accessToken: any,
  onSuccess: (data: WatchlistResponse) => void,
  onError: (err: any) => void
) => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/api/watchlist/list`, {
      headers: getHeaders(accessToken),
    });
    console.log('Watchlist fetched: ', response.data)
    onSuccess(response.data);
  }catch(error: any) {
    console.log('Watchlist Fetch Failed');
    onError(error);
  }
}
export default fetchWatchlist;