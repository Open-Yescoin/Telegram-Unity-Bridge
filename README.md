<div align="center">

# ATP.TMA.SDK Integration Guide

<a href="https://github.com/Siykt/atp.tma.sdk/blob/main/README.md">Documents</a>
·
<a href="https://github.com/Siykt/atp.tma.sdk/blob/main/README-zh.md">中文 README</a>

</div>

This README provides an overview of the **ATP.TMA.SDK**, including how to set up and use the provided C# classes and sample scripts to integrate with a Telegram MiniApp Game SDK environment.

## Overview

The ATP.TMA.SDK is designed to facilitate communication between a Unity application and the Telegram MiniApp Game environment. It provides C# bindings (via `[DllImport("__Internal")]`) for various JavaScript functions defined in jslib files. These functions enable Unity developers to:

- Manage wallet connections and payments.
- Retrieve launch parameters, user information, and initialization data.
- Control the mini-app UI (header color, background, bottom bar color, etc.).
- Request device capabilities (e.g., phone access, write access, contact information).
- Interact with the Telegram environment (share stories, open links, request vibration, set emoji status, etc.).

## Prerequisites

- Unity 2020.3 or newer (LTS recommended).
- A WebGL build target, as the SDK uses JavaScript libraries and browser-specific capabilities.
- The JavaScript library file (`.jslib`) integrated into the Unity project.  
  Make sure you have:
  - `index.jslib` (containing JavaScript methods).
  - Corresponding C# scripts in your Unity project.

## Folder Structure

A typical project structure might look like this:

```
Runtime/
  AtpTmaSdk/
    AtpTmaSdk.cs
    index.jslib
Samples/
  Example/
    AtpTmaSdkActions.cs
```

## Getting Started

1. **Include the JavaScript Library:**  
   Place the `index.jslib` in `Runtime/`. Unity will automatically link this code into WebGL builds.

2. **Include the C# Wrapper Classes:**

   - `AtpTmaSdk.cs`: Contains `[DllImport]` declarations to bridge between C# and JavaScript.
   - `AtpTmaSdkActions.cs` (Sample Script): Demonstrates how to call SDK methods and subscribe to events.

3. **Add the TGMiniAppGameSDKProvider Component to the Scene:**

   - Create an empty `GameObject` in your Unity scene.
   - Attach `AtpTmaSdk.cs` to that GameObject.
   - This ensures the provider can handle callbacks and maintain event subscriptions.

4. **Configure and Use the Sample Script (AtpTmaSdkActions):**

   - Add `AtpTmaSdkActions.cs` to another GameObject.
   - In `AtpTmaSdkActions.cs`, a reference to `TGMiniAppGameSDKProvider` is obtained at runtime with `FindObjectOfType<TGMiniAppGameSDKProvider>()`.
   - Make sure `TGMiniAppGameSDKProvider` is present in the scene before `AtpTmaSdkActions` is initialized.

5. **Testing the Integration:**
   - When running the WebGL build in a compatible environment (Telegram MiniApp environment), calls to methods like `connectWallet()` or `payWithTon()` will invoke the corresponding JS functions.
   - Events such as `OnPhoneAccessReceived`, `OnWriteAccessReceived`, `OnContactReceived`, etc., will be triggered by the JS environment.

## Key Components

### TGMiniAppGameSDKProvider

- **Purpose:** Bridges C# and JavaScript calls. It uses `[DllImport("__Internal")]` to access JavaScript methods in `index.jslib`.
- **Features:**

  - Wallet management (connect, disconnect, get status, get address).
  - Payments with Ton.
  - Retrieve launch parameters, user info, start params, and raw initialization data.
  - Modify mini-app UI elements.
  - Manage orientation, confirmation dialogs, and viewport settings.
  - Share content (stories, URLs).
  - Access device features (vibration, clipboard, contacts, phone, write access).
  - Request and set emoji status.

- **Events:**  
  The provider defines events (e.g., `OnContactReceived`, `OnPhoneAccessReceived`) that are triggered by JavaScript callbacks. Subscribe to these events in your scripts to handle asynchronous responses.

### AtpTmaSdkActions (Example Script)

- **Purpose:** Serves as a practical example of how to:

  - Subscribe to events from the SDK provider.
  - Call SDK methods to control the mini-app environment.
  - Handle responses from events and integrate them into your game logic.

- **Usage:**
  - Attach it to a GameObject.
  - Set up UI buttons to call methods such as `ConnectWallet()`, `PayWithTON()`, `CloseMiniApp()`, etc.
  - Observe Unity's Console to see debug logs of the interactions and events.

## Typical Use Cases

