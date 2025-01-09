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
   * @param comment comment
   * @param address address
   */
  async pay(tonAmount: number, comment?: string, address?: string) {
    // TODO: The collection address should be available through projectId.
    address ??= 'UQAS9XVpwZM_wGDVCR08CXS5wTDaNZXv02mBNcW3tVi0r6Oh';
    return this.wallet.sendTransferWithComment({
      // 10m deadline
      validUntil: Math.floor(Date.now() / 1000) + 60 * 10,
      messages: [{ address, amount: toNano(tonAmount).toString(), comment }],
    });
  }
}
