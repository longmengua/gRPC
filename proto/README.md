# installation

- golang
    - go install google.golang.org/protobuf/cmd/protoc-gen-go
- node
    - npm install -g ts-protoc-gen 
    - export PATH="/usr/local/lib/node_modules/grpc-tools/bin:$PATH"

# generate for golang

- protoc \
    --go_out=../golang/pb \
    --go-grpc_out=../golang/pb \
    hello.proto

# generate for node

- protoc \
    --plugin="protoc-gen-ts=../node/node_modules/.bin/protoc-gen-ts" \
    --ts_opt=esModuleInterop=true \
    --ts_out="../node/pb" \
    hello.proto