import { toNano } from 'ton';
import { TGMiniAppWalletClient } from '../client/wallet.js';

/**
 * Telegram TON 支付
 */
export class TGTonPayment {
  /**
   * @param projectId 项目 ID
   * @param wallet TGMiniAppWallet 实例
   */
  constructor(
    readonly projectId: string,
    readonly wallet: TGMiniAppWalletClient
  ) {}

  /**
   * 支付
   * @param tonAmount ton 的数量
   * @param comment 评论
   * @param address 收款地址(默认为空)
   */
  async pay(tonAmount: number, comment?: string, address?: string) {
    // TODO: 收款地址应当可以通过 projectId 获取
    address ??= 'UQAS9XVpwZM_wGDVCR08CXS5wTDaNZXv02mBNcW3tVi0r6Oh';
    return this.wallet.sendTransferWithComment({
      // 10m deadline
      validUntil: Math.floor(Date.now() / 1000) + 60 * 10,
      messages: [{ address, amount: toNano(tonAmount).toString(), comment }],
    });
  }
}
