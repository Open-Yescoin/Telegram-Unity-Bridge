---
outline: deep
---

# Getting Started

This guide will walk you through setting up and using the Telegram-Unity-Bridge in your Unity project.

## Step 1: Configure WebGL Template

The WebGL template is crucial for proper integration with the Telegram MiniApp environment.

1. Copy the provided `WebGLTemplate` folder to your project's `Assets/WebGLTemplates` directory.
2. Open **File > Build Settings**, select the WebGL platform, and click **Player Settings**.
3. Under **Player Settings > Resolution and Presentation**, select the "Telegram-Unity-Bridge" template.

::: tip
The WebGL template ensures optimized interface adaptation in the Telegram MiniApp environment. Without it, some features may not work correctly.
:::

## Step 2: Add TGMiniAppGameSDKProvider Component

The `TGMiniAppGameSDKProvider` component is the core bridge between C# and JavaScript.

1. Create an empty `GameObject` in your Unity scene.
2. **Add Component** → Search for `TGMiniAppGameSDKProvider` and add it to the GameObject.
3. This component handles callbacks and maintains event subscriptions.

::: note
`TGMiniAppGameSDKProvider` is a MonoBehaviour class defined in `YesTMABridge.cs`. You can attach it directly from the Unity Inspector.
:::

## Step 3: Configure Sample Script (Optional)

To see the SDK in action, you can use the provided sample script:

1. Add `YesTMABridgeActions.cs` to another GameObject.
2. The script automatically finds `TGMiniAppGameSDKProvider` at runtime using `FindObjectOfType<TGMiniAppGameSDKProvider>()`.
3. Make sure `TGMiniAppGameSDKProvider` is present in the scene before `YesTMABridgeActions` is initialized.

## Step 4: Testing the Integration

1. Build your project for WebGL.
2. Deploy the build to a Telegram MiniApp environment.
3. Test basic functionality:
   - Call methods like `connectWallet()` or `payWithTon()`
   - Verify that events such as `OnPhoneAccessReceived`, `OnWriteAccessReceived`, `OnContactReceived` are triggered
   - Check Unity's Console for debug logs

## Key Components

### TGMiniAppGameSDKProvider

The main component that bridges C# and JavaScript calls. It provides:

- **Wallet Management**: Connect, disconnect, check status, get address
- **Payments**: Process TON payments
- **User Information**: Retrieve launch parameters, user info, start params, and raw initialization data
- **UI Control**: Modify mini-app UI elements (colors, orientation, viewport)
- **Device Features**: Access vibration, clipboard, contacts, phone, write access
- **Social Features**: Share stories, URLs, open links
- **Emoji Status**: Request and set emoji status

### Events

The provider defines events that are triggered by JavaScript callbacks:

- `OnContactReceived`
- `OnPhoneAccessReceived`
- `OnWriteAccessReceived`
- `OnEmojiStatusAccessReceived`
- `OnTextFromClipboardReceived`

Subscribe to these events in your scripts to handle asynchronous responses.

## Basic Usage Example

Here's a simple example to get you started:

```csharp
using UnityEngine;

public class MyGameController : MonoBehaviour
{
    private TGMiniAppGameSDKProvider sdkProvider;

    void Start()
    {
        // Find the SDK provider in the scene
        sdkProvider = FindObjectOfType<TGMiniAppGameSDKProvider>();
        
        if (sdkProvider != null)
        {
            // Subscribe to events
            sdkProvider.OnContactReceived += HandleContact;
            sdkProvider.OnPhoneAccessReceived += HandlePhoneAccess;
            
            // Connect wallet
            TGMiniAppGameSDKProvider.connectWallet();
            
            // Get user info
            TMAUser user = TGMiniAppGameSDKProvider.GetUserInfo();
            Debug.Log($"User: {user.firstName} {user.lastName}");
        }
    }

    void OnDestroy()
    {
        // Unsubscribe from events
        if (sdkProvider != null)
        {
            sdkProvider.OnContactReceived -= HandleContact;
            sdkProvider.OnPhoneAccessReceived -= HandlePhoneAccess;
        }
    }

    private void HandleContact(TMARequestedContact contactInfo)
    {
        Debug.Log($"Contact received: {contactInfo.contact.firstName}");
    }

    private void HandlePhoneAccess(string result)
    {
        Debug.Log($"Phone access: {result}");
    }
}
```

## Common Use Cases

### Wallet Interaction

```csharp
// Connect wallet
TGMiniAppGameSDKProvider.connectWallet();

// Check connection status
bool isConnected = TGMiniAppGameSDKProvider.getWalletConnected();

// Get wallet address
string address = TGMiniAppGameSDKProvider.getWalletAddress();

// Make a payment
TGMiniAppGameSDKProvider.payWithTon("RECIPIENT_ADDRESS", 0.1f, "Payment comment");
```

### UI Control

```csharp
// Set UI colors
TGMiniAppGameSDKProvider.miniAppSetHeaderColor("#FF5733");
TGMiniAppGameSDKProvider.miniAppSetBgColor("#FFFFFF");
TGMiniAppGameSDKProvider.miniAppSetBottomBarColor("#000000");

// Control orientation
TGMiniAppGameSDKProvider.enableVertical();
TGMiniAppGameSDKProvider.showBackButton();
```

### Request Permissions

```csharp
// Request phone access
TGMiniAppGameSDKProvider.requestPhoneAccess();

// Request contact information
TGMiniAppGameSDKProvider.requestContact();

// Request write access
TGMiniAppGameSDKProvider.requestWriteAccess();
```

## Next Steps

- Explore the [API Reference](/api-reference) for detailed method documentation
- Check out [Examples](/examples) for more advanced usage patterns
- Review [Troubleshooting](/troubleshooting) if you encounter any issues


