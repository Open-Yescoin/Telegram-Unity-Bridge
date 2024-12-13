using System;
using System.Runtime.InteropServices;
using UnityEngine;

namespace TMAGameSDK
{
    /// <summary>
    /// Represents requested contact data retrieved from the Telegram MiniApp Game SDK.
    /// </summary>
    [Serializable]
    public class TMARequestedContact
    {
        /// <summary>
        /// The contact data.
        /// </summary>
        public Contact contact;

        /// <summary>
        /// The authorization date in string form.
        /// </summary>
        public string authDate;

        /// <summary>
        /// A hash for contact verification.
        /// </summary>
        public string hash;

        [Serializable]
        public class Contact
        {
            /// <summary>
            /// The user's unique identifier.
            /// </summary>
            public int userId;

            /// <summary>
            /// The user's phone number.
            /// </summary>
            public string phoneNumber;

            /// <summary>
            /// The user's first name.
            /// </summary>
            public string firstName;

            /// <summary>
            /// The user's last name.
            /// </summary>
            public string lastName;
        }
    }

    /// <summary>
    /// Represents user information retrieved from the Telegram MiniApp Game SDK.
    /// </summary>
    [Serializable]
    public class TMAUser
    {
        /// <summary>
        /// Indicates if the user was added to an attachment menu.
        /// </summary>
        public bool? addedToAttachmentMenu;

        /// <summary>
        /// Indicates if direct message writing is allowed to the user.
        /// </summary>
        public bool? allowsWriteToPm;

        /// <summary>
        /// The user's first name.
        /// </summary>
        public string firstName;

        /// <summary>
        /// The user's unique identifier.
        /// </summary>
        public int id;

        /// <summary>
        /// Indicates if the user is a bot.
        /// </summary>
        public bool? isBot;

        /// <summary>
        /// Indicates if the user is a premium user.
        /// </summary>
        public bool? isPremium;

        /// <summary>
        /// The user's last name.
        /// </summary>
        public string lastName;

        /// <summary>
        /// The user's language code.
        /// </summary>
        public string languageCode;

        /// <summary>
        /// The URL to the user's profile photo.
        /// </summary>
        public string photoUrl;

        /// <summary>
        /// The user's username.
        /// </summary>
        public string username;

        public override string ToString()
        {
            return $"ID: {id}, First Name: {firstName}, Last Name: {lastName}, Username: {username}, " +
                   $"Is Bot: {isBot}, Is Premium: {isPremium}, Allows PM: {allowsWriteToPm}, " +
                   $"Added to Menu: {addedToAttachmentMenu}, Language Code: {languageCode}, Photo URL: {photoUrl}";
        }
    }

    /// <summary>
    /// Provides access to the Telegram MiniApp Game SDK methods from C#.
    /// These methods are exposed via DllImport from JavaScript functions defined in jslib files.
    /// </summary>
    public class TGMiniAppGameSDKProvider : MonoBehaviour
    {
        /// <summary>
        /// Safely converts an object to a JSON string (supports circular structures).
        /// </summary>
        [DllImport("__Internal")]
        public static extern string safeStringify(object obj, int space);

        /// <summary>
        /// Converts a C# string to a buffer (UTF-8) for use with the JS/Unity bridge.
        /// </summary>
        [DllImport("__Internal")]
        public static extern string str2Buffer(string str);

        /// <summary>
        /// Retrieves a nested object property by path, returning a default if not found.
        /// </summary>
        [DllImport("__Internal")]
        public static extern string objGet(object obj, string path, object defaultValue);

        /// <summary>
        /// Initiates a wallet connection.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void connectWallet();

        /// <summary>
        /// Disconnects the currently connected wallet.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void disconnectWallet();

        /// <summary>
        /// Checks if the wallet is currently connected.
        /// </summary>
        [DllImport("__Internal")]
        public static extern bool getWalletConnected();

