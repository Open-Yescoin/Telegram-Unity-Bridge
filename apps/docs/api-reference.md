---
outline: deep
---

# API Reference

Complete reference for all methods and events provided by the Telegram-Unity-Bridge.

## Methods

All methods are static and can be called directly from the `TGMiniAppGameSDKProvider` class.

### Wallet and Payment

#### `connectWallet()`

Initiates a wallet connection process.

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.connectWallet();
```

---

#### `disconnectWallet()`

Disconnects the currently connected wallet.

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.disconnectWallet();
```

---

#### `getWalletConnected() : bool`

Returns `true` if a wallet is currently connected, otherwise `false`.

**Returns:** `bool`

**Example:**
```csharp
bool isConnected = TGMiniAppGameSDKProvider.getWalletConnected();
if (isConnected)
{
    Debug.Log("Wallet is connected");
}
```

---

#### `getWalletAddress() : string`

Returns the currently connected wallet address as a string.

**Returns:** `string` - The wallet address, or empty string if no wallet is connected.

**Example:**
```csharp
string address = TGMiniAppGameSDKProvider.getWalletAddress();
Debug.Log($"Wallet address: {address}");
```

---

#### `payWithTon(string address, float amount, string comment)`

Initiates a payment using Ton cryptocurrency.

**Parameters:**
- `address` (string): The recipient TON wallet address
- `amount` (float): The amount of Ton to pay
- `comment` (string): An optional message or note

**Returns:** `void`

**Example:**
```csharp
string recipientAddress = "YOUR_TON_WALLET_ADDRESS";
float amount = 0.1f;
string comment = "Payment for services";
TGMiniAppGameSDKProvider.payWithTon(recipientAddress, amount, comment);
```

::: warning
Make sure to provide a valid recipient wallet address. Invalid addresses may cause payment failures.
:::

---

### Application Parameters and User Info

#### `getLaunchParams() : string`

Returns the launch parameters passed by the Telegram environment as a JSON string.

**Returns:** `string` - JSON string containing launch parameters

**Example:**
```csharp
string launchParams = TGMiniAppGameSDKProvider.getLaunchParams();
Debug.Log($"Launch params: {launchParams}");
```

---

#### `getUserInfo() : string`

Returns the user information as a JSON string. Use `TGMiniAppGameSDKProvider.GetUserInfo()` to convert it to a `TMAUser` object.

**Returns:** `string` - JSON string containing user information

**Example:**
```csharp
// Get as JSON string
string userInfoJson = TGMiniAppGameSDKProvider.getUserInfo();

// Get as TMAUser object (recommended)
TMAUser user = TGMiniAppGameSDKProvider.GetUserInfo();
Debug.Log($"User: {user.firstName} {user.lastName}");
```

---

#### `getStartParam() : string`

Returns a specific `startParam` string provided during the app launch.

**Returns:** `string` - The start parameter value

**Example:**
```csharp
string startParam = TGMiniAppGameSDKProvider.getStartParam();
Debug.Log($"Start param: {startParam}");
```

---

#### `getInitDataRaw() : string`

Returns raw initialization data as a string.

**Returns:** `string` - Raw initialization data

**Example:**
```csharp
string initData = TGMiniAppGameSDKProvider.getInitDataRaw();
```

---

### Mini-App UI Controls

#### `miniAppSetHeaderColor(string color)`

Sets the top header bar color of the mini-app.

**Parameters:**
- `color` (string): Color in hex format (e.g., `"#FF5733"`)

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.miniAppSetHeaderColor("#FF5733");
```

---

#### `miniAppSetBgColor(string color)`

Sets the background color of the mini-app.

**Parameters:**
- `color` (string): Color in hex format

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.miniAppSetBgColor("#FFFFFF");
```

---

#### `miniAppSetBottomBarColor(string color)`

Sets the bottom bar color of the mini-app.

