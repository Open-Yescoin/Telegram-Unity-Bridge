---
outline: deep
---

# Installation

This guide will help you install the Telegram-Unity-Bridge in your Unity project.

## Prerequisites

Before installing the Telegram-Unity-Bridge, ensure you have:

- **Unity 2020.3 or newer** (LTS recommended). Unity 6.1 is fully supported.
- **WebGL build target** configured, as the SDK uses JavaScript libraries and browser-specific capabilities.
- **WebGL Template Support**: We provide a React-based WebGL template for optimized interface adaptation in the Telegram MiniApp environment. You can find the related resources in the [apps/WebGLTemplate directory](https://github.com/Open-Yescoin/Telegram-Unity-Bridge/tree/main/apps/WebGLTemplate).

## Installation Methods

### Method 1: Install via Unity Package Manager (Recommended)

This is the easiest and recommended way to install the package.

1. In the Unity Editor menu bar, select **Window > Package Manager**.
2. Click the **+** button in the top left corner and select **Add package from git URL**.
3. Enter the following Git URL:
   ```
   https://github.com/Open-Yescoin/Telegram-Unity-Bridge.git?path=/packages/YesTMABridge
   ```
4. Click **Add** and wait for the package manager to complete the installation.

The package will be automatically downloaded and integrated into your project.

### Method 2: Manual Installation

If you prefer to install manually or need more control over the installation:

1. **Include the JavaScript Library:**
   - Place the `index.jslib` file in your project's `Runtime/` directory.
   - Unity will automatically link this code into WebGL builds.

2. **Include the C# Wrapper Classes:**
   - `YesTMABridge.cs`: Contains `[DllImport]` declarations to bridge between C# and JavaScript.
   - `YesTMABridgeActions.cs` (Sample Script): Demonstrates how to call SDK methods and subscribe to events.

## Project Structure

After installation, your project structure should look like this:

```
Runtime/
  YesTMABridge/
    YesTMABridge.cs
    index.jslib
Samples/
  Example/
    YesTMABridgeActions.cs
```

## Verification

To verify the installation:

1. Open Unity and check that the package appears in the Package Manager.
2. Verify that `TGMiniAppGameSDKProvider` is available as a component (you can search for it in the Add Component menu).
3. Check that the `.jslib` file is present in the Runtime directory.

## Next Steps

Once installation is complete, proceed to the [Getting Started](/getting-started) guide to configure and use the SDK in your project.


