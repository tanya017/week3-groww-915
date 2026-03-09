// api call to endpoint stock/index
import { getHeaders,BASE_URL } from "@/shared/utils/api";
import axios from "axios";

const index = async(accessToken: any, exchange: string) => {
    try{
        const response = await axios.post(`${BASE_URL}/v1/middleware-bff/stocks/index`,
            {
                // exchange:"NSE"
                exchange: exchange
            },
            {
                headers: getHeaders(accessToken),
            }
        )
        console.log('all indices fetched: ', response.data.IndexDetails)
        return response.data.IndexDetails;
    } catch(error: any) {
        console.log(error);
    }
}
export default index;