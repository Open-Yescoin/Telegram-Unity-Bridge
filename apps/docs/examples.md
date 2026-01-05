---
outline: deep
---

# Examples

This page provides practical examples of how to use the Telegram-Unity-Bridge in your Unity projects.

## Basic Setup

### Complete Example Script

```csharp
using UnityEngine;

public class TelegramBridgeExample : MonoBehaviour
{
    private TGMiniAppGameSDKProvider sdkProvider;

    void Start()
    {
        // Find the SDK provider in the scene
        sdkProvider = FindObjectOfType<TGMiniAppGameSDKProvider>();
        
        if (sdkProvider == null)
        {
            Debug.LogError("TGMiniAppGameSDKProvider not found in scene!");
            return;
        }

        // Subscribe to all events
        SubscribeToEvents();

        // Initialize the SDK
        InitializeSDK();
    }

    void OnDestroy()
    {
        // Always unsubscribe from events to prevent memory leaks
        UnsubscribeFromEvents();
    }

    private void SubscribeToEvents()
    {
        sdkProvider.OnContactReceived += HandleContact;
        sdkProvider.OnPhoneAccessReceived += HandlePhoneAccess;
        sdkProvider.OnWriteAccessReceived += HandleWriteAccess;
        sdkProvider.OnEmojiStatusAccessReceived += HandleEmojiStatusAccess;
        sdkProvider.OnTextFromClipboardReceived += HandleClipboardText;
    }

    private void UnsubscribeFromEvents()
    {
        if (sdkProvider != null)
        {
            sdkProvider.OnContactReceived -= HandleContact;
            sdkProvider.OnPhoneAccessReceived -= HandlePhoneAccess;
            sdkProvider.OnWriteAccessReceived -= HandleWriteAccess;
            sdkProvider.OnEmojiStatusAccessReceived -= HandleEmojiStatusAccess;
            sdkProvider.OnTextFromClipboardReceived -= HandleClipboardText;
        }
    }

    private void InitializeSDK()
    {
        // Get user information
        TMAUser user = TGMiniAppGameSDKProvider.GetUserInfo();
        if (user != null)
        {
            Debug.Log($"Welcome, {user.firstName}!");
        }

        // Get launch parameters
        string launchParams = TGMiniAppGameSDKProvider.getLaunchParams();
        Debug.Log($"Launch params: {launchParams}");

        // Customize UI
        TGMiniAppGameSDKProvider.miniAppSetHeaderColor("#4A90E2");
        TGMiniAppGameSDKProvider.miniAppSetBgColor("#F5F5F5");
    }

    // Event handlers
    private void HandleContact(TMARequestedContact contactInfo)
    {
        Debug.Log($"Contact received: {contactInfo.contact.firstName} {contactInfo.contact.lastName}");
        Debug.Log($"Phone: {contactInfo.contact.phoneNumber}");
    }

    private void HandlePhoneAccess(string result)
    {
        Debug.Log($"Phone access: {result}");
    }

    private void HandleWriteAccess(string result)
    {
        Debug.Log($"Write access: {result}");
    }

    private void HandleEmojiStatusAccess(string result)
    {
        Debug.Log($"Emoji status access: {result}");
    }

    private void HandleClipboardText(string text)
    {
        Debug.Log($"Clipboard text: {text}");
    }
}
```

## Wallet Integration

### Complete Wallet Manager

```csharp
using UnityEngine;
using System;

public class WalletManager : MonoBehaviour
{
    private TGMiniAppGameSDKProvider sdkProvider;
    private string walletAddress = "";

    public event Action<string> OnWalletConnected;
    public event Action OnWalletDisconnected;
    public event Action<string> OnPaymentCompleted;

    void Start()
    {
        sdkProvider = FindObjectOfType<TGMiniAppGameSDKProvider>();
        CheckWalletStatus();
    }

    public void ConnectWallet()
    {
        TGMiniAppGameSDKProvider.connectWallet();
        
        // Check status after a short delay
        Invoke(nameof(CheckWalletStatus), 0.5f);
    }

    public void DisconnectWallet()
    {
        TGMiniAppGameSDKProvider.disconnectWallet();
        walletAddress = "";
        OnWalletDisconnected?.Invoke();
    }

    public void CheckWalletStatus()
    {
        bool isConnected = TGMiniAppGameSDKProvider.getWalletConnected();
        
        if (isConnected)
        {
            walletAddress = TGMiniAppGameSDKProvider.getWalletAddress();
            OnWalletConnected?.Invoke(walletAddress);
            Debug.Log($"Wallet connected: {walletAddress}");
        }
        else
        {
            Debug.Log("Wallet not connected");
        }
    }

    public void MakePayment(string recipientAddress, float amount, string comment = "")
    {
        if (!TGMiniAppGameSDKProvider.getWalletConnected())
        {
            Debug.LogWarning("Wallet not connected. Please connect wallet first.");
            return;
        }

        TGMiniAppGameSDKProvider.payWithTon(recipientAddress, amount, comment);
        OnPaymentCompleted?.Invoke(recipientAddress);
    }

    public string GetWalletAddress()
    {
        return walletAddress;
    }

    public bool IsWalletConnected()
    {
        return TGMiniAppGameSDKProvider.getWalletConnected();
    }
}
```