1. **Wallet Interaction:**

   - `ConnectWallet()` to initiate a connection.
   - `CheckWalletConnection()` to verify connection status.
   - `GetWalletAddress()` to retrieve the user's wallet address.
   - `PayWithTON()` to process a Ton payment.

2. **UI and Orientation Control:**

   - `SetHeaderColor()`, `SetBackgroundColor()`, and `SetBottomBarColor()` to adapt the mini-app's UI to your game’s theme.
   - `EnableVerticalOrientation()` or `DisableVerticalOrientation()` to control layout.
   - `ShowBackButton()` or `HideBackButton()` to control navigation elements.

3. **User Information and Launch Params:**

   - `TGMiniAppGameSDKProvider.getUserInfo()` to retrieve user data and adapt the user experience accordingly.
   - `TGMiniAppGameSDKProvider.getLaunchParams()` to access initial parameters passed by the Telegram environment.

4. **Device Capabilities and Permissions:**

   - `RequestPhoneAccess()`, `RequestWriteAccess()`, `RequestContact()` to prompt permissions.
   - `OnContactReceived` event handler: Use this to populate in-game features with the user's contacts.

5. **Sharing and Links:**
   - `ShareStory()`, `ShareURL()` to integrate social features.
   - `OpenLink()` and `OpenTelegramLink()` to direct the user to external content or Telegram links.

## Troubleshooting

- **Error CS0120: "An object reference is required..."**

  - Ensure that you're accessing instance events from a proper instance of `TGMiniAppGameSDKProvider` rather than the class name.
  - For example:
    ```csharp
    TGMiniAppGameSDKProvider sdkInstance = FindObjectOfType<TGMiniAppGameSDKProvider>();
    sdkInstance.OnTextFromClipboardReceived += MyEventHandler;
    ```

- **No Response from SDK Methods:**

  - Confirm that your WebGL build is running in an environment where the JavaScript methods are properly integrated.
  - Check browser console logs for JavaScript errors.
  - Ensure that the `.jslib` file is located in `Runtime/`.

- **Events Not Triggering:**
  - Make sure your Unity object with `TGMiniAppGameSDKProvider` is active and present from the start.
  - Confirm that the JavaScript callbacks are correctly implemented in the `.jslib` file.

## Best Practices

- **Error Handling:**  
  Implement robust error handling and user feedback within event handlers.
- **Security and Privacy:**  
  When handling user data (e.g., contacts, user info), ensure you comply with privacy regulations and user consent.

- **Performance Considerations:**  
  Using `JSON.stringify` in JavaScript and `JsonUtility.FromJson` in C# can be relatively slow for large objects. Consider caching results or minimizing large data transfers.

## Conclusion

The ATP.TMA.SDK simplifies integration between Unity and the Telegram MiniApp Game environment. By following the steps outlined above and customizing the example scripts, you can easily control wallet connections, retrieve user data, manipulate UI elements, share stories, and handle various device capabilities to enrich your users’ in-app experience.

## API Reference

### Methods

#### Wallet and Payment

- **connectWallet()**  
  Initiates a wallet connection process.
- **disconnectWallet()**  
  Disconnects the currently connected wallet.
- **getWalletConnected() : bool**  
  Returns `true` if a wallet is currently connected, otherwise `false`.
- **getWalletAddress() : string**  
  Returns the currently connected wallet address as a string.
- **payWithTon(int amount, string comment)**  
  Initiates a payment using Ton cryptocurrency.
  - **Parameters:**
    - `amount`: The amount of Ton to pay.
    - `comment`: An optional message or note.

#### Application Parameters and User Info

- **getLaunchParams() : string**  
  Returns the launch parameters passed by the Telegram environment as a JSON string.
- **getUserInfo() : string**  
  Returns the user information as a JSON string. Use `TGMiniAppGameSDKProvider.GetUserInfo()` to convert it to a `TMAUser` object.
- **getStartParam() : string**  
  Returns a specific `startParam` string provided during the app launch.
- **getInitDataRaw() : string**  
  Returns raw initialization data as a string.

#### Mini-App UI Controls

- **miniAppSetHeaderColor(string color)**  
  Sets the top header bar color of the mini-app.
  - **Example:** `"#FF5733"`
- **miniAppSetBgColor(string color)**  
  Sets the background color of the mini-app.
- **miniAppSetBottomBarColor(string color)**  
  Sets the bottom bar color of the mini-app.
- **miniAppClose()**  
  Closes the mini-app.
- **miniAppIsActive**
  Gets the current mini-app status.
- **viewportExpand()**  
  Expands the viewport within the mini-app.
- **viewportRequestFullscreen()**  
  Requests fullscreen mode for the mini-app.
