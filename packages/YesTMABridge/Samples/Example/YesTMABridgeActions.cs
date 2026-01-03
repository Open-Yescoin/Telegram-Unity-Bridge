using UnityEngine;
using YesTMABridge;
using System;

public class YesTMABridgeActions : MonoBehaviour
{
    // Instance of the SDK provider
    private TGMiniAppGameSDKProvider sdkProviderInstance;

    // Reference to a GameObject that can be manipulated through SDK actions
    public GameObject GameAction;

    // Telegram Userinfo
    public TMAUser userInfo;

    private void Start()
    {
        sdkProviderInstance = UnityEngine.Object.FindFirstObjectByType<TGMiniAppGameSDKProvider>();

        if (sdkProviderInstance == null)
        {
            return;
        }

        // Subscribe to SDK events
        sdkProviderInstance.OnPhoneAccessReceived += HandlePhoneAccess;
        sdkProviderInstance.OnWriteAccessReceived += HandleWriteAccess;
        sdkProviderInstance.OnContactReceived += HandleContactReceived;
        sdkProviderInstance.OnEmojiStatusAccessReceived += HandleEmojiStatusAccess;
        sdkProviderInstance.OnTextFromClipboardReceived += HandleTextFromClipboard;

        // Initialize the SDK Provider
        InitializeSDKProvider();
    }

    private void OnDestroy()
    {
        if (sdkProviderInstance == null)
        {
            return;
        }

        // Unsubscribe from SDK events to prevent memory leaks
        sdkProviderInstance.OnPhoneAccessReceived -= HandlePhoneAccess;
        sdkProviderInstance.OnWriteAccessReceived -= HandleWriteAccess;
        sdkProviderInstance.OnContactReceived -= HandleContactReceived;
        sdkProviderInstance.OnEmojiStatusAccessReceived -= HandleEmojiStatusAccess;
        sdkProviderInstance.OnTextFromClipboardReceived -= HandleTextFromClipboard;
    }

    /// <summary>
    /// Initializes the SDK Provider by logging initial information.
    /// </summary>
    private void InitializeSDKProvider()
    {
        Debug.Log("Initializing AtpTmaSdkActions");

        // Retrieve and log user information
        userInfo = TGMiniAppGameSDKProvider.GetUserInfo();
        Debug.Log($"User Info: {userInfo}");

        // Retrieve and log launch parameters
        string launchParams = TGMiniAppGameSDKProvider.getLaunchParams();
        Debug.Log($"Launch Params: {launchParams}");

        // Retrieve and log start parameters
        string startParam = TGMiniAppGameSDKProvider.getStartParam();
        Debug.Log($"Start Param: {startParam}");

        // Retrieve and log raw initialization data
        string initDataRaw = TGMiniAppGameSDKProvider.getInitDataRaw();
        Debug.Log($"Init Data Raw: {initDataRaw}");
    }

    /// <summary>
    /// Initiates a wallet connection via the SDK.
    /// </summary>
    public void ConnectWallet()
    {
        Debug.Log("ConnectWallet method called");
        TGMiniAppGameSDKProvider.connectWallet();
    }

    /// <summary>
    /// Disconnects the currently connected wallet via the SDK.
    /// </summary>
    public void DisconnectWallet()
    {
        Debug.Log("DisconnectWallet method called");
        TGMiniAppGameSDKProvider.disconnectWallet();
    }

    /// <summary>
    /// Checks if the wallet is currently connected and logs the status.
    /// </summary>
    public void CheckWalletConnection()
    {
        bool isConnected = TGMiniAppGameSDKProvider.getWalletConnected();
        Debug.Log($"Wallet Connected: {isConnected}");
    }

    /// <summary>
    /// Retrieves and logs the connected wallet address.
    /// </summary>
    public void GetWalletAddress()
    {
        string walletAddress = TGMiniAppGameSDKProvider.getWalletAddress();
        Debug.Log($"Wallet Address: {walletAddress}");
    }

    /// <summary>
    /// Initiates a payment using Ton cryptocurrency via the SDK.
    /// </summary>
    public void PayWithTON()
    {
        Debug.Log("PayWithTON method called");
        string address = "YOUR_TON_WALLET_ADDRESS"; // Recipient TON wallet address
        float amount = 0.1f; // Example amount
        string comment = "Payment for services";
        TGMiniAppGameSDKProvider.payWithTon(address, amount, comment);
    }

