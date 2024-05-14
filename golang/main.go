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
	return &pb.HelloResponse{Message: "Hello " + req.Name}, nil
}

func main() {
	// Define the gRPC server port
	grpcPort := 8003

	// Start the gRPC server
	grpcServer := grpc.NewServer()
	pb.RegisterGreeterServer(grpcServer, &server{})

	// Create a TCP listener for gRPC server
	grpcListener, err := net.Listen("tcp", fmt.Sprintf(":%d", grpcPort))
	if err != nil {
		log.Fatalf("Failed to listen for gRPC: %v", err)
	}

	// Start serving gRPC requests in a separate goroutine
	go func() {
		fmt.Printf("gRPC server listening on port %d...\n", grpcPort)
		if err := grpcServer.Serve(grpcListener); err != nil {
			log.Fatalf("Failed to serve gRPC: %v", err)
		}
	}()

	// Define the HTTP server port
	httpPort := 8004

	// Define a handler function for HTTP server
	httpHandler := func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, you've requested: %s\n", r.URL.Path)
	}

	// Register the handler function to respond to all requests
	http.HandleFunc("/", httpHandler)

	// Start the HTTP server on the defined port
	fmt.Printf("HTTP server listening on port %d...\n", httpPort)
	if err := http.ListenAndServe(fmt.Sprintf(":%d", httpPort), nil); err != nil {
		fmt.Println("Error starting HTTP server:", err)
	}
}
