import * as jspb from 'google-protobuf'



export class RegistrationRequest extends jspb.Message {
  getInfo(): UserInfo | undefined;
  setInfo(value?: UserInfo): RegistrationRequest;
  hasInfo(): boolean;
  clearInfo(): RegistrationRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegistrationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RegistrationRequest): RegistrationRequest.AsObject;
  static serializeBinaryToWriter(message: RegistrationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegistrationRequest;
  static deserializeBinaryFromReader(message: RegistrationRequest, reader: jspb.BinaryReader): RegistrationRequest;
}

export namespace RegistrationRequest {
  export type AsObject = {
    info?: UserInfo.AsObject,
  }
}

export class RegistrationResponse extends jspb.Message {
  getRes(): UserInfo | undefined;
  setRes(value?: UserInfo): RegistrationResponse;
  hasRes(): boolean;
  clearRes(): RegistrationResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegistrationResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RegistrationResponse): RegistrationResponse.AsObject;
  static serializeBinaryToWriter(message: RegistrationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegistrationResponse;
  static deserializeBinaryFromReader(message: RegistrationResponse, reader: jspb.BinaryReader): RegistrationResponse;
}

export namespace RegistrationResponse {
  export type AsObject = {
    res?: UserInfo.AsObject,
  }
}

export class RecognitionRequest extends jspb.Message {
  getImage(): Uint8Array | string;
  getImage_asU8(): Uint8Array;
  getImage_asB64(): string;
  setImage(value: Uint8Array | string): RecognitionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecognitionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RecognitionRequest): RecognitionRequest.AsObject;
  static serializeBinaryToWriter(message: RecognitionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecognitionRequest;
  static deserializeBinaryFromReader(message: RecognitionRequest, reader: jspb.BinaryReader): RecognitionRequest;
}

export namespace RecognitionRequest {
  export type AsObject = {
    image: Uint8Array | string,
  }
}

export class RecognitionResponse extends jspb.Message {
  getRes(): UserInfo | undefined;
  setRes(value?: UserInfo): RecognitionResponse;
  hasRes(): boolean;
  clearRes(): RecognitionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecognitionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RecognitionResponse): RecognitionResponse.AsObject;
  static serializeBinaryToWriter(message: RecognitionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecognitionResponse;
  static deserializeBinaryFromReader(message: RecognitionResponse, reader: jspb.BinaryReader): RecognitionResponse;
}

export namespace RecognitionResponse {
  export type AsObject = {
    res?: UserInfo.AsObject,
  }
}

export class UserInfo extends jspb.Message {
  getUserId(): number;
  setUserId(value: number): UserInfo;

  getUserName(): string;
  setUserName(value: string): UserInfo;

  getEmail(): string;
  setEmail(value: string): UserInfo;

  getProfilePicture(): Uint8Array | string;
  getProfilePicture_asU8(): Uint8Array;
  getProfilePicture_asB64(): string;
  setProfilePicture(value: Uint8Array | string): UserInfo;

  getFaceImage(): Uint8Array | string;
  getFaceImage_asU8(): Uint8Array;
  getFaceImage_asB64(): string;
  setFaceImage(value: Uint8Array | string): UserInfo;

  getLastRecognizedDatetime(): string;
  setLastRecognizedDatetime(value: string): UserInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserInfo.AsObject;
  static toObject(includeInstance: boolean, msg: UserInfo): UserInfo.AsObject;
  static serializeBinaryToWriter(message: UserInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserInfo;
  static deserializeBinaryFromReader(message: UserInfo, reader: jspb.BinaryReader): UserInfo;
}

export namespace UserInfo {
  export type AsObject = {
    userId: number,
    userName: string,
    email: string,
    profilePicture: Uint8Array | string,
    faceImage: Uint8Array | string,
    lastRecognizedDatetime: string,
  }
}

