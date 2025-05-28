import LoadAssets from '@/components/LoadAssets';
import { AnimatePresence } from 'framer-motion';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { TGMiniAppGameClientSDK } from '@open-yes/game-client-sdk';

declare global {
  interface Window {
    TGMiniAppGameSDKInstance: TGMiniAppGameClientSDK;
  }
}

window.TGMiniAppGameSDKInstance = new TGMiniAppGameClientSDK({
  projectId: 'yescoin',
  ui: {
    manifestUrl: 'https://www.yescoin.gold/tonconnect-manifest.json',
    actionsConfiguration: {
      twaReturnUrl: 'https://t.me/theYescoin_bot/Yescoin',
    },
  },
});

const BASE_URL = 'https://pub-3f24abf8d919470d84a07be174835a7e.r2.dev/telegram-unity-bridge';

const App = () => {
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: `${BASE_URL}/Build/dist.loader.js`,
    dataUrl: `${BASE_URL}/Build/dist.data`,
    frameworkUrl: `${BASE_URL}/Build/dist.framework.js`,
    codeUrl: `${BASE_URL}/Build/dist.wasm`,
    companyName: 'Yescoin - Unity Game Template',
    productName: 'Yescoin',
    productVersion: '0.1',
  });

  const progress = Math.round(loadingProgression * 100);
  return (
    <main className="w-screen h-screen of-hidden">
      <AnimatePresence>{!isLoaded && <LoadAssets progress={progress} />}</AnimatePresence>
      <Unity unityProvider={unityProvider} className="w-screen h-screen" />
    </main>
  );
};

export default App;