**Parameters:**
- `color` (string): Color in hex format

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.miniAppSetBottomBarColor("#000000");
```

---

#### `miniAppClose()`

Closes the mini-app.

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.miniAppClose();
```

---

#### `miniAppIsActive`

Gets the current mini-app status.

**Returns:** `bool` - `true` if the mini-app is active, otherwise `false`

**Example:**
```csharp
bool isActive = TGMiniAppGameSDKProvider.miniAppIsActive;
```

---

#### `viewportExpand()`

Expands the viewport within the mini-app.

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.viewportExpand();
```

---

#### `viewportRequestFullscreen()`

Requests fullscreen mode for the mini-app.

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.viewportRequestFullscreen();
```

---

#### `backButtonShow()`

Shows a back button in the mini-app interface.

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.backButtonShow();
```

---

#### `backButtonHide()`

Hides the back button in the mini-app interface.

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.backButtonHide();
```

---

#### `enableConfirmation()`

Enables confirmation dialogs before certain actions.

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.enableConfirmation();
```

---

#### `disableConfirmation()`

Disables confirmation dialogs.

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.disableConfirmation();
```

---

#### `enableVertical()`

Enforces vertical orientation within the mini-app.

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.enableVertical();
```

---

#### `disableVertical()`

Disables vertical orientation within the mini-app.

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.disableVertical();
```

---

### Sharing and Links

#### `shareStory(string mediaUrl, string text, string widgetLinkUrl, string widgetLinkName)`

Shares a story that can include media content, text, and an optional widget link.

**Parameters:**
- `mediaUrl` (string): URL of the media to share
- `text` (string): Text content for the story
- `widgetLinkUrl` (string): Optional widget link URL
- `widgetLinkName` (string): Optional widget link name

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.shareStory(
    "https://example.com/image.jpg",
    "Check out this game!",
    "https://t.me/your_bot",
    "Play Game"
);
```

---

#### `openTelegramLink(string link)`

Opens a specified Telegram link inside the mini-app environment.

**Parameters:**
- `link` (string): Telegram link to open

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.openTelegramLink("https://t.me/your_channel");
```

---

#### `openLink(string link, bool tryBrowser, bool tryInstantView)`

Opens a given link, with optional attempts to open it in a browser or use Instant View.

**Parameters:**
- `link` (string): Link to open
- `tryBrowser` (bool): Whether to try opening in browser
- `tryInstantView` (bool): Whether to try using Instant View

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.openLink("https://example.com", true, false);
```

---

#### `shareURL(string url, string text)`

Shares a URL along with accompanying text.

**Parameters:**
- `url` (string): URL to share
- `text` (string): Accompanying text

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.shareURL("https://example.com", "Check this out!");
```

---

### Device Capabilities and Permissions

#### `requestVibration(int style)`

Requests a vibration action on the device (if supported). The `style` parameter may define the vibration pattern.

**Parameters:**
- `style` (int): Vibration pattern style

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.requestVibration(1);
```

---

#### `addToHomeScreen`

Adds the mini-app to the user's home screen.

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.addToHomeScreen();
```

---

#### `requestCheckHomeScreenStatus`

Requests a check of the home screen status.

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.requestCheckHomeScreenStatus();
```

---

#### `requestPhoneAccess()`

Requests the user's phone capabilities (if applicable).

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.requestPhoneAccess();
```

::: note
The result will be delivered via the `OnPhoneAccessReceived` event.
:::

---

#### `requestWriteAccess()`

Requests write access permissions.

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.requestWriteAccess();
```

::: note
The result will be delivered via the `OnWriteAccessReceived` event.
:::

---

#### `requestContact()`

Requests user contact information.

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.requestContact();
```

::: note
The result will be delivered via the `OnContactReceived` event.
:::

---

#### `requestEmojiStatusAccess()`

