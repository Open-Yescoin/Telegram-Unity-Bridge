/**
 * Unity's restrictions on JavaScript within jslibs
 *
 * 1. Serialization limitations:
 * In Unity's jslib environment, when a JavaScript object needs to be passed back to C#,
 * a direct serialization approach (such as using JSON.stringify) often returns an empty string.
 * This is because many JavaScript object types are not automatically serializable.
 * For example, objects containing circular references or certain native objects (like window or document)
 * cannot be directly serialized. Due to these restrictions in the Unity environment,
 * developers must write custom serialization functions for such objects.
 *
 * 2. Stripping and method availability limitations:
 * Unity may strip unused methods during the build process (controlled by low or high stripping settings).
 * If these methods are called at runtime, it may lead to runtime errors.
 * Therefore, all methods that might be needed at runtime must be explicitly referenced or used
 * to prevent them from being stripped.
 *
 * 3. High-level JavaScript syntax limitations:
 * The JavaScript engine used by Unity is SpiderMonkey 24, which does not support ES6 syntax.
 * Except for const and let, other ES6 features are not supported.
 * It is recommended to primarily use var.
 *
 * 4. Compilation characteristics:
 * Within the object passed to mergeInto, all methods are intercepted into Unity internally
 * and presented with a leading underscore (e.g., _MethodName).
 */