        /// <summary>
        /// Retrieves the currently connected wallet address.
        /// </summary>
        [DllImport("__Internal")]
        public static extern string getWalletAddress();

        /// <summary>
        /// Initiates a payment using Ton cryptocurrency.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void payWithTon(int amount, string comment);

        /// <summary>
        /// Retrieves the launch parameters of the application.
        /// </summary>
        [DllImport("__Internal")]
        public static extern string getLaunchParams();

        /// <summary>
        /// Retrieves user information from the launch parameters.
        /// </summary>
        [DllImport("__Internal")]
        public static extern string getUserInfo();

        /// <summary>
        /// Retrieves the "startParam" from the launch parameters.
        /// </summary>
        [DllImport("__Internal")]
        public static extern string getStartParam();

        /// <summary>
        /// Retrieves the raw initialization data from the launch parameters.
        /// </summary>
        [DllImport("__Internal")]
        public static extern string getInitDataRaw();

        /// <summary>
        /// Sets the mini-app's header color.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void miniAppSetHeaderColor(string color);

        /// <summary>
        /// Sets the mini-app's background color.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void miniAppSetBgColor(string color);

        /// <summary>
        /// Sets the mini-app's bottom bar color.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void miniAppSetBottomBarColor(string color);

        /// <summary>
        /// Closes the mini-app.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void miniAppClose();

        /// <summary>
        /// Expands the viewport within the mini-app.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void viewportExpand();

        /// <summary>
        /// Requests fullscreen mode within the viewport.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void viewportRequestFullscreen();

        /// <summary>
        /// Shows the back button in the mini-app interface.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void backButtonShow();

        /// <summary>
        /// Hides the back button in the mini-app interface.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void backButtonHide();

        /// <summary>
        /// Enables a confirmation dialog or mechanism before certain actions.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void enableConfirmation();

        /// <summary>
        /// Disables the confirmation dialog or mechanism.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void disableConfirmation();

        /// <summary>
        /// Enables vertical orientation or layout within the mini-app.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void enableVertical();

        /// <summary>
        /// Disables vertical orientation or layout within the mini-app.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void disableVertical();

        /// <summary>
        /// Shares a story with specified media and text.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void shareStory(string mediaUrl, string text, string widgetLinkUrl, string widgetLinkName);

        /// <summary>
        /// Opens a Telegram link within the mini-app.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void openTelegramLink(string link);

        /// <summary>
        /// Opens a given link, optionally in a browser or Instant View.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void openLink(string link, bool tryBrowser, bool tryInstantView);

        /// <summary>
        /// Shares a URL along with accompanying text.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void shareURL(string url, string text);

        /// <summary>
        /// Requests a device vibration, if supported.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void requestVibration(int style);

        /// <summary>
        /// Requests access to the user's phone capabilities.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void requestPhoneAccess();

        /// <summary>
        /// Requests write access permissions.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void requestWriteAccess();

        /// <summary>
        /// Requests access to the user's contact information.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void requestContact();

        /// <summary>
        /// Requests access to manage or read the user's emoji status.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void requestEmojiStatusAccess();

        /// <summary>
        /// Requests setting the user's emoji status for a specified duration.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void requestSetEmojiStatus(string customEmojiId, int duration);

        /// <summary>
        /// Requests reading text from the system clipboard.
        /// </summary>
        [DllImport("__Internal")]
        public static extern void requestReadTextFromClipboard();

        /// <summary>
        /// Converts retrieved user info JSON into a TMAUser object.
        /// </summary>
        /// <returns>A TMAUser object populated from the user info JSON.</returns>
        public static TMAGameSDK.TMAUser GetUserInfo()
        {
            string json = getUserInfo();
            return JsonUtility.FromJson<TMAGameSDK.TMAUser>(json);
        }

        /// <summary>
        /// Event triggered when phone access request completes.
        /// </summary>
        public event Action<string> OnPhoneAccessReceived;

