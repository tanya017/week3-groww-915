// import { useEffect } from "react";
// import { BASE_URL, getHeaders, key } from "@/shared/utils/api";


// const usePreAuthHandshak = (
//   onSuccess: (data: any) => void,
//   onError: (err: any) => void,
// ) => {
//   useEffect(() => {

//     fetch(`${BASE_URL}/v1/api/auth/pre-auth-handshake`, {
//       method: "POST",
//       headers: getHeaders(),
//       body: 
//       JSON.stringify(key)
//     })
//       .then((response) => {
//         if (!response.ok) throw new Error("Handshake failed");
//         response.json();
//       })
//       .then((data) => {
//         console.log("Handshake Success:");
//         onSuccess(data);
//       })
//       .catch((error) => {
//         console.error("Error: ", error);
//         onError(error);
//       });
//   }, []);
// };

// export default usePreAuthHandshak;

import { useEffect } from "react";
import axios from "axios";
import { BASE_URL, getHeaders, key } from "@/shared/utils/api";

const preAuth = (
  onSuccess: (data: any) => void,
  onError: (err: any) => void,
) => {
  useEffect(() => {
    const preAuthHandshake = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/v1/api/auth/pre-auth-handshake`, key, {
          headers: getHeaders(),
        });

        onSuccess(response.data);
      } catch (error: any) {
        console.error("Error: ", error);
        onError(error);
      }
    };

    preAuthHandshake();
  }, []);
};

export default preAuth;