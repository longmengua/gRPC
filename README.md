# gRPC

## command test

- node gRPC
    - grpcurl -plaintext -proto ./proto/hello.proto -d '{"name":"John"}' localhost:8001 hello.Greeter/SayHello

- golang gRPC
    - grpcurl -plaintext -proto ./proto/hello.proto -d '{"name":"John"}' localhost:8003 hello.Greeter/SayHello
