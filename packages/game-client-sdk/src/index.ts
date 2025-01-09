import { TGMiniAppGameClientSDK } from './sdk.js';

declare global {
  interface Window {
    TGMiniAppGameSDK: typeof TGMiniAppGameClientSDK;
    TGMiniAppGameSDKInstance: TGMiniAppGameClientSDK;
  }
}

if (typeof window !== 'undefined') {
  window.TGMiniAppGameSDK = TGMiniAppGameClientSDK;
}

export { TGMiniAppGameClientSDK };