var TGMiniAppGameSDKProvider = {
  /**
   * Safely converts an object to a JSON string, handling circular references and bigint values.
   * @param {Object} obj - The object to be stringified.
   * @param {Number|String} space - The space or indentation for formatting the output.
   * @returns {String} The safe, stringified version of the object.
   */
  safeStringify: function (obj, space) {
    function _safeStringifyReplacer(seen) {
      return function (_, value) {
        if (value === null || typeof value !== 'object') {
          if (typeof value === 'bigint') return value.toString();
          return value;
        }

        if (seen.has(value)) {
          return '[Circular]';
        }

        seen.add(value);

        const newValue = Array.isArray(value) ? [] : {};
        for (const [key2, value2] of Object.entries(value)) {
          newValue[key2] = _safeStringifyReplacer(seen)(key2, value2);
        }

        seen.delete(value);

        return newValue;
      };
    }

    var seen = new WeakSet();
    return JSON.stringify(obj, _safeStringifyReplacer(seen), space);
  },

  /**
   * Converts a JavaScript string into a memory buffer compatible with Unity.
   * @param {String} str - The string to convert.
   * @returns {Number} A pointer to the allocated memory buffer containing the UTF-8 string.
   */
  str2Buffer: function (str) {
    var bufferSize = lengthBytesUTF8(str) + 1;
    var cString = _malloc(bufferSize);
    stringToUTF8(str, cString, bufferSize);
    return cString;
  },

  /**
   * Retrieves a nested property value from an object using a given path.
   * If the value does not exist, returns the provided default value.
   * @param {Object} obj - The object to query.
   * @param {String|Array} path - The property path (e.g., 'a.b.c' or ['a','b','c']).
   * @param {*} defaultValue - The value returned if the property does not exist.
   * @returns {*} The retrieved property value or the default value if not found.
   */
  objGet: function (obj, path, defaultValue) {
    var keys = Array.isArray(path) ? path : path.replace(/\[(\d+)]/g, '.$1').split('.');
    var result = obj;
    for (const key of keys) {
      result = result[key];
      if (result === undefined || result === null) {
        return defaultValue;
      }
    }
    return result;
  },

  // --------------------- TGMiniAppGameSDK --------------------- //
  /**
   * Initiates a wallet connection via the TGMiniAppGameSDK instance.
   */
  connectWallet: function () {
    window.TGMiniAppGameSDKInstance.wallet.connect();
  },

  /**
   * Disconnects the currently connected wallet via the TGMiniAppGameSDK instance.
   */
  disconnectWallet: function () {
    window.TGMiniAppGameSDKInstance.wallet.disconnect();
  },

  /**
   * Checks if the wallet is currently connected.
   * @returns {Boolean} True if the wallet is connected, otherwise false.
   */
  getWalletConnected: function () {
    return window.TGMiniAppGameSDKInstance.wallet.isConnected;
  },

  /**
   * Retrieves the currently connected wallet address.
   * @returns {String} The wallet address.
   */
  getWalletAddress: function () {
    return _str2Buffer(_objGet(window, 'TGMiniAppGameSDKInstance.wallet.address', ''));
  },

  /**
   * Initiates a payment using Ton cryptocurrency.
   * @param {Number} amount - The amount to pay.
   * @param {String} comment - An optional comment for the payment.
   */
  payWithTon: function (amount, comment) {
    window.TGMiniAppGameSDKInstance.payments.ton.pay(amount, comment);
  },

  /**
   * Retrieves the launch parameters of the application.
   * @returns {Number} A pointer to a memory buffer containing the launch parameters as a string.
   */
  getLaunchParams: function () {
    return _str2Buffer(_safeStringify(_objGet(window, 'TGMiniAppGameSDKInstance.launchParams', {})));
  },

  /**
   * Retrieves user information from the launch parameters.
   * @returns {Number} A pointer to a memory buffer containing the user info as a string.
   */
  getUserInfo: function () {
    return _str2Buffer(_safeStringify(_objGet(window, 'TGMiniAppGameSDKInstance.launchParams.initData.user', {})));
  },

  /**
   * Retrieves the "startParam" from the launch parameters.
   * @returns {Number} A pointer to a memory buffer containing the startParam as a string.
   */
  getStartParam: function () {
    return _str2Buffer(_objGet(window, 'TGMiniAppGameSDKInstance.launchParams.startParam', ''));
  },

  /**
   * Retrieves the raw initialization data from the launch parameters.
   * @returns {Number} A pointer to a memory buffer containing the raw init data as a string.
   */
  getInitDataRaw: function () {
    return _str2Buffer(_objGet(window, 'TGMiniAppGameSDKInstance.launchParams.initDataRaw', ''));
  },

  // --------------------- TG Methods --------------------- //
  /**
   * Sends a request to call a specific Telegram-related method through the SDK instance.
   * Arguments are passed directly to the request method.
   */
  requestTGMethod: function () {
    window.TGMiniAppGameSDKInstance.requestTGMethod(arguments);
  },

  /**
   * Sets the mini-app's header color using the provided color value.
   * @param {String} color - A CSS color value.
   */
  miniAppSetHeaderColor: function (color) {
    window.TGMiniAppGameSDKInstance.miniAppSetHeaderColor(color);
  },

  /**
   * Sets the mini-app's background color.
   * @param {String} color - A CSS color value.
   */
  miniAppSetBgColor: function (color) {
    window.TGMiniAppGameSDKInstance.miniAppSetBgColor(color);
  },

  /**
   * Sets the mini-app's bottom bar color.
   * @param {String} color - A CSS color value.
   */
  miniAppSetBottomBarColor: function (color) {
    window.TGMiniAppGameSDKInstance.miniAppSetBottomBarColor(color);
  },

  /**
   * Closes the mini-app.
   */
  miniAppClose: function () {
    window.TGMiniAppGameSDKInstance.miniAppClose();
  },

  /**
   * Gets the current mini-app status.
   */
  miniAppIsActive: function () {
    return window.TGMiniAppGameSDKInstance.miniAppIsActive();
  },

  /**
   * Expands the viewport within the mini-app.
   */
  viewportExpand: function () {
    window.TGMiniAppGameSDKInstance.viewportExpand();
  },

  /**
   * Requests fullscreen mode within the viewport.
   */
  viewportRequestFullscreen: function () {
    window.TGMiniAppGameSDKInstance.viewportRequestFullscreen();
  },

  /**
   * Shows the back button in the mini-app interface.
   */
  backButtonShow: function () {
    window.TGMiniAppGameSDKInstance.backButtonShow();
  },

  /**
   * Hides the back button in the mini-app interface.
   */
  backButtonHide: function () {
    window.TGMiniAppGameSDKInstance.backButtonHide();
  },

  /**
   * Enables a confirmation dialog or mechanism before certain actions.
   */
  enableConfirmation: function () {
    window.TGMiniAppGameSDKInstance.enableConfirmation();
  },

  /**
   * Disables the confirmation dialog or mechanism.
   */
  disableConfirmation: function () {
    window.TGMiniAppGameSDKInstance.disableConfirmation();
  },

  /**
   * Enables vertical orientation or layout within the mini-app.
   */
  enableVertical: function () {
    window.TGMiniAppGameSDKInstance.enableVertical();
  },

  /**
   * Disables vertical orientation or layout within the mini-app.
   */
  disableVertical: function () {
    window.TGMiniAppGameSDKInstance.disableVertical();
  },

  /**
   * Shares a story with specified media URL and text.
   * @param {String} mediaUrl - The URL of the media to share.
   * @param {String} text - The text to accompany the story.
   * @param {String} widgetLinkUrl - A link URL to include in the story's widget.
   * @param {String} widgetLinkName - The displayed name for the widget link.
   */
  shareStory: function (mediaUrl, text, widgetLinkUrl, widgetLinkName) {
    window.TGMiniAppGameSDKInstance.shareStory(mediaUrl, text, widgetLinkUrl, widgetLinkName);
  },

  /**
   * Opens a Telegram link within the mini-app environment.
   * @param {String} link - The Telegram link to open.
   */
  openTelegramLink: function (link) {
    window.TGMiniAppGameSDKInstance.openTelegramLink(link);
  },

  /**
   * Opens a given link, with optional attempts to open in browser or Instant View.
   * @param {String} link - The URL to open.
   * @param {Boolean} tryBrowser - Whether to attempt opening in a browser.
   * @param {Boolean} tryInstantView - Whether to attempt opening in Instant View.
   */
  openLink: function (link, tryBrowser, tryInstantView) {
    window.TGMiniAppGameSDKInstance.openLink(link, tryBrowser, tryInstantView);
  },

  /**
   * Shares a URL along with an accompanying text.
   * @param {String} url - The URL to share.
   * @param {String} text - The text to accompany the URL.
   */
  shareURL: function (url, text) {
    window.TGMiniAppGameSDKInstance.shareURL(url, text);
  },

  /**
   * Requests a vibration action in the device, if supported.
   * @param {String} style - The vibration style/type.
   */
  requestVibration: function (style) {
    window.TGMiniAppGameSDKInstance.requestVibration(style);
  },

  /**
   * Adds the mini-app to the user's home screen.
   */
  addToHomeScreen: function () {
    window.TGMiniAppGameSDKInstance.addToHomeScreen();
  },

  /**
   * Requests a check of the home screen status.
   */
  requestCheckHomeScreenStatus: function () {
    window.TGMiniAppGameSDKInstance.requestCheckHomeScreenStatus();
  },

  /**
   * Requests access to the user's phone information or capability.
   */
  requestPhoneAccess: function () {
    window.TGMiniAppGameSDKInstance.requestPhoneAccess();
  },

  /**
   * Requests write access permissions.
   */
  requestWriteAccess: function () {
    window.TGMiniAppGameSDKInstance.requestWriteAccess();
  },

  /**
   * Requests access to the user's contact information.
   */
  requestContact: function () {
    window.TGMiniAppGameSDKInstance.requestContact();
  },

  /**
   * Requests access to set or read the user's emoji status.
   */
  requestEmojiStatusAccess: function () {
    window.TGMiniAppGameSDKInstance.requestEmojiStatusAccess();
  },

  /**
   * Requests to set the user's emoji status with a specified emoji and duration.
   * @param {String} customEmojiId - The custom emoji ID to set.
   * @param {Number} duration - The duration (in a suitable unit) for the emoji status.
   */
  requestSetEmojiStatus: function (customEmojiId, duration) {
    window.TGMiniAppGameSDKInstance.requestSetEmojiStatus(customEmojiId, duration);
  },

  /**
   * Requests reading text content from the system clipboard.
   */
  requestReadTextFromClipboard: function () {
    window.TGMiniAppGameSDKInstance.requestReadTextFromClipboard();
  },
};

mergeInto(LibraryManager.library, TGMiniAppGameSDKProvider);