    /// <summary>
    /// Sets the mini-app's header color.
    /// </summary>
    /// <param name="color">A CSS color value (e.g., "#FF5733").</param>
    public void SetHeaderColor(string color)
    {
        Debug.Log($"Setting Header Color to: {color}");
        TGMiniAppGameSDKProvider.miniAppSetHeaderColor(color);
    }

    /// <summary>
    /// Sets the mini-app's background color.
    /// </summary>
    /// <param name="color">A CSS color value (e.g., "#33FF57").</param>
    public void SetBackgroundColor(string color)
    {
        Debug.Log($"Setting Background Color to: {color}");
        TGMiniAppGameSDKProvider.miniAppSetBgColor(color);
    }

    /// <summary>
    /// Sets the mini-app's bottom bar color.
    /// </summary>
    /// <param name="color">A CSS color value (e.g., "#3357FF").</param>
    public void SetBottomBarColor(string color)
    {
        Debug.Log($"Setting Bottom Bar Color to: {color}");
        TGMiniAppGameSDKProvider.miniAppSetBottomBarColor(color);
    }

    /// <summary>
    /// Closes the mini-app via the SDK.
    /// </summary>
    public void CloseMiniApp()
    {
        Debug.Log("CloseMiniApp method called");
        TGMiniAppGameSDKProvider.miniAppClose();
    }

    /// <summary>
    /// Expands the viewport within the mini-app.
    /// </summary>
    public void ExpandViewport()
    {
        Debug.Log("Expanding viewport");
        TGMiniAppGameSDKProvider.viewportExpand();
    }

    /// <summary>
    /// Requests fullscreen mode within the viewport.
    /// </summary>
    public void RequestFullscreen()
    {
        Debug.Log("Requesting fullscreen mode");
        TGMiniAppGameSDKProvider.viewportRequestFullscreen();
    }

    /// <summary>
    /// Shows the back button in the mini-app interface.
    /// </summary>
    public void ShowBackButton()
    {
        Debug.Log("Showing back button");
        TGMiniAppGameSDKProvider.backButtonShow();
    }

    /// <summary>
    /// Hides the back button in the mini-app interface.
    /// </summary>
    public void HideBackButton()
    {
        Debug.Log("Hiding back button");
        TGMiniAppGameSDKProvider.backButtonHide();
    }

    /// <summary>
    /// Enables confirmation dialogs before performing certain actions.
    /// </summary>
    public void EnableConfirmation()
    {
        Debug.Log("Enabling confirmation dialogs");
        TGMiniAppGameSDKProvider.enableConfirmation();
    }

    /// <summary>
    /// Disables confirmation dialogs before performing certain actions.
    /// </summary>
    public void DisableConfirmation()
    {
        Debug.Log("Disabling confirmation dialogs");
        TGMiniAppGameSDKProvider.disableConfirmation();
    }

    /// <summary>
    /// Enables vertical orientation within the mini-app.
    /// </summary>
    public void EnableVerticalOrientation()
    {
        Debug.Log("Enabling vertical orientation");
        TGMiniAppGameSDKProvider.enableVertical();
    }

    /// <summary>
    /// Disables vertical orientation within the mini-app.
    /// </summary>
    public void DisableVerticalOrientation()
    {
        Debug.Log("Disabling vertical orientation");
        TGMiniAppGameSDKProvider.disableVertical();
    }

    /// <summary>
    /// Shares a story with specified media and text via the SDK.
    /// </summary>
    public void ShareStory()
    {
        Debug.Log("Sharing story");
        string mediaUrl = "https://example.com/media.jpg";
        string text = "Check out this awesome content!";
        string widgetLinkUrl = "https://example.com/widget";
        string widgetLinkName = "Example Widget";
        TGMiniAppGameSDKProvider.shareStory(mediaUrl, text, widgetLinkUrl, widgetLinkName);
    }

    /// <summary>
    /// Opens a Telegram link within the mini-app environment.
    /// </summary>
    public void OpenTelegramLink()
    {
        Debug.Log("Opening Telegram link");
        string telegramLink = "https://t.me/example";
        TGMiniAppGameSDKProvider.openTelegramLink(telegramLink);
    }

