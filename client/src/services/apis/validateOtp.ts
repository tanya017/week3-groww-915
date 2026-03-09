import { BASE_URL, getHeaders } from "@/shared/utils/api";
import axios from "axios";

const validateOtp = async (
  onSuccess: (data: any) => void,
  onError: (err: any) => void,
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/v2/api/auth/validate-otp`,
      {
        username: "AMITH1",
        otp: 1234,
      },
      {
        headers: getHeaders(),
      },
    );

    onSuccess(response.data);
  } catch (error: any) {
    onError(error);
  }
};
export default validateOtp;