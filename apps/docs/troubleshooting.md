---
outline: deep
---

# Troubleshooting

Common issues and solutions when working with Telegram-Unity-Bridge.

## Common Errors

### Error CS0120: "An object reference is required..."

**Problem:** You're trying to access instance events from the class name instead of an instance.

**Solution:** Always use an instance of `TGMiniAppGameSDKProvider` to subscribe to events.

**Incorrect:**
```csharp
// ❌ This will cause an error
TGMiniAppGameSDKProvider.OnContactReceived += HandleContact;
```

**Correct:**
```csharp
// ✅ Use an instance
TGMiniAppGameSDKProvider sdkInstance = FindObjectOfType<TGMiniAppGameSDKProvider>();
sdkInstance.OnContactReceived += HandleContact;
```

---

### No Response from SDK Methods

**Problem:** SDK methods are called but nothing happens.

**Possible Causes and Solutions:**

1. **WebGL Build Not Running in Telegram Environment**
   - Ensure your WebGL build is running in a Telegram MiniApp environment
   - The SDK requires the Telegram MiniApp JavaScript context to function

2. **JavaScript Errors**
   - Check the browser console (F12) for JavaScript errors
   - Verify that the `.jslib` file is properly included in your build

3. **Missing .jslib File**
   - Ensure `index.jslib` is located in `Runtime/` directory
   - Verify the file is included in the WebGL build

4. **WebGL Template Not Configured**
   - Make sure you've selected the correct WebGL template in Player Settings
   - The template should be "Telegram-Unity-Bridge"

**Debug Steps:**
```csharp
void Start()
{
    // Check if running in WebGL
    #if UNITY_WEBGL && !UNITY_EDITOR
        Debug.Log("Running in WebGL");
    #else
        Debug.LogWarning("Not running in WebGL build!");
    #endif

    // Verify SDK provider exists
    var provider = FindObjectOfType<TGMiniAppGameSDKProvider>();
    if (provider == null)
    {
        Debug.LogError("TGMiniAppGameSDKProvider not found!");
    }
}
```

---

### Events Not Triggering

**Problem:** Event handlers are subscribed but never called.

**Possible Causes and Solutions:**

1. **SDK Provider Not Active**
   - Ensure the GameObject with `TGMiniAppGameSDKProvider` is active in the scene
   - The component must be present from the start of the scene

2. **JavaScript Callbacks Not Implemented**
   - Verify that JavaScript callbacks are correctly implemented in the `.jslib` file
   - Check browser console for JavaScript errors

3. **Event Subscription Timing**
   - Subscribe to events in `Start()` or `OnEnable()`, not in `Awake()`
   - Ensure the SDK provider is initialized before subscribing

**Example Fix:**
```csharp
void Start()
{
    // Wait a frame to ensure SDK is initialized
    StartCoroutine(SubscribeAfterFrame());
}

IEnumerator SubscribeAfterFrame()
{
    yield return null; // Wait one frame
    
    sdkProvider = FindObjectOfType<TGMiniAppGameSDKProvider>();
    if (sdkProvider != null)
    {
        sdkProvider.OnContactReceived += HandleContact;
    }
}
```

---

### Wallet Connection Issues

**Problem:** Wallet connection fails or doesn't work.

**Solutions:**

1. **Check Connection Status**
   ```csharp
   bool isConnected = TGMiniAppGameSDKProvider.getWalletConnected();
   if (!isConnected)
   {
       Debug.Log("Wallet not connected. Attempting connection...");
       TGMiniAppGameSDKProvider.connectWallet();
   }
   ```

2. **Verify Address Retrieval**
   ```csharp
   string address = TGMiniAppGameSDKProvider.getWalletAddress();
   if (string.IsNullOrEmpty(address))
   {
       Debug.LogWarning("Wallet address is empty");
   }
   ```

3. **Payment Failures**
   - Ensure recipient address is valid TON wallet address
   - Verify amount is greater than 0
   - Check that wallet is connected before making payment

---

### UI Customization Not Working

**Problem:** Color changes or UI modifications don't appear.

**Solutions:**

