// services/apis/useVerifyOtp.ts
import { timeStampGenerator } from "@/shared/utils";

const VERIFY_URL = "/api-proxy/v2/api/auth/validate-otp"; // Adjust based on your actual endpoint

const useVerifyOtp = () => {
  const verify = async (
    onSuccess: (data: any) => void,
    onError: (err: any) => void,
  ) => {
    const current_timestamp = timeStampGenerator();

    try {
      const response = await fetch(VERIFY_URL, {
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
        // Hardcoding the OTP and any other required fields as requested
        body: JSON.stringify({
          username: "AMITH1",
          otp: 1234,
        }),
      });

      if (!response.ok) throw new Error("OTP Verification failed");

      const data = await response.json();
      onSuccess(data);
    } catch (error) {
      onError(error);
    }
  };

  return { verify };
};

export default useVerifyOtp;
