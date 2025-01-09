import { TonConnectUiCreateOptions } from '@tonconnect/ui';
import { TGMiniAppGameSDKApiClient } from './client/api.js';
import { TGMiniAppClient } from './client/miniApp.js';
import { TGMiniAppWalletClient } from './client/wallet.js';
import { TGStarPayment, TGTonPayment } from './payment/index.js';

export { TGMiniAppClient, TGMiniAppWalletClient };

export interface TGMiniAppGameClientSDKContractorParameters {
  /**
   * Project ID
   */
  projectId: string;

  /**
   * tonConnect UI options
   */
  ui: TonConnectUiCreateOptions;
}

export interface TGMiniAppGameClientSDKPayments {
  /**
   * TON payment
   */
  ton: TGTonPayment;

  /**
   * STAR payment
   */
  star: TGStarPayment;
}

export class TGMiniAppGameClientSDK extends TGMiniAppClient {
  /**
   * wallet
   */
  readonly wallet = new TGMiniAppWalletClient();

  /**
   * payments
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