1. **Verify Color Format**
   - Use hex format: `"#FF5733"` (with #)
   - Ensure colors are valid hex codes

2. **Check Template Configuration**
   - Verify WebGL template is correctly set
   - Rebuild the project if template was changed

3. **Timing Issues**
   - Call UI methods after the mini-app is fully loaded
   - Consider using a coroutine with a delay

```csharp
IEnumerator SetUIColors()
{
    yield return new WaitForSeconds(0.5f);
    TGMiniAppGameSDKProvider.miniAppSetHeaderColor("#FF5733");
}
```

---

### Permission Request Failures

**Problem:** Permission requests don't return results.

**Solutions:**

1. **Verify Event Subscription**
   ```csharp
   void Start()
   {
       sdkProvider = FindObjectOfType<TGMiniAppGameSDKProvider>();
       if (sdkProvider != null)
       {
           sdkProvider.OnPhoneAccessReceived += HandlePhoneAccess;
       }
   }
   ```

2. **Check Response Format**
   - Permission responses come as strings
   - Parse the response to determine if permission was granted

```csharp
private void HandlePhoneAccess(string result)
{
    Debug.Log($"Phone access response: {result}");
    // Parse result to determine success/failure
}
```

---

### Build Issues

**Problem:** WebGL build fails or doesn't include SDK files.

**Solutions:**

1. **Verify File Locations**
   - Ensure `.jslib` files are in `Runtime/` or `Plugins/` folder
   - Check that files are not excluded from build

2. **Build Settings**
   - Set build target to WebGL
   - Verify compression format is compatible

3. **Template Issues**
   - Ensure WebGL template is copied to `Assets/WebGLTemplates/`
   - Verify template name matches selection in Player Settings

---

## Performance Issues

### Slow JSON Parsing

**Problem:** `JSON.stringify` and `JsonUtility.FromJson` are slow for large objects.

**Solutions:**

1. **Cache Results**
   ```csharp
   private TMAUser cachedUser;
   
   public TMAUser GetUserInfo()
   {
       if (cachedUser == null)
       {
           cachedUser = TGMiniAppGameSDKProvider.GetUserInfo();
       }
       return cachedUser;
   }
   ```

2. **Minimize Data Transfers**
   - Only request necessary data
   - Avoid frequent large data transfers

---

## Debugging Tips

### Enable Detailed Logging

```csharp
public class SDKDebugger : MonoBehaviour
{
    private TGMiniAppGameSDKProvider sdkProvider;

    void Start()
    {
        sdkProvider = FindObjectOfType<TGMiniAppGameSDKProvider>();
        
        if (sdkProvider != null)
        {
            // Subscribe to all events for debugging
            sdkProvider.OnContactReceived += (contact) => 
                Debug.Log($"[SDK] Contact: {contact.contact.firstName}");
            
            sdkProvider.OnPhoneAccessReceived += (result) => 
                Debug.Log($"[SDK] Phone Access: {result}");
            
            // Log all method calls
            Debug.Log("[SDK] Initialized");
        }
    }
}
```

### Check Environment

```csharp
void CheckEnvironment()
{
    #if UNITY_WEBGL && !UNITY_EDITOR
        Debug.Log("Running in WebGL");
        Debug.Log($"User Agent: {Application.platform}");
    #else
        Debug.LogWarning("Not in WebGL build - SDK may not work correctly");
    #endif
}
```

---

## Getting Help

If you're still experiencing issues:

1. **Check Browser Console**
   - Open browser developer tools (F12)
   - Look for JavaScript errors or warnings

2. **Verify Setup**
   - Review [Installation Guide](/installation)
   - Check [Getting Started](/getting-started) steps

3. **Review Examples**
   - See [Examples](/examples) for working code patterns

4. **Check GitHub Issues**
   - Visit the [GitHub repository](https://github.com/Open-Yescoin/Telegram-Unity-Bridge) for known issues

---

## Best Practices to Avoid Issues

1. **Always Unsubscribe from Events**
   ```csharp
   void OnDestroy()
   {
       if (sdkProvider != null)
       {
           sdkProvider.OnContactReceived -= HandleContact;
       }
   }
   ```

2. **Null Check Before Use**
   ```csharp
   if (sdkProvider != null)
   {
       // Use SDK
   }
   ```

3. **Handle Errors Gracefully**
   ```csharp
   try
   {
       TGMiniAppGameSDKProvider.connectWallet();
   }
   catch (Exception e)
   {
       Debug.LogError($"Error: {e.Message}");
   }
   ```

4. **Verify WebGL Build**
   - Always test in actual WebGL build, not just editor
   - Test in Telegram MiniApp environment when possible


