import { toNano } from 'ton';
import { TGMiniAppWalletClient } from '../client/wallet.js';

/**
 * Telegram TON Payment
 */
export class TGTonPayment {
  /**
   * @param projectId project ID
   * @param wallet TGMiniAppWallet instance
   */
  constructor(
    readonly projectId: string,
    readonly wallet: TGMiniAppWalletClient
  ) {}

  /**
   * pay
   * @param tonAmount ton amount
   * @param address address
   * @param comment comment
   */
  async pay(tonAmount: number, address: string, comment?: string) {
    return this.wallet.sendTransferWithComment({
      // 10m deadline
      validUntil: Math.floor(Date.now() / 1000) + 60 * 10,
      messages: [{ address, amount: toNano(tonAmount).toString(), comment }]
    });
  }
}
