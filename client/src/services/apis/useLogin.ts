// useLogin.ts
import { timeStampGenerator } from "@/shared/utils";

const CONST_URL = "/api-proxy/v1/api/auth/login";

const useLogin = () => {
  // We return a function instead of using useEffect
  const login = async (
    onSuccess: (data: any) => void,
    onError: (err: any) => void
  ) => {
    const current_timestamp = timeStampGenerator();
    
    try {
      const response = await fetch(CONST_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        "appName": "NVantage - Middleware Qa",
        "buildNumber": "10005",
        "packageName": "com.coditas.omnenest.omnenest_mobile_app.middlewareqa",
        "appVersion": "1.0.6",
        'os': "android",
        "deviceId": "2abe6bee-768f-4714-ab8d-2da64540bda8",
        "xRequestId": `2abe6bee-768f-4714-ab8d-2da64540bda8-${current_timestamp}`,
        "deviceIp": "10.0.2.16",
        'timestamp': `${current_timestamp}`,
        'source': "MOB",
        "appInstallId": "2abe6bee-768f-4714-ab8d-2da64540bda8",
        "userAgent":
          "com.coditas.omnenest.omnenest_mobile_app.middlewareqa/1.0.6 (Google google sdk_gphone64_x86_64; Android 15 SDK35)",
        },
        body: JSON.stringify({ username: "AMITH1", password: "abc@12345" }),
      });

      if (!response.ok) throw new Error("Login failed");
      
      const data = await response.json();
      console.log("Login successful");
      
      onSuccess(data);
    } catch (error) {
      onError(error);
    }
  };

  return { login }; 
};

export default useLogin;