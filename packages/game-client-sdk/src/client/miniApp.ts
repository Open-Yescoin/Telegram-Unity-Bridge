import { safeStringify } from '../lib/safeStringify.js';
import type { RGB, OpenLinkBrowser, LaunchParams, HeaderColorKey } from '@telegram-apps/sdk';
import {
  backButton,
  biometry,
  closingBehavior,
  hapticFeedback,
  ImpactHapticFeedbackStyle,
  init,
  miniApp,
  openLink,
  openTelegramLink,
  popup,
  qrScanner,
  readTextFromClipboard,
  requestContact,
  requestEmojiStatusAccess,
  requestPhoneAccess,
  requestWriteAccess,
  retrieveLaunchParams,
  secondaryButton,
  setEmojiStatus,
  settingsButton,
  shareStory,
  shareURL,
  swipeBehavior,
  themeParams,
  viewport,
  cloudStorage,
  invoice,
  addToHomeScreen,
  checkHomeScreenStatus
} from '@telegram-apps/sdk';
import { get } from 'lodash-es';

export class TGMiniAppClient {
  isSupported = false;

  launchParams = {} as LaunchParams;

  methods = {
    hapticFeedback,
    backButton,
    miniApp,
    popup,
    biometry,
    invoice,
    cloudStorage,
    viewport,
    closingBehavior,
    settingsButton,
    swipeBehavior,
    qrScanner,
    secondaryButton,
    themeParams,

    // utils
    openLink: openLink as typeof openLink,
    shareStory: shareStory as typeof shareStory,
    openTelegramLink: openTelegramLink as typeof openTelegramLink,
    shareURL: shareURL as typeof shareURL,
    requestPhoneAccess: requestPhoneAccess as typeof requestPhoneAccess,
    requestWriteAccess: requestWriteAccess as typeof requestWriteAccess,
    requestContact: requestContact as typeof requestContact,
    requestEmojiStatusAccess: requestEmojiStatusAccess as typeof requestEmojiStatusAccess,
    setEmojiStatus: setEmojiStatus as typeof setEmojiStatus,
    readTextFromClipboard: readTextFromClipboard as typeof readTextFromClipboard,
    addToHomeScreen: addToHomeScreen as typeof addToHomeScreen,
    checkHomeScreenStatus: checkHomeScreenStatus as typeof checkHomeScreenStatus
  };

  constructor() {
    try {
      init();

      // Mount all methods that require initialization
      for (const methodKey in this.methods) {
        const method = this.methods[methodKey as keyof typeof this.methods] as { mount?: () => void };
        if (typeof method.mount === 'function') {
          method.mount();
        }
      }

      this.launchParams = retrieveLaunchParams();
      this.isSupported = true;
    } catch (error) {
      console.error('Failed to initialize Telegram SDK', error);
    }
  }

  requestTGMethod(args?: IArguments) {
    if (!args) {
      console.error('Arguments are required');
      return;
    }

    const methodPath = args[0] as string;
    if (typeof methodPath !== 'string') {
      console.error('Method path is not a string');
      return;
    }

    const func = get(this.methods, methodPath);
    if (typeof func !== 'function') {
      console.error(`Method ${methodPath} not found`);
      return;
    }

    return func(...Array.from(args).slice(1));
  }

  miniAppSetHeaderColor(color: HeaderColorKey | RGB) {
    this.methods.miniApp.setHeaderColor.ifAvailable(color);
  }

  miniAppSetBgColor(color: RGB) {
    this.methods.miniApp.setBackgroundColor.ifAvailable(color);
  }

  miniAppSetBottomBarColor(color: RGB) {
    this.methods.miniApp.setBottomBarColor.ifAvailable(color);
  }

  miniAppClose() {
    this.methods.miniApp.close.ifAvailable();
  }

  miniAppIsActive() {
    return this.methods.miniApp.isActive();
  }

  viewportExpand() {
    this.methods.viewport.expand.ifAvailable();
  }

  viewportRequestFullscreen() {
    this.methods.viewport.requestFullscreen.ifAvailable();
  }

  backButtonShow() {
    this.methods.backButton.show.ifAvailable();
  }

  backButtonHide() {
    this.methods.backButton.hide.ifAvailable();
  }

  enableConfirmation() {
    this.methods.closingBehavior.enableConfirmation.ifAvailable();
  }

  disableConfirmation() {
    this.methods.closingBehavior.disableConfirmation.ifAvailable();
  }

  enableVertical() {
    this.methods.swipeBehavior.enableVertical.ifAvailable();
  }

  disableVertical() {
    this.methods.swipeBehavior.disableVertical.ifAvailable();
  }

  shareStory(mediaUrl: string, text?: string, widgetLinkUrl?: string, widgetLinkName?: string) {
    this.methods.shareStory.ifAvailable(mediaUrl, {
      text,
      widgetLink: widgetLinkUrl ? { url: widgetLinkUrl, name: widgetLinkName } : undefined
    });
  }

  openTelegramLink(link: string) {
    this.methods.openTelegramLink.ifAvailable(link);
  }

  openLink(link: string, tryBrowser?: OpenLinkBrowser, tryInstantView?: boolean) {
    this.methods.openLink.ifAvailable(link, { tryBrowser, tryInstantView });
  }

  shareURL(url: string, text?: string) {
    this.methods.shareURL.ifAvailable(url, text);
  }

  requestVibration(style: ImpactHapticFeedbackStyle) {
    this.methods.hapticFeedback.impactOccurred.ifAvailable(style);
  }

  addToHomeScreen() {
    this.methods.addToHomeScreen.ifAvailable();
  }

  async requestCheckHomeScreenStatus() {
    unityInstance.SendMessage(
      'TGMiniAppGameSDKProvider',
      'OnCheckHomeScreenStatus',
      await this.methods.checkHomeScreenStatus.ifAvailable()
    );
  }

  async requestPhoneAccess() {
    unityInstance.SendMessage(
      'TGMiniAppGameSDKProvider',
      'OnRequestPhoneAccess',
      await this.methods.requestPhoneAccess.ifAvailable()
    );
  }

  async requestWriteAccess() {
    unityInstance.SendMessage(
      'TGMiniAppGameSDKProvider',
      'OnRequestWriteAccess',
      await this.methods.requestWriteAccess.ifAvailable()
    );
  }

  async requestContact() {
    unityInstance.SendMessage(
      'TGMiniAppGameSDKProvider',
      'OnRequestContact',
      safeStringify(await this.methods.requestContact.ifAvailable())
    );
  }

  async requestEmojiStatusAccess() {
    unityInstance.SendMessage(
      'TGMiniAppGameSDKProvider',
      'OnRequestEmojiStatusAccess',
      await this.methods.requestEmojiStatusAccess.ifAvailable()
    );
  }

  async requestSetEmojiStatus(customEmojiId: string, duration?: number) {
    await this.methods.setEmojiStatus.ifAvailable(customEmojiId, duration);
  }

  async requestReadTextFromClipboard() {
    const content = await this.methods.readTextFromClipboard.ifAvailable();
    unityInstance.SendMessage('TGMiniAppGameSDKProvider', 'OnReadTextFromClipboard', content || '');
  }
}
