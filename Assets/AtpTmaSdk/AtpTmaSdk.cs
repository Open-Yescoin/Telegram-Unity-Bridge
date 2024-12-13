using System;
using System.Runtime.InteropServices;
using UnityEngine;

namespace ATP.TMA.SDK
{

    [Serializable]
    public class TMARequestedContact
    {
        public Contact contact;
        public string authDate; // 使用字符串来处理日期
        public string hash;

        [Serializable]
        public class Contact
        {
            public int userId;
            public string phoneNumber;
            public string firstName;
            public string lastName;
        }
    }

    [Serializable]
    public class TMAUser
    {
        public bool? addedToAttachmentMenu;
        public bool? allowsWriteToPm;
        public string firstName;
        public int id;
        public bool? isBot;
        public bool? isPremium;
        public string lastName;
        public string languageCode;
        public string photoUrl;
        public string username;

        public override string ToString()
        {
            return $"ID: {id}, First Name: {firstName}, Last Name: {lastName}, Username: {username}, " +
                   $"Is Bot: {isBot}, Is Premium: {isPremium}, Allows PM: {allowsWriteToPm}, " +
                   $"Added to Menu: {addedToAttachmentMenu}, Language Code: {languageCode}, Photo URL: {photoUrl}";
        }
    }

    public class TGMiniAppGameSDKProvider : MonoBehaviour
    {
        [DllImport("__Internal")]
        public static extern string safeStringify(object obj, int space);

        [DllImport("__Internal")]
        public static extern string str2Buffer(string str);

        [DllImport("__Internal")]
        public static extern string objGet(object obj, string path, object defaultValue);

        [DllImport("__Internal")]
        public static extern void connectWallet();

        [DllImport("__Internal")]
        public static extern void disconnectWallet();

        [DllImport("__Internal")]
        public static extern bool getWalletConnected();

        [DllImport("__Internal")]
        public static extern string getWalletAddress();

        [DllImport("__Internal")]
        public static extern void payWithTon(int amount, string comment);

        [DllImport("__Internal")]
        public static extern string getLaunchParams();

        [DllImport("__Internal")]
        public static extern string getUserInfo();

        [DllImport("__Internal")]
        public static extern string getStartParam();

        [DllImport("__Internal")]
        public static extern string getInitDataRaw();

        [DllImport("__Internal")]
        public static extern void miniAppSetHeaderColor(string color);

        [DllImport("__Internal")]
        public static extern void miniAppSetBgColor(string color);

        [DllImport("__Internal")]
        public static extern void miniAppSetBottomBarColor(string color);

        [DllImport("__Internal")]
        public static extern void miniAppClose();

        [DllImport("__Internal")]
        public static extern void viewportExpand();

        [DllImport("__Internal")]
        public static extern void viewportRequestFullscreen();

        [DllImport("__Internal")]
        public static extern void backButtonShow();

        [DllImport("__Internal")]
        public static extern void backButtonHide();

        [DllImport("__Internal")]
        public static extern void enableConfirmation();

        [DllImport("__Internal")]
        public static extern void disableConfirmation();

        [DllImport("__Internal")]
        public static extern void enableVertical();

        [DllImport("__Internal")]
        public static extern void disableVertical();

        [DllImport("__Internal")]
        public static extern void shareStory(string mediaUrl, string text, string widgetLinkUrl, string widgetLinkName);

        [DllImport("__Internal")]
        public static extern void openTelegramLink(string link);

        [DllImport("__Internal")]
        public static extern void openLink(string link, bool tryBrowser, bool tryInstantView);

        [DllImport("__Internal")]
        public static extern void shareURL(string url, string text);

        [DllImport("__Internal")]
        public static extern void requestVibration(int style);

        [DllImport("__Internal")]
        public static extern void requestPhoneAccess();

        [DllImport("__Internal")]
        public static extern void requestWriteAccess();

        [DllImport("__Internal")]
        public static extern void requestContact();

        [DllImport("__Internal")]
        public static extern void requestEmojiStatusAccess();

        [DllImport("__Internal")]
        public static extern void requestSetEmojiStatus(string customEmojiId, int duration);

        [DllImport("__Internal")]
        public static extern void requestReadTextFromClipboard();

        public static ATP.TMA.SDK.TMAUser GetUserInfo()
        {
            string json = getUserInfo();
            return JsonUtility.FromJson<ATP.TMA.SDK.TMAUser>(json);
        }

        public event Action<string> OnPhoneAccessReceived;

        public event Action<string> OnWriteAccessReceived;

        public event Action<ATP.TMA.SDK.TMARequestedContact> OnContactReceived;

        public event Action<string> OnEmojiStatusAccessReceived;

        public event Action<string> OnTextFromClipboardReceived;


        // Callbacks to receive messages from JavaScript
        public void OnRequestPhoneAccess(string status)
        {
            Debug.Log("Phone Access Status: " + status);
            OnPhoneAccessReceived?.Invoke(status);
        }

        public void OnRequestWriteAccess(string status)
        {
            Debug.Log("Write Access Status: " + status);
            OnWriteAccessReceived?.Invoke(status);
        }

        public void OnRequestContact(string contactInfoJson)
        {
            // print the contact info
            ATP.TMA.SDK.TMARequestedContact requestedContact = JsonUtility.FromJson<ATP.TMA.SDK.TMARequestedContact>(contactInfoJson);
            Debug.Log("User ID: " + requestedContact.contact.userId);
            Debug.Log("Phone Number: " + requestedContact.contact.phoneNumber);
            Debug.Log("First Name: " + requestedContact.contact.firstName);
            Debug.Log("Last Name: " + requestedContact.contact.lastName);
            Debug.Log("Auth Date: " + requestedContact.authDate);
            Debug.Log("Hash: " + requestedContact.hash);
            OnContactReceived?.Invoke(requestedContact);
        }

        public void OnRequestEmojiStatusAccess(string status)
        {
            Debug.Log("Emoji Status Access: " + status);
            OnEmojiStatusAccessReceived?.Invoke(status);
        }

        public void OnReadTextFromClipboard(string text)
        {
            Debug.Log("Text from Clipboard: " + text);
            OnTextFromClipboardReceived?.Invoke(text);
        }


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
