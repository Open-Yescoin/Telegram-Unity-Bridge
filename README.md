# ATP.TMA.SDK Integration Guide

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
