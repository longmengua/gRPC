import { credentials } from '@grpc/grpc-js';
import { hello } from '../pb/hello'

// 建立一個函數用於呼叫 gRPC 服務
export function callGreeterService(): Promise<string> {
    const grpcServerAddress = "0.0.0.0:8001";

    return new Promise((resolve, reject) => {
        try {
            // 建立要傳送的請求訊息
            const request = new hello.HelloRequest();
            request.name = "John";

            // 呼叫 gRPC 服務
            const client = new hello.GreeterClient(grpcServerAddress, credentials.createInsecure());
            client?.sayHello(request, (error: any, response: any) => {
                if (error) {
                    console.error("Error:", error.message);
                    reject(error);
                } else {
                    // 處理 gRPC 服務器的回應
                    resolve(response.getMessage());
                }
            });
        } catch (error) {
            console.error("Error:", error);
            reject(error);
        }
    });
}
