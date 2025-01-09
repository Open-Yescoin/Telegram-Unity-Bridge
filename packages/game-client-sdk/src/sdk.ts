import { TonConnectUiCreateOptions } from '@tonconnect/ui';
import { TGMiniAppGameSDKApiClient } from './client/api.js';
import { TGMiniAppClient } from './client/miniApp.js';
import { TGMiniAppWalletClient } from './client/wallet.js';
import { TGStarPayment, TGTonPayment } from './payment/index.js';

export { TGMiniAppClient, TGMiniAppWalletClient };

export interface TGMiniAppGameClientSDKContractorParameters {
  /**
   * 项目 ID
   */
  projectId: string;

  /**
   * tonConnect UI 配置
   */
  ui: TonConnectUiCreateOptions;
}

export interface TGMiniAppGameClientSDKPayments {
  /**
   * TON 支付
   */
  ton: TGTonPayment;

  /**
   * STAR 支付
   */
  star: TGStarPayment;
}

export class TGMiniAppGameClientSDK extends TGMiniAppClient {
  /**
   * 钱包
   */
  readonly wallet = new TGMiniAppWalletClient();

  /**
   * 支付
   */
  readonly payments: TGMiniAppGameClientSDKPayments;

  /**
   * API
   */
  readonly api: TGMiniAppGameSDKApiClient;

  constructor(readonly parameters: TGMiniAppGameClientSDKContractorParameters) {
    super();
    this.wallet.init(parameters.ui);
    this.api = new TGMiniAppGameSDKApiClient('API_BASE_URL', parameters.projectId);
    this.payments = {
      ton: new TGTonPayment(parameters.projectId, this.wallet),
      star: new TGStarPayment(parameters.projectId),
    };
  }
}
