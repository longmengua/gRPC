function display_error {
    echo "Error: $1"
    exit 1
}

function goOutput {
    protoc \
        --go_out=../golang/pb \
        --go-grpc_out=../golang/pb \
        hello.proto
}

function tsOutput {
    protoc \
        --plugin="protoc-gen-ts=../node/node_modules/.bin/protoc-gen-ts" \
        --ts_opt=esModuleInterop=true \
        --ts_out="../node/pb" \
        hello.proto
}

function main {
    if [ -z "$1" ]; then
        display_error "No type provided, options: go, ts"
    elif [ "$1" == 'go' ]; then
        goOutput
    elif [ "$1" == 'ts' ]; then
        tsOutput
    else
        display_error "Unsupported type: $1, options: go, ts"
    fi
}

type=$1

main "$type"
