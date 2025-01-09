/**
 * Telegram Star 支付
 */
export class TGStarPayment {
  constructor(readonly projectId: string) {}

  async pay(_amount: number) {
    // 获取tg bot通过createInvoiceLink创建的链接
  }
}
