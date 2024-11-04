import * as grpcWeb from 'grpc-web';

import * as face_pb from './face_pb'; // proto import: "face.proto"


export class FaceRpcClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  rpcRecognizeFace(
    request: face_pb.RecognitionRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: face_pb.RecognitionResponse) => void
  ): grpcWeb.ClientReadableStream<face_pb.RecognitionResponse>;

  rpcRegisterFace(
    request: face_pb.RegistrationRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: face_pb.RegistrationResponse) => void
  ): grpcWeb.ClientReadableStream<face_pb.RegistrationResponse>;

}

export class FaceRpcPromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  rpcRecognizeFace(
    request: face_pb.RecognitionRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<face_pb.RecognitionResponse>;

  rpcRegisterFace(
    request: face_pb.RegistrationRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<face_pb.RegistrationResponse>;

}

