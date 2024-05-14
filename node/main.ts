import { Server, ServerCredentials, ServerUnaryCall, sendUnaryData, UntypedHandleCall } from '@grpc/grpc-js';
import express from 'express';
import { hello } from './pb/hello'
import { callGreeterService } from './service/greeter'

class GreeterService implements hello.UnimplementedGreeterService {
  [method: string]: UntypedHandleCall;
  SayHello(call: ServerUnaryCall<hello.HelloRequest, hello.HelloResponse>, callback: sendUnaryData<hello.HelloResponse>): void {
    const request = call.request;

    // 創建回覆
    const response = new hello.HelloResponse();
    response.message = `hello from node grpc server, ${request.name}`;

    // 回覆客戶端
    callback(null, response);
  }
}

// 創建 gRPC 伺服器
function createGrpcServer() {
  const port = 8001

  const greeterService = new GreeterService()
  const server = new Server();

  server.addService(hello.UnimplementedGreeterService.definition, greeterService);

  server.bindAsync(`0.0.0.0:${port}`, ServerCredentials.createInsecure(), (err, port) => {
    if (err != null) {
      return console.error(err);
    }
    console.log(`gRPC listening on ${port}`)
  });
}

// 創建 HTTP 伺服器
function createHttpServer() {
  const port = 8002

  const app = express();

  app.get('/', async (req, res) => {
    const data = await callGreeterService()
    res.send(`message from golang gRPC server, ${data}`);
  });

  app.listen(port, () => {
    console.log(`HTTP server listening on port ${port}...`);
  });
}

// 啟動 gRPC 伺服器
function startGrpcServer() {
    createGrpcServer();
}

// 啟動 HTTP 伺服器
function startHttpServer() {
    createHttpServer();
}

// 啟動 gRPC 伺服器和 HTTP 伺服器
function main() {
    startGrpcServer();
    startHttpServer();
}

main();
