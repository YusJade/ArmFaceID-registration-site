// import * as grpcweb from '@improbable-eng/grpc-web'

import {FaceRpcClient} from 'face-grpc/face_grpc_web_pb'
import {UserInfo, RecognitionRequest, RecognitionResponse, RegistrationRequest, RegistrationResponse} from 'face-grpc/face_pb'
import type { RpcError } from 'grpc-web';

/**
 * 用于调用 gRPC 后端服务器的接口
 */
class FaceRpc {
  constructor(public faceService: FaceRpcClient) {}

  /**
   * 
   * @param img 需要识别的人脸图片
   * @returns 识别成功则返回一个包含完整信息的 UserInfo
   */
  Recognize(img: Uint8Array | string): Promise<RecognitionResponse | null> {
    const req = new RecognitionRequest();
    req.setImage(img);

    return new Promise((resolve: (resp : RecognitionResponse) => void, reject: (err: RpcError) => void) => {
      this.faceService.rpcRecognizeFace(req, {}, (err, resp) => {
        if (err) {
          reject(err);
        } else {
          resolve(resp);
        }
      });
    });
  }

  /**
   * 
   * @param userInfo 仅需设置 userName, email, faceImage
   * @returns 注册成功则返回一个包含完整信息的 UserInfo
   */
  Register(userInfo: UserInfo): Promise<RegistrationResponse | null> {
    const req = new RegistrationRequest();
    req.setInfo(userInfo)

    return new Promise((resolve, reject) => {
      this.faceService.rpcRegisterFace(req, {}, (err, resp) => {
        if (err) {
          reject(err);
        } else {
          resolve(resp);
        }
      });
    });
  }
  
}

// 连接后端服务器
const FaceService = new FaceRpcClient('http://127.0.0.1:9092', null, null)

export default new FaceRpc(FaceService)
export { UserInfo, RecognitionRequest, RecognitionResponse, RegistrationRequest, RegistrationResponse}