## UI Customization

### Theme Manager

```csharp
using UnityEngine;

[System.Serializable]
public class ThemeColors
{
    public string headerColor = "#4A90E2";
    public string backgroundColor = "#FFFFFF";
    public string bottomBarColor = "#F5F5F5";
}

public class ThemeManager : MonoBehaviour
{
    [SerializeField] private ThemeColors lightTheme;
    [SerializeField] private ThemeColors darkTheme;
    private bool isDarkMode = false;

    void Start()
    {
        ApplyTheme(lightTheme);
    }

    public void ToggleTheme()
    {
        isDarkMode = !isDarkMode;
        ApplyTheme(isDarkMode ? darkTheme : lightTheme);
    }

    public void ApplyTheme(ThemeColors theme)
    {
        TGMiniAppGameSDKProvider.miniAppSetHeaderColor(theme.headerColor);
        TGMiniAppGameSDKProvider.miniAppSetBgColor(theme.backgroundColor);
        TGMiniAppGameSDKProvider.miniAppSetBottomBarColor(theme.bottomBarColor);
    }

    public void SetCustomColors(string header, string background, string bottomBar)
    {
        TGMiniAppGameSDKProvider.miniAppSetHeaderColor(header);
        TGMiniAppGameSDKProvider.miniAppSetBgColor(background);
        TGMiniAppGameSDKProvider.miniAppSetBottomBarColor(bottomBar);
    }
}
```

## Permission Management

### Permission Handler

```csharp
using UnityEngine;
using System;

public class PermissionHandler : MonoBehaviour
{
    private TGMiniAppGameSDKProvider sdkProvider;

    public event Action<bool> OnPhonePermissionGranted;
    public event Action<bool> OnWritePermissionGranted;
    public event Action<TMARequestedContact> OnContactReceived;

    void Start()
    {
        sdkProvider = FindObjectOfType<TGMiniAppGameSDKProvider>();
        
        if (sdkProvider != null)
        {
            sdkProvider.OnPhoneAccessReceived += HandlePhoneAccess;
            sdkProvider.OnWriteAccessReceived += HandleWriteAccess;
            sdkProvider.OnContactReceived += HandleContact;
        }
    }

    void OnDestroy()
    {
        if (sdkProvider != null)
        {
            sdkProvider.OnPhoneAccessReceived -= HandlePhoneAccess;
            sdkProvider.OnWriteAccessReceived -= HandleWriteAccess;
            sdkProvider.OnContactReceived -= HandleContact;
        }
    }

    public void RequestPhonePermission()
    {
        TGMiniAppGameSDKProvider.requestPhoneAccess();
    }

    public void RequestWritePermission()
    {
        TGMiniAppGameSDKProvider.requestWriteAccess();
    }

    public void RequestContactPermission()
    {
        TGMiniAppGameSDKProvider.requestContact();
    }

    private void HandlePhoneAccess(string result)
    {
        bool granted = result.ToLower().Contains("granted") || result.ToLower().Contains("success");
        OnPhonePermissionGranted?.Invoke(granted);
        Debug.Log($"Phone permission: {granted}");
    }

    private void HandleWriteAccess(string result)
    {
        bool granted = result.ToLower().Contains("granted") || result.ToLower().Contains("success");
        OnWritePermissionGranted?.Invoke(granted);
        Debug.Log($"Write permission: {granted}");
    }

    private void HandleContact(TMARequestedContact contactInfo)
    {
        OnContactReceived?.Invoke(contactInfo);
        Debug.Log($"Contact permission granted for: {contactInfo.contact.firstName}");
    }
}
```

## Social Features

### Social Sharing Manager

```csharp
using UnityEngine;

public class SocialSharingManager : MonoBehaviour
{
    public void ShareGameStory(string gameUrl, string gameName)
    {
        TGMiniAppGameSDKProvider.shareStory(
            mediaUrl: "", // Optional: Add image URL
            text: $"Check out {gameName}!",
            widgetLinkUrl: gameUrl,
            widgetLinkName: "Play Now"
        );
    }

    public void ShareGameURL(string gameUrl, string message)
    {
        TGMiniAppGameSDKProvider.shareURL(gameUrl, message);
    }

    public void OpenTelegramChannel(string channelUsername)
    {
        string link = $"https://t.me/{channelUsername}";
        TGMiniAppGameSDKProvider.openTelegramLink(link);
    }

    public void OpenExternalLink(string url, bool useBrowser = true)
    {
        TGMiniAppGameSDKProvider.openLink(url, useBrowser, false);
    }
}
```

## Device Features

### Device Feature Manager

