import { BASE_URL, getHeaders } from "@/shared/utils/api";
import axios from "axios";

// const useVerifyOtp = () => {
//   const verify = async (
//     onSuccess: (data: any) => void,
//     onError: (err: any) => void,
//   ) => {
//     try {
//       const response = await fetch(`${BASE_URL}/v2/api/auth/validate-otp`, {
//         method: "POST",
//         headers: getHeaders(),
//         body: JSON.stringify({
//           username: "AMITH1",
//           otp: 1234,
//         }),
//       });

//       if (!response.ok) throw new Error("OTP Verification failed");

//       const data = await response.json();
//       onSuccess(data);
//     } catch (error) {
//       onError(error);
//     }
//   };

//   return { verify };
// };

// export default useVerifyOtp;

const verify = async (
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
export default verify;