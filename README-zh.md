<div align="center">

# ATP.TMA.SDK 集成指南

<a href="https://github.com/Siykt/atp.tma.sdk/blob/main/README.md">Documents</a>
·
<a href="https://github.com/Siykt/atp.tma.sdk/blob/main/README-zh.md">中文 README</a>

</div>

本 README 将为您介绍 **ATP.TMA.SDK**，包括如何在 Unity 中设置并使用所提供的 C# 类与示例脚本，以便与 Telegram MiniApp 游戏 SDK 环境进行集成。

## 概览

ATP.TMA.SDK 旨在简化 Unity 应用与 Telegram MiniApp 游戏环境之间的通信。通过在 C# 中使用 `[DllImport("__Internal")]` 来绑定定义在 jslib 文件中的各种 JavaScript 函数，这些函数可让 Unity 开发者：

- 管理钱包连接与支付流程。
- 获取启动参数、用户信息以及初始化数据。
- 控制 MiniApp 的用户界面（如标题栏颜色、背景、底栏颜色等）。
- 请求设备功能（例如：电话访问权限、写入权限、联系人信息）。
- 与 Telegram 环境交互（分享动态、打开链接、请求震动、设置表情符号状态等）。

## 先决条件

- Unity 2020.3 及以上版本（建议使用 LTS 版本）。
- 需要将目标平台设置为 WebGL，因为 SDK 利用 JavaScript 库和特定于浏览器的能力。
- 将 JavaScript 库文件（`.jslib`）集成到 Unity 项目中。  
  请确保您已包含：
  - `index.jslib`（包含 JavaScript 方法）。
  - 与其对应的 C# 脚本。

## 文件夹结构

典型项目结构示例：

```
Runtime/
  AtpTmaSdk/
    AtpTmaSdk.cs
    index.jslib
Samples/
  Example/
    AtpTmaSdkActions.cs
```

## 快速开始

1. **引入 JavaScript 库：**  
   将 `index.jslib` 放置在 `Runtime/` 文件夹下。Unity 会在 WebGL 构建时自动关联该文件。

2. **引入 C# 封装类：**

   - `AtpTmaSdk.cs`：包含 `[DllImport]` 声明，用于在 C# 与 JavaScript 间建立桥梁。
   - `AtpTmaSdkActions.cs`（示例脚本）：展示如何调用 SDK 方法并订阅相关事件。

3. **在场景中添加 TGMiniAppGameSDKProvider 组件：**

   - 在 Unity 场景中创建一个空的 `GameObject`。
   - 将 `AtpTmaSdk.cs` 附加到该 GameObject 上。
   - 这样可确保提供者（provider）处理回调并维护事件订阅。

4. **配置并使用示例脚本（AtpTmaSdkActions）：**

   - 将 `AtpTmaSdkActions.cs` 附加到另一个 GameObject 上。
   - 在 `AtpTmaSdkActions.cs` 中，会通过 `FindObjectOfType<TGMiniAppGameSDKProvider>()` 在运行时获取 `TGMiniAppGameSDKProvider` 引用。
   - 确保在 `AtpTmaSdkActions` 初始化前，场景中已存在 `TGMiniAppGameSDKProvider`。

5. **测试集成效果：**
   - 当在兼容的环境（Telegram MiniApp 环境）中运行 WebGL 构建时，像 `connectWallet()` 或 `payWithTon()` 这类调用会触发相应的 JS 函数。
   - 类似 `OnPhoneAccessReceived`、`OnWriteAccessReceived`、`OnContactReceived` 等事件会由 JS 环境触发并在 C# 中得到响应。

## 关键组件

### TGMiniAppGameSDKProvider

- **作用：**  
  C# 与 JavaScript 调用间的桥梁。通过 `[DllImport("__Internal")]` 访问 `index.jslib` 中的 JS 方法。
- **特性：**

  - 钱包管理（连接、断开、获取状态、获取地址）。
  - Ton 支付处理。
  - 获取启动参数、用户信息、启动参数（start params）和原始初始化数据。
  - 修改 MiniApp UI 元素（头部、背景、底栏颜色等）。
  - 管理屏幕方向、确认对话框、视口等。
  - 分享内容（故事、URL）、访问设备功能（震动、剪贴板、联系人、电话、写入权限）。
  - 请求和设置表情状态。

- **事件：**  
  提供者定义了一些事件（例如 `OnContactReceived`、`OnPhoneAccessReceived`），由 JavaScript 回调触发。可在您的脚本中订阅这些事件，处理异步响应。

### AtpTmaSdkActions（示例脚本）

- **作用：**
  提供实际示例，展示如何：

  - 订阅来自 SDK 提供者的事件。
  - 调用 SDK 方法控制 MiniApp 环境。
  - 处理事件响应，并将结果整合到您的游戏逻辑中。