        /// <summary>
        /// Event triggered when write access request completes.
        /// </summary>
        public event Action<string> OnWriteAccessReceived;

        /// <summary>
        /// Event triggered when contact information is received.
        /// </summary>
        public event Action<TMAGameSDK.TMARequestedContact> OnContactReceived;

        /// <summary>
        /// Event triggered when emoji status access request completes.
        /// </summary>
        public event Action<string> OnEmojiStatusAccessReceived;

        /// <summary>
        /// Event triggered when clipboard text is read successfully.
        /// </summary>
        public event Action<string> OnTextFromClipboardReceived;


        /// <summary>
        /// Callback invoked by JavaScript to report phone access status.
        /// </summary>
        public void OnRequestPhoneAccess(string status)
        {
            Debug.Log("Phone Access Status: " + status);
            OnPhoneAccessReceived?.Invoke(status);
        }

        /// <summary>
        /// Callback invoked by JavaScript to report write access status.
        /// </summary>
        public void OnRequestWriteAccess(string status)
        {
            Debug.Log("Write Access Status: " + status);
            OnWriteAccessReceived?.Invoke(status);
        }

        /// <summary>
        /// Callback invoked by JavaScript to provide requested contact information.
        /// Parses the JSON into a TMARequestedContact object.
        /// </summary>
        public void OnRequestContact(string contactInfoJson)
        {
            // Parse the JSON string into a TMARequestedContact object
            TMAGameSDK.TMARequestedContact requestedContact = JsonUtility.FromJson<TMAGameSDK.TMARequestedContact>(contactInfoJson);
            Debug.Log("User ID: " + requestedContact.contact.userId);
            Debug.Log("Phone Number: " + requestedContact.contact.phoneNumber);
            Debug.Log("First Name: " + requestedContact.contact.firstName);
            Debug.Log("Last Name: " + requestedContact.contact.lastName);
            Debug.Log("Auth Date: " + requestedContact.authDate);
            Debug.Log("Hash: " + requestedContact.hash);
            OnContactReceived?.Invoke(requestedContact);
        }

        /// <summary>
        /// Callback invoked by JavaScript to report emoji status access results.
        /// </summary>
        public void OnRequestEmojiStatusAccess(string status)
        {
            Debug.Log("Emoji Status Access: " + status);
            OnEmojiStatusAccessReceived?.Invoke(status);
        }

        /// <summary>
        /// Callback invoked by JavaScript when text is read from the clipboard.
        /// </summary>
        public void OnReadTextFromClipboard(string text)
        {
            Debug.Log("Text from Clipboard: " + text);
            OnTextFromClipboardReceived?.Invoke(text);
        }


        /// <summary>
        /// A Unity runtime method, called before the scene loads, for initialization/logging.
        /// </summary>
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
        static void OnBeforeSceneLoadRuntimeMethod()
        {
            Debug.Log("Initializing TGMiniAppGameSDKProvider");
            Debug.Log("User Info: " + getUserInfo());
            Debug.Log("Launch Params: " + getLaunchParams());
            Debug.Log("Start Param: " + getStartParam());
            Debug.Log("Init Data Raw: " + getInitDataRaw());

            var userinfo = GetUserInfo();
            Debug.Log("User Info name:" + userinfo.firstName + " " + userinfo.lastName);
            Debug.Log("User Info username:" + userinfo.username);
            Debug.Log("User Info isBot:" + userinfo.isBot);
            Debug.Log("User Info isPremium:" + userinfo.isPremium);
            Debug.Log("User Info allowsWriteToPm:" + userinfo.allowsWriteToPm);
            Debug.Log("User Info addedToAttachmentMenu:" + userinfo.addedToAttachmentMenu);
            Debug.Log("User Info languageCode:" + userinfo.languageCode);
            Debug.Log("User Info photoUrl:" + userinfo.photoUrl);
        }
    }
}
