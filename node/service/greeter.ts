import { credentials, makeClientConstructor } from '@grpc/grpc-js';
import { hello } from '../pb/hello'

// 建立一個函數用於呼叫 gRPC 服務
export async function callGreeterService(): Promise<string | undefined> {
    const grpcServerAddress = "0.0.0.0:8001";

    const res = await new Promise<string | undefined>((resolve, reject) => {
        try {
            // const client: hello.GreeterClient = makeClientConstructor(hello.UnimplementedGreeterService.definition, hello.GreeterClient.serviceName) as unknown as hello.GreeterClient
            // 建立要傳送的請求訊息
            const request = new hello.HelloRequest();
            request.name = "John";

            // 呼叫 gRPC 服務
            const client = new hello.GreeterClient(grpcServerAddress, credentials.createInsecure());
            client.SayHello(request, (error: any, response: hello.HelloResponse | undefined) => {
                if (error) {
                    resolve(undefined);
                } 
                
                if (!response) {
                    resolve(undefined)
                }

                resolve(response?.message)
            });
        } catch (error) {
            resolve(undefined);
        }
    });

    return res
}