- **使用方法：**
  - 将脚本挂载到某个 GameObject 上。
  - 使用 UI 按钮触发诸如 `ConnectWallet()`、`PayWithTON()`、`CloseMiniApp()` 等方法的调用。
  - 在 Unity 控制台观察交互和事件的调试日志。

## 常见使用场景

1. **钱包交互：**

   - `ConnectWallet()` 启动钱包连接流程。
   - `CheckWalletConnection()` 检查当前钱包连接状态。
   - `GetWalletAddress()` 获取用户钱包地址。
   - `PayWithTON()` 使用 Ton 进行支付。

2. **UI 与屏幕方向控制：**

   - `SetHeaderColor()`、`SetBackgroundColor()`、`SetBottomBarColor()` 根据游戏主题调整 MiniApp UI。
   - `EnableVerticalOrientation()` 或 `DisableVerticalOrientation()` 控制屏幕布局方向。
   - `ShowBackButton()` 或 `HideBackButton()` 控制返回按钮的显示与隐藏。

3. **用户信息与启动参数：**

   - `TGMiniAppGameSDKProvider.getUserInfo()` 获取用户数据，以便根据用户特征定制体验。
   - `TGMiniAppGameSDKProvider.getLaunchParams()` 获取 Telegram 环境传入的初始参数。

4. **设备功能与权限请求：**

   - `RequestPhoneAccess()`、`RequestWriteAccess()`、`RequestContact()` 请求相应权限。
   - 在 `OnContactReceived` 事件处理程序中使用获取的联系人信息为游戏内功能提供支持。

5. **分享与链接：**
   - `ShareStory()`、`ShareURL()` 以实现社交分享功能。
   - `OpenLink()` 和 `OpenTelegramLink()` 在 MiniApp 中打开外部内容或 Telegram 链接。

## 疑难解答

- **Error CS0120：“需要对象引用...”：**  
  确保您在访问事件时使用 `TGMiniAppGameSDKProvider` 的实例，而不是类名本身。  
  例如：

  ```csharp
  TGMiniAppGameSDKProvider sdkInstance = FindObjectOfType<TGMiniAppGameSDKProvider>();
  sdkInstance.OnTextFromClipboardReceived += MyEventHandler;
  ```

- **SDK 方法无响应：**

  - 确认您的 WebGL 构建在正确的环境中运行（JavaScript 方法已正确集成）。
  - 检查浏览器控制台日志是否有 JS 报错。
  - 确保 `.jslib` 文件位于 `Runtime/` 下。

- **事件未触发：**
  - 确保包含 `TGMiniAppGameSDKProvider` 的 Unity 对象在运行时处于激活状态。
  - 检查 `.jslib` 文件中的 JS 回调是否正确实现。

## 最佳实践

- **错误处理：**  
  在事件处理程序中实现健壮的错误处理和用户反馈。

- **安全与隐私：**  
  使用用户数据（如联系人、用户信息）时，确保遵守隐私法规并获得用户同意。

- **性能考虑：**  
  使用 `JSON.stringify` 与 `JsonUtility.FromJson` 对于大型对象可能较慢。可考虑缓存结果或减少大型数据传输。

## 结论

通过 ATP.TMA.SDK，您可以轻松实现 Unity 与 Telegram MiniApp 游戏环境之间的集成。按上述步骤操作，并基于示例脚本进行定制，您即可轻松实现钱包连接、获取用户数据、操控 UI、分享动态、调用设备功能，从而为用户带来更丰富的应用内体验。

## API 参考

### 方法

#### 钱包与支付

- **connectWallet()**  
  启动钱包连接过程。

- **disconnectWallet()**  
  断开当前已连接的钱包。

- **getWalletConnected() : bool**  
  若当前已连接钱包返回 `true`，否则为 `false`。

- **getWalletAddress() : string**  
  返回当前已连接钱包的地址。

- **payWithTon(int amount, string comment)**  
  启动使用 Ton 加密货币的支付流程。
  - **参数：**
    - `amount`：支付 Ton 的数量。
    - `comment`：可选备注信息。

#### 应用参数与用户信息

- **getLaunchParams() : string**  
  以 JSON 字符串形式返回 Telegram 环境传递的启动参数。

- **getUserInfo() : string**  
  以 JSON 字符串形式返回用户信息。可使用 `TGMiniAppGameSDKProvider.GetUserInfo()` 将其转换为 `TMAUser` 对象。

- **getStartParam() : string**  
  返回启动应用时传入的特定 `startParam` 字符串。

- **getInitDataRaw() : string**  
  返回原始的初始化数据字符串。

#### MiniApp UI 控制

- **miniAppSetHeaderColor(string color)**  
  设置 MiniApp 顶部标题栏颜色。

  - **示例:** `"#FF5733"`

