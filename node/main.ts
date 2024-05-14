import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import * as express from 'express';
import * as bodyParser from 'body-parser';

const PROTO_PATH = './path/to/your/protofile.proto'; // Update this with your proto file path

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
});

const hello_proto: any = grpc.loadPackageDefinition(packageDefinition).helloworld;

function sayHello(call: any, callback: any) {
  callback(null, {message: 'Hello ' + call.request.name});
}

function startGRPCServer() {
  const server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, {sayHello: sayHello});
  server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log('gRPC Server running at http://127.0.0.1:50051');
}

function startHTTPServer() {
  const app = express();
  const port = 8001;

  app.use(bodyParser.json());

  app.get('/api', (req, res) => {
    res.status(200).send('Hello from HTTP Server!\n');
  });

  app.listen(port, () => {
    console.log(`HTTP Server running at http://localhost:${port}`);
  });
}

startGRPCServer();
startHTTPServer();