```csharp
using UnityEngine;

public class DeviceFeatureManager : MonoBehaviour
{
    private TGMiniAppGameSDKProvider sdkProvider;

    void Start()
    {
        sdkProvider = FindObjectOfType<TGMiniAppGameSDKProvider>();
        
        if (sdkProvider != null)
        {
            sdkProvider.OnTextFromClipboardReceived += HandleClipboardText;
        }
    }

    void OnDestroy()
    {
        if (sdkProvider != null)
        {
            sdkProvider.OnTextFromClipboardReceived -= HandleClipboardText;
        }
    }

    public void Vibrate(int style = 1)
    {
        TGMiniAppGameSDKProvider.requestVibration(style);
    }

    public void ReadClipboard()
    {
        TGMiniAppGameSDKProvider.requestReadTextFromClipboard();
    }

    public void AddToHomeScreen()
    {
        TGMiniAppGameSDKProvider.addToHomeScreen();
    }

    public void SetEmojiStatus(string emojiId, int durationSeconds = 3600)
    {
        // First request access
        TGMiniAppGameSDKProvider.requestEmojiStatusAccess();
        
        // Then set status (you might want to wait for access confirmation)
        Invoke(nameof(ApplyEmojiStatus), 0.5f);
    }

    private void ApplyEmojiStatus()
    {
        // This would be called after confirming emoji status access
        // TGMiniAppGameSDKProvider.requestSetEmojiStatus(emojiId, durationSeconds);
    }

    private void HandleClipboardText(string text)
    {
        Debug.Log($"Clipboard content: {text}");
        // Process clipboard text here
    }
}
```

## Game Integration Example

### Complete Game Controller

```csharp
using UnityEngine;
using System;

public class GameController : MonoBehaviour
{
    private TGMiniAppGameSDKProvider sdkProvider;
    private WalletManager walletManager;
    private PermissionHandler permissionHandler;
    private TMAUser currentUser;

    void Start()
    {
        InitializeSDK();
        InitializeUser();
        SetupGame();
    }

    private void InitializeSDK()
    {
        sdkProvider = FindObjectOfType<TGMiniAppGameSDKProvider>();
        
        if (sdkProvider == null)
        {
            Debug.LogError("SDK Provider not found!");
            return;
        }

        // Setup components
        walletManager = gameObject.AddComponent<WalletManager>();
        permissionHandler = gameObject.AddComponent<PermissionHandler>();

        // Subscribe to wallet events
        walletManager.OnWalletConnected += OnWalletConnected;
        walletManager.OnPaymentCompleted += OnPaymentCompleted;
    }

    private void InitializeUser()
    {
        currentUser = TGMiniAppGameSDKProvider.GetUserInfo();
        
        if (currentUser != null)
        {
            Debug.Log($"Welcome, {currentUser.firstName}!");
            // Customize game experience based on user
        }
    }

    private void SetupGame()
    {
        // Configure UI
        TGMiniAppGameSDKProvider.miniAppSetHeaderColor("#FF6B6B");
        TGMiniAppGameSDKProvider.enableVertical();
        TGMiniAppGameSDKProvider.backButtonShow();

        // Request necessary permissions
        permissionHandler.RequestPhonePermission();
    }

    private void OnWalletConnected(string address)
    {
        Debug.Log($"Wallet connected: {address}");
        // Enable wallet features in game
    }

    private void OnPaymentCompleted(string recipient)
    {
        Debug.Log($"Payment completed to: {recipient}");
        // Grant in-game rewards
    }

    public void PurchaseItem(string itemId, float price)
    {
        if (!walletManager.IsWalletConnected())
        {
            Debug.Log("Please connect wallet first");
            walletManager.ConnectWallet();
            return;
        }

        string recipientAddress = "YOUR_GAME_WALLET_ADDRESS";
        walletManager.MakePayment(recipientAddress, price, $"Purchase: {itemId}");
    }
}
```

## Best Practices

### Error Handling

```csharp
public class SafeSDKCaller : MonoBehaviour
{
    private TGMiniAppGameSDKProvider sdkProvider;

    public void SafeConnectWallet()
    {
        try
        {
            if (sdkProvider == null)
            {
                sdkProvider = FindObjectOfType<TGMiniAppGameSDKProvider>();
            }

            if (sdkProvider != null)
            {
                TGMiniAppGameSDKProvider.connectWallet();
            }
            else
            {
                Debug.LogError("SDK Provider not available");
            }
        }
        catch (System.Exception e)
        {
            Debug.LogError($"Error connecting wallet: {e.Message}");
        }
    }
}
```

### Event Cleanup Pattern

```csharp
public class CleanupExample : MonoBehaviour
{
    private TGMiniAppGameSDKProvider sdkProvider;

    void OnEnable()
    {
        sdkProvider = FindObjectOfType<TGMiniAppGameSDKProvider>();
        if (sdkProvider != null)
        {
            sdkProvider.OnContactReceived += HandleContact;
        }
    }

    void OnDisable()
    {
        // Always unsubscribe in OnDisable as well
        if (sdkProvider != null)
        {
            sdkProvider.OnContactReceived -= HandleContact;
        }
    }

    void OnDestroy()
    {
        // Final cleanup
        if (sdkProvider != null)
        {
            sdkProvider.OnContactReceived -= HandleContact;
        }
    }

    private void HandleContact(TMARequestedContact contact)
    {
        // Handle contact
    }
}
```


