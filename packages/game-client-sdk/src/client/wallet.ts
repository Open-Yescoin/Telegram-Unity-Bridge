import { SendTransactionRequest, TonConnectUI, TonConnectUiCreateOptions } from '@tonconnect/ui';
import { beginCell } from 'ton';

export class TGMiniAppWalletClientError extends Error {
  constructor(msg: string) {
    super(`[TGMiniAppWallet] ${msg}`);
  }
}

export class TGMiniAppWalletClientNotInitializedError extends TGMiniAppWalletClientError {
  constructor() {
    super('not initialized');
  }
}

export class TGMiniAppWalletClientNotConnectedError extends TGMiniAppWalletClientError {
  constructor() {
    super('not connected');
  }
}

export class TGMiniAppWalletClient {
  connecter: TonConnectUI | null = null;

  init(options?: TonConnectUiCreateOptions) {
    this.connecter = new TonConnectUI(options);
  }

  get isConnected() {
    return this.connecter?.connected ?? false;
  }

  get address() {
    return this.connecter?.account?.address;
  }

  async connect(timeout?: number) {
    if (!this.connecter) throw new TGMiniAppWalletClientNotInitializedError();
    await this.connecter.openModal();
    await this.waitConnected(timeout);
  }

  disconnect() {
    if (!this.connecter) throw new TGMiniAppWalletClientNotInitializedError();
    return this.connecter.disconnect();
  }

  private buildComment(comment: string | number | bigint) {
    return beginCell()
      .store(builder => {
        builder.storeUint(0, 32);
        builder.storeStringRefTail(comment.toString());
      })
      .endCell()
      .toBoc()
      .toString('base64');
  }

  sendTransferWithComment(
    request: Omit<SendTransactionRequest, 'messages'> & {
      messages: (Omit<SendTransactionRequest['messages'][0], 'payload'> & {
        comment?: string | number | bigint;
      })[];
    }
  ) {
    if (!this.connecter) throw new TGMiniAppWalletClientNotInitializedError();
    if (!this.isConnected) throw new TGMiniAppWalletClientNotConnectedError();
    return this.connecter.sendTransaction({
      ...request,
      messages: request.messages.map(message => ({
        ...message,
        payload: message.comment ? this.buildComment(message.comment) : undefined
      }))
    });
  }

  waitConnected(timeout = 120000) {
    return new Promise<void>((resolve, reject) => {
      const timer = setTimeout(reject, timeout);
      const interval = setInterval(() => {
        if (this.isConnected) {
          clearInterval(interval);
          clearTimeout(timer);
          resolve();
        }
      }, 1000);
    });
  }
}
