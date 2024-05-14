package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"net/http"

	pb "demo/grpc/pb/hello"

	"google.golang.org/grpc"
)

type server struct {
	pb.UnimplementedGreeterServer
}

func (s *server) SayHello(ctx context.Context, req *pb.HelloRequest) (*pb.HelloResponse, error) {
	return &pb.HelloResponse{Message: "Hello from golang grpc server" + req.Name}, nil
}

func startGRPCServer(port int) {
	grpcServer := grpc.NewServer()
	pb.RegisterGreeterServer(grpcServer, &server{})

	grpcListener, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		log.Fatalf("Failed to listen for gRPC: %v", err)
	}

	go func() {
		fmt.Printf("gRPC server listening on port %d...\n", port)
		if err := grpcServer.Serve(grpcListener); err != nil {
			log.Fatalf("Failed to serve gRPC: %v", err)
		}
	}()
}

func startHTTPServer(port int) {
	httpHandler := func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, you've requested: %s\n", r.URL.Path)
	}

	http.HandleFunc("/", httpHandler)

	fmt.Printf("HTTP server listening on port %d...\n", port)
	if err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil); err != nil {
		fmt.Println("Error starting HTTP server:", err)
	}
}

func main() {
	grpcPort := 8003
	httpPort := 8004

	startGRPCServer(grpcPort)
	startHTTPServer(httpPort)

	// Keep the main function running to allow servers to serve
	select {}
}