- **miniAppSetBgColor(string color)**  
  设置 MiniApp 背景颜色。

- **miniAppSetBottomBarColor(string color)**  
  设置 MiniApp 底栏颜色。

- **miniAppClose()**  
  关闭 MiniApp 。

- **miniAppIsActive**  
  获取 MiniApp 当前状态。

- **viewportExpand()**  
  扩展 MiniApp 的视口。

- **viewportRequestFullscreen()**  
  请求 MiniApp 全屏显示。

- **backButtonShow()**  
  显示 MiniApp 中的返回按钮。

- **backButtonHide()**  
  隐藏 MiniApp 中的返回按钮。

- **enableConfirmation()**  
  启用在某些操作前的确认对话框。

- **disableConfirmation()**  
  禁用确认对话框。

- **enableVertical()**  
  启用竖屏方向强制。

- **disableVertical()**  
  禁用竖屏方向强制。

#### 分享与链接

- **shareStory(string mediaUrl, string text, string widgetLinkUrl, string widgetLinkName)**  
  分享包含媒体内容、文字及可选小部件链接的动态。

- **openTelegramLink(string link)**  
  在 MiniApp 环境中打开指定的 Telegram 链接。

- **openLink(string link, bool tryBrowser, bool tryInstantView)**  
  打开指定链接，可选尝试在浏览器或 Instant View 中打开。

- **shareURL(string url, string text)**  
  分享指定 URL 及相应文本。

#### 设备功能与权限

- **requestVibration(int style)**  
  请求设备震动（若设备支持）。`style` 参数可能用于定义震动模式。

- **addToHomeScreen**  
  将 MiniApp 添加到用户的主屏幕。

- **requestCheckHomeScreenStatus**  
  请求检查主屏幕状态。

- **requestPhoneAccess()**  
  请求访问用户电话功能（如适用）。

- **requestWriteAccess()**  
  请求写入权限。

- **requestContact()**  
  请求用户的联系人信息。

- **requestEmojiStatusAccess()**  
  请求访问或管理用户的表情状态。

- **requestSetEmojiStatus(string customEmojiId, int duration)**  
  请求在指定时长内设置用户的表情状态。

  - **参数：**
    - `customEmojiId`：要设置的表情符号 ID。
    - `duration`：表情状态应保持活跃的时间（秒）。

- **requestReadTextFromClipboard()**  
  请求从系统剪贴板读取文本内容。

#### 工具函数

- **safeStringify(object obj, int space) : string**  
  安全地将对象序列化为 JSON 字符串，处理循环引用问题。

- **str2Buffer(string str) : string**  
  将 C# 字符串转换为供 JS/Unity 交互使用的内存缓冲（UTF-8）。

- **objGet(object obj, string path, object defaultValue) : string**  
  按路径检索嵌套对象属性。如未找到则返回 `defaultValue`。

### 事件

**所有事件均基于实例。** 您需要引用 `TGMiniAppGameSDKProvider` 的实例来订阅或取消订阅事件。

- **OnPhoneAccessReceived**：  
  当电话访问请求完成时触发。  
  **签名：** `event Action<string> OnPhoneAccessReceived`

- **OnWriteAccessReceived**：  
  当写入权限请求完成时触发。  
  **签名：** `event Action<string> OnWriteAccessReceived`

- **OnContactReceived**：  
  当收到联系人信息时触发。  
  **签名：** `event Action<TMARequestedContact> OnContactReceived`  
  **说明：** `TMARequestedContact` 包含 `userId`、`phoneNumber`、`firstName`、`lastName` 等详细信息。

- **OnEmojiStatusAccessReceived**：  
  当表情状态访问请求完成时触发。  
  **签名：** `event Action<string> OnEmojiStatusAccessReceived`

- **OnTextFromClipboardReceived**：  
  当成功从剪贴板获取文本时触发。  
  **签名：** `event Action<string> OnTextFromClipboardReceived`

### 示例用法

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

        // 连接钱包
        TGMiniAppGameSDKProvider.connectWallet();

        // 获取用户信息
        TMAUser user = TGMiniAppGameSDKProvider.GetUserInfo();
        Debug.Log("用户的名字: " + user.firstName);
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
        Debug.Log("获取到联系人信息: " + contactInfo.contact.firstName + " " + contactInfo.contact.lastName);
    }
}
```

### 备注

- 在 Unity 中调用这些方法时，请确保在 WebGL 构建中运行，并且已正确设置 Telegram MiniApp 环境。
- 确保 `TGMiniAppGameSDKProvider` 存在且在场景中处于激活状态，以处理事件和回调。
- 非静态事件需要 `TGMiniAppGameSDKProvider` 的实例进行订阅。不要直接使用类名订阅事件。
