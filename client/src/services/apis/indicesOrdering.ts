import { getHeaders,BASE_URL } from "@/shared/utils/api";
import axios from "axios";

const index = async(accessToken: string) => {
    try{
        const response = await axios.get(`${BASE_URL}/v1/middleware-bff/profile/indices-ordering`,
            {
                headers: getHeaders(accessToken),
            }
        )
        console.log('all user indices fetched: ', response.data.IndexDetails)
        return response.data.indices || [];
    } catch(error: any) {
        console.log(error);
    }
}
export default index;