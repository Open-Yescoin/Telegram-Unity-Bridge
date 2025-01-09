declare namespace LibraryManager {
  // library 对象可以包含任意的键值对
  interface Library {
    [key: string]: unknown;
  }

  // LibraryManager 拥有一个 library 属性，类型为 Library
  const library: Library;
}

// mergeInto 函数将 obj 的内容合并到目标对象中
declare function mergeInto(target: object, obj: object): void;

// unityInstance 对象类型定义
declare const unityInstance: {
  SendMessage(objectName: string, methodName: string, parameter?: string | number): void;
};

declare const TelegramAuthenticationProviderData: {
  supported: boolean;
  version: string;
  initDataRaw: string;
};

// lengthBytesUTF8 函数定义
declare function lengthBytesUTF8(str: string): number;

// _malloc 函数定义
declare function _malloc(size: number): number;

// stringToUTF8 函数定义
declare function stringToUTF8(str: string, outPtr: number, maxBytesToWrite: number): void;
