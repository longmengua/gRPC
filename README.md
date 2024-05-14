# gRPC

## introduction

- this is an example to demonstrate transport data over gRPC between golang and node

## command test

- node gRPC
    - grpcurl -plaintext -proto ./proto/hello.proto -d '{"name":"John"}' localhost:8001 hello.Greeter/SayHello

- golang gRPC
    - grpcurl -plaintext -proto ./proto/hello.proto -d '{"name":"John"}' localhost:8003 hello.Greeter/SayHello
