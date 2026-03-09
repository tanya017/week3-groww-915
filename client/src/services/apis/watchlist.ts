import { WatchlistResponse } from "@/shared/types";
import { BASE_URL, getHeaders } from "@/shared/utils/api";
import axios from "axios";
// export const useWatchlist = () => {
//   const [data, setData] = useState<WatchlistResponse>({
//     userDefinedWatchlists: [],
//     predefinedWatchlists: [],
//     defaultWatchlistId: 0,
//   });
//   const [loading, setLoading] = useState(false);
//   const accessToken = useUIStore((s) => s.accessToken);

//   const fetchWatchlist = useCallback(async () => {
//     if (!accessToken) {
//       console.warn("Fetch skipped: No access token");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(`${BASE_URL}/v1/api/watchlist/list`, {
//         method: "GET",
//         headers: getHeaders(accessToken),
//       });

//       if (!response.ok) throw new Error(`Error: ${response.status}`);

//       const result: WatchlistResponse = await response.json();
//       setData(result);
//     } catch (error) {
//       console.error("Error fetching Watchlist:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [accessToken]);

//   useEffect(() => {
//     fetchWatchlist();
//   }, [fetchWatchlist]);

//   return { data, loading, refresh: fetchWatchlist };
// };


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