    /// <summary>
    /// Opens a given link with options to try opening in a browser or Instant View.
    /// </summary>
    public void OpenLink()
    {
        Debug.Log("Opening link with options");
        string link = "https://example.com";
        bool tryBrowser = true;
        bool tryInstantView = false;
        TGMiniAppGameSDKProvider.openLink(link, tryBrowser, tryInstantView);
    }

    /// <summary>
    /// Shares a URL along with accompanying text via the SDK.
    /// </summary>
    public void ShareURL()
    {
        Debug.Log("Sharing URL");
        string url = "https://example.com";
        string text = "Check out this link!";
        TGMiniAppGameSDKProvider.shareURL(url, text);
    }

    /// <summary>
    /// Requests a device vibration with a specified style.
    /// </summary>
    public void RequestVibration()
    {
        Debug.Log("Requesting device vibration");
        int style = 1; // Example style
        TGMiniAppGameSDKProvider.requestVibration(style);
    }

    /// <summary>
    /// Requests access to the user's phone capabilities.
    /// </summary>
    public void RequestPhoneAccess()
    {
        Debug.Log("Requesting phone access");
        TGMiniAppGameSDKProvider.requestPhoneAccess();
    }

    /// <summary>
    /// Requests write access permissions.
    /// </summary>
    public void RequestWriteAccess()
    {
        Debug.Log("Requesting write access");
        TGMiniAppGameSDKProvider.requestWriteAccess();
    }

    /// <summary>
    /// Requests access to the user's contact information.
    /// </summary>
    public void RequestContact()
    {
        Debug.Log("Requesting contact information");
        TGMiniAppGameSDKProvider.requestContact();
    }

    /// <summary>
    /// Requests access to manage or read the user's emoji status.
    /// </summary>
    public void RequestEmojiStatusAccess()
    {
        Debug.Log("Requesting emoji status access");
        TGMiniAppGameSDKProvider.requestEmojiStatusAccess();
    }

    /// <summary>
    /// Sets the user's emoji status with a specified emoji and duration.
    /// </summary>
    public void SetEmojiStatus()
    {
        Debug.Log("Setting emoji status");
        string customEmojiId = "emoji_12345";
        int duration = 60; // Duration in seconds
        TGMiniAppGameSDKProvider.requestSetEmojiStatus(customEmojiId, duration);
    }

    /// <summary>
    /// Reads text content from the system clipboard via the SDK.
    /// </summary>
    public void ReadTextFromClipboard()
    {
        Debug.Log("Requesting to read text from clipboard");
        TGMiniAppGameSDKProvider.requestReadTextFromClipboard();
    }

    /// <summary>
    /// Handles the phone access response from the SDK.
    /// </summary>
    /// <param name="status">The status of the phone access request.</param>
    private void HandlePhoneAccess(string status)
    {
        Debug.Log($"Phone Access Status: {status}");
        // Implement additional logic based on phone access status
    }

    /// <summary>
    /// Handles the write access response from the SDK.
    /// </summary>
    /// <param name="status">The status of the write access request.</param>
    private void HandleWriteAccess(string status)
    {
        Debug.Log($"Write Access Status: {status}");
        // Implement additional logic based on write access status
    }

    /// <summary>
    /// Handles the contact information received from the SDK.
    /// </summary>
    /// <param name="requestedContact">The contact information received.</param>
    private void HandleContactReceived(TMARequestedContact requestedContact)
    {
        Debug.Log($"Received Contact - UserID: {requestedContact.contact.userId}, " +
                  $"Phone: {requestedContact.contact.phoneNumber}, " +
                  $"Name: {requestedContact.contact.firstName} {requestedContact.contact.lastName}, " +
                  $"Auth Date: {requestedContact.authDate}, Hash: {requestedContact.hash}");
        // Implement additional logic with the received contact information
    }

    /// <summary>
    /// Handles the emoji status access response from the SDK.
    /// </summary>
    /// <param name="status">The status of the emoji status access request.</param>
    private void HandleEmojiStatusAccess(string status)
    {
        Debug.Log($"Emoji Status Access: {status}");
        // Implement additional logic based on emoji status access
    }

    /// <summary>
    /// Handles the text read from the clipboard received from the SDK.
    /// </summary>
    /// <param name="text">The text read from the clipboard.</param>
    private void HandleTextFromClipboard(string text)
    {
        Debug.Log($"Text from Clipboard: {text}");
        // Implement additional logic with the clipboard text
    }
}
