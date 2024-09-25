
## protobuf
https://protobuf.dev/
Protocol Buffers are language-neutral, platform-neutral extensible mechanisms for serializing structured data.


https://github.com/protocolbuffers/protobuf
https://github.com/protocolbuffers/protobuf/tree/main/csharp

https://protobuf.dev/news/2023-06-29/
version / edition
https://protobuf.dev/editions/overview/
https://github.com/protocolbuffers/protobuf/blob/main/docs/design/prototiller/editions-tooling.md


## grpc

stub : protobuf generated code
API : channel, call
Core
  - name resolver
  - load balancer : subchannel
  - buffering and retry
  - security
- Transport
  - http2
- Intercepters
  - https://grpc.io/docs/guides/interceptors/

https://grpc.io/docs/guides/metadata/



- https://github.com/grpc/grpc/blob/master/src/csharp/BUILD-INTEGRATION.md


https://grpc.io/blog/grpc-stacks/
https://grpc.io/docs/


dotnet new grpc --output <output>






https://grpc.io/docs/what-is-grpc/core-concepts/
Unary RPC  클라이언트에서 요청를 보내고 서버에서 응답을 던짐 - serverless 가능
Server Streaming RPC 클라이언트에서 요청을 보내고 서버에서 스트림을 던짐
Client Streaming RPC  클라이언트에서 스트림을 서버에 던지고 서버에서 응답 받음
Bidirectional Streaming RPC 클라이언트와 서버가 서로 독립적인 스트림을 주고 받음



https://github.com/alkee-allm/k2proto/blob/master/K2svc/Startup.cs


https://github.com/grpc/grpc/tree/master/src/csharp

grpc-dotnet( Grpc.Net.Client)
Grpc.AspNetCore.Server

Grpc.Core - deprecated

https://learn.microsoft.com/ko-kr/aspnet/core/tutorials/grpc/grpc-start?view=aspnetcore-8.0&tabs=visual-studio
    Install-Package Grpc.Net.Client
    Install-Package Google.Protobuf
    Install-Package Grpc.Tools
