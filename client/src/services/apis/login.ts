import { BASE_URL, getHeaders } from "@/shared/utils/api";
import axios from "axios";

// const useLogin = () => {
//   const login = async (
//     onSuccess: (data: any) => void,
//     onError: (err: any) => void
//   ) => {

//     try {
//       const response = await fetch(`${BASE_URL}/v1/api/auth/login`, {
//         method: "POST",
//         headers: getHeaders(),
//         body: JSON.stringify({ username: "AMITH1", password: "abc@12345" }),
//       });

//       if (!response.ok) throw new Error("Login failed");

//       const data = await response.json();
//       console.log("Login successful");

//       onSuccess(data);
//     } catch (error) {
//       onError(error);
//     }
//   };

//   return { login };
// };

// export default useLogin;

 const login = async(
  onSuccess: (data: void) => void,
  onError: (err: void) => void,
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/v1/api/auth/login`,
      {
        username: "AMITH1",
        password: "abc@12345",
      },
      {
        headers: getHeaders(),
      },
    );

    console.log("Login Successful");

    onSuccess(response.data);
  } catch (error: any) {
    onError(error);
  }
};
export default login;