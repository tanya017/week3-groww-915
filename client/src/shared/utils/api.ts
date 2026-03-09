
export const BASE_URL = '/api-proxy';

export const key = {
    devicePublicKey: 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1Gd3dEUVlKS29aSWh2Y05BUUVCQlFBRFN3QXdTQUpCQUxmQUp0Uy9ZcjVWSCtNUTVUZmkvTG1zNUZldDNMM3g2SUNYMW9zME15RWpjUC9ldmFGdFYrZkJOTTBKRG5WQ3h3alZwRkNHaElybkt1S3d1Y2pUUndrQ0F3RUFBUT09DQotLS0tLUVORCBQVUJMSUMgS0VZLS0tLS0=',
}

export function timeStampGenerator() {
  return Date.now();
}

export const getHeaders = (accessToken?:string) => {
    const current_timestamp = timeStampGenerator();
    const headers: any = {
        "Authorization": `Bearer ${accessToken}`,
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
    }

    if(accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return headers;
}