- **backButtonShow()**  
  Shows a back button in the mini-app interface.
- **backButtonHide()**  
  Hides the back button in the mini-app interface.
- **enableConfirmation()**  
  Enables confirmation dialogs before certain actions.
- **disableConfirmation()**  
  Disables confirmation dialogs.
- **enableVertical()**  
  Enforces vertical orientation within the mini-app.
- **disableVertical()**  
  Disables vertical orientation within the mini-app.

#### Sharing and Links

- **shareStory(string mediaUrl, string text, string widgetLinkUrl, string widgetLinkName)**  
  Shares a story that can include media content, text, and an optional widget link.
- **openTelegramLink(string link)**  
  Opens a specified Telegram link inside the mini-app environment.
- **openLink(string link, bool tryBrowser, bool tryInstantView)**  
  Opens a given link, with optional attempts to open it in a browser or use Instant View.
- **shareURL(string url, string text)**  
  Shares a URL along with accompanying text.

#### Device Capabilities and Permissions

- **requestVibration(int style)**  
  Requests a vibration action on the device (if supported). The `style` parameter may define the vibration pattern.
- **addToHomeScreen**
  Adds the mini-app to the user's home screen.
- **requestCheckHomeScreenStatus**
  Requests a check of the home screen status.
- **requestPhoneAccess()**  
  Requests the user's phone capabilities (if applicable).
- **requestWriteAccess()**  
  Requests write access permissions.
- **requestContact()**  
  Requests user contact information.
- **requestEmojiStatusAccess()**  
  Requests access to manage or view the user's emoji status.
- **requestSetEmojiStatus(string customEmojiId, int duration)**  
  Requests to set the user's emoji status for a specified duration.
  - **Parameters:**
    - `customEmojiId`: Identifier for the emoji to set.
    - `duration`: How long the emoji status should remain active, in seconds.
- **requestReadTextFromClipboard()**  
  Requests reading text content from the system clipboard.

#### Utility Functions

- **safeStringify(object obj, int space) : string**  
  Safely serializes an object to a JSON string, handling circular references.
- **str2Buffer(string str) : string**  
  Converts a C# string into a memory buffer (UTF-8) for JS/Unity interop.
- **objGet(object obj, string path, object defaultValue) : string**  
  Retrieves a nested object property by a path. Returns `defaultValue` if not found.

### Events

**All events are instance-based.** You must reference a `TGMiniAppGameSDKProvider` instance to subscribe or unsubscribe from these events.

- **OnPhoneAccessReceived**:  
  Invoked when the phone access request completes.  
  **Signature:** `event Action<string> OnPhoneAccessReceived`
- **OnWriteAccessReceived**:  
  Invoked when the write access request completes.  
  **Signature:** `event Action<string> OnWriteAccessReceived`
- **OnContactReceived**:  
  Invoked when contact information is received.  
  **Signature:** `event Action<TMARequestedContact> OnContactReceived`  
  **Note:** `TMARequestedContact` includes details like `userId`, `phoneNumber`, `firstName`, and `lastName`.
- **OnEmojiStatusAccessReceived**:  
  Invoked when the emoji status access request completes.  
  **Signature:** `event Action<string> OnEmojiStatusAccessReceived`
- **OnTextFromClipboardReceived**:  
  Invoked when text from the clipboard is successfully retrieved.  
  **Signature:** `event Action<string> OnTextFromClipboardReceived`

### Example Usage

```csharp
public class MyExample : MonoBehaviour
{
    private TGMiniAppGameSDKProvider sdkProvider;

    void Start()
    {
        sdkProvider = FindObjectOfType<TGMiniAppGameSDKProvider>();
        if (sdkProvider != null)
        {
            sdkProvider.OnContactReceived += HandleContact;
        }

        // Connect wallet
        TGMiniAppGameSDKProvider.connectWallet();

        // Get user info
        TMAUser user = TGMiniAppGameSDKProvider.GetUserInfo();
        Debug.Log("User first name: " + user.firstName);
    }

    void OnDestroy()
    {
        if (sdkProvider != null)
        {
            sdkProvider.OnContactReceived -= HandleContact;
        }
    }

    private void HandleContact(TMARequestedContact contactInfo)
    {
        Debug.Log("Received Contact: " + contactInfo.contact.firstName + " " + contactInfo.contact.lastName);
    }
}
```

### Notes

- When calling these methods from within Unity, make sure you are running in a WebGL build and the Telegram MiniApp environment is correctly set up.
- Ensure that `TGMiniAppGameSDKProvider` is present and active in the scene to handle events and callbacks.
- Non-static events require an instance of `TGMiniAppGameSDKProvider` to subscribe. Avoid using the class name directly for event handlers.
