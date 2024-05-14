import { Server, ServerCredentials, ServerUnaryCall, sendUnaryData, UntypedHandleCall } from '@grpc/grpc-js';
import * as http from 'http';
import { hello } from './pb/hello'

class GreeterService implements hello.UnimplementedGreeterService {
  [method: string]: UntypedHandleCall;
  SayHello(call: ServerUnaryCall<hello.HelloRequest, hello.HelloResponse>, callback: sendUnaryData<hello.HelloResponse>): void {
    console.log("calling")
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

  const httpServer = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello from HTTP server!\n');
  });

  httpServer.listen(port, '0.0.0.0', () => {
      console.log(`HTTP Server running at http://0.0.0.0:${port}`);
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
