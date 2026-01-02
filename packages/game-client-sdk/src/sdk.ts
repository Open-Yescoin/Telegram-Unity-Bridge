import { TonConnectUiCreateOptions } from '@tonconnect/ui';
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

  constructor(readonly parameters: TGMiniAppGameClientSDKContractorParameters) {
    super();
    this.wallet.init(parameters.ui);
    this.payments = {
      ton: new TGTonPayment(parameters.projectId, this.wallet),
      star: new TGStarPayment(parameters.projectId),
    };
  }
}