Requests access to manage or view the user's emoji status.

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.requestEmojiStatusAccess();
```

::: note
The result will be delivered via the `OnEmojiStatusAccessReceived` event.
:::

---

#### `requestSetEmojiStatus(string customEmojiId, int duration)`

Requests to set the user's emoji status for a specified duration.

**Parameters:**
- `customEmojiId` (string): Identifier for the emoji to set
- `duration` (int): How long the emoji status should remain active, in seconds

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.requestSetEmojiStatus("emoji_id_123", 3600);
```

---

#### `requestReadTextFromClipboard()`

Requests reading text content from the system clipboard.

**Returns:** `void`

**Example:**
```csharp
TGMiniAppGameSDKProvider.requestReadTextFromClipboard();
```

::: note
The result will be delivered via the `OnTextFromClipboardReceived` event.
:::

---

### Utility Functions

#### `safeStringify(object obj, int space) : string`

Safely serializes an object to a JSON string, handling circular references.

**Parameters:**
- `obj` (object): Object to stringify
- `space` (int): Number of spaces for indentation

**Returns:** `string` - JSON string representation

---

#### `str2Buffer(string str) : string`

Converts a C# string into a memory buffer (UTF-8) for JS/Unity interop.

**Parameters:**
- `str` (string): String to convert

**Returns:** `string` - Buffer representation

---

#### `objGet(object obj, string path, object defaultValue) : string`

Retrieves a nested object property by a path. Returns `defaultValue` if not found.

**Parameters:**
- `obj` (object): Object to query
- `path` (string): Property path
- `defaultValue` (object): Default value if not found

**Returns:** `string` - Property value or default

---

## Events

**All events are instance-based.** You must reference a `TGMiniAppGameSDKProvider` instance to subscribe or unsubscribe from these events.

### `OnPhoneAccessReceived`

Invoked when the phone access request completes.

**Signature:** `event Action<string> OnPhoneAccessReceived`

**Example:**
```csharp
sdkProvider.OnPhoneAccessReceived += (result) => {
    Debug.Log($"Phone access result: {result}");
};
```

---

### `OnWriteAccessReceived`

Invoked when the write access request completes.

**Signature:** `event Action<string> OnWriteAccessReceived`

**Example:**
```csharp
sdkProvider.OnWriteAccessReceived += (result) => {
    Debug.Log($"Write access result: {result}");
};
```

---

### `OnContactReceived`

Invoked when contact information is received.

**Signature:** `event Action<TMARequestedContact> OnContactReceived`

**Note:** `TMARequestedContact` includes details like `userId`, `phoneNumber`, `firstName`, and `lastName`.

**Example:**
```csharp
sdkProvider.OnContactReceived += (contact) => {
    Debug.Log($"Contact: {contact.contact.firstName} {contact.contact.lastName}");
    Debug.Log($"Phone: {contact.contact.phoneNumber}");
};
```

---

### `OnEmojiStatusAccessReceived`

Invoked when the emoji status access request completes.

**Signature:** `event Action<string> OnEmojiStatusAccessReceived`

**Example:**
```csharp
sdkProvider.OnEmojiStatusAccessReceived += (result) => {
    Debug.Log($"Emoji status access: {result}");
};
```

---

### `OnTextFromClipboardReceived`

Invoked when text from the clipboard is successfully retrieved.

**Signature:** `event Action<string> OnTextFromClipboardReceived`

**Example:**
```csharp
sdkProvider.OnTextFromClipboardReceived += (text) => {
    Debug.Log($"Clipboard text: {text}");
};
```

---

## Important Notes

::: warning
When calling these methods from within Unity, make sure you are running in a WebGL build and the Telegram MiniApp environment is correctly set up.
:::

::: tip
Ensure that `TGMiniAppGameSDKProvider` is present and active in the scene to handle events and callbacks.
:::

::: danger
Non-static events require an instance of `TGMiniAppGameSDKProvider` to subscribe. Avoid using the class name directly for event handlers.
:::


