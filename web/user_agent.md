
## User Agent

- A user agent is a computer program representing a person.  A user agent could be a bot scraping webpages, a download manager, or another app accessing the Web.
-  browsers include a self-identifying User-Agent HTTP header called a user agent (UA) string.


## User Agent Request Header

The user agent request header is a string that identifies the application, os, vendor and version of the requesting user agent.

### Common Web Format

```
User-Agent: Mozilla/5.0 (<system-information>) <platform> (<platform-details>) <extensions>
```

### Examples

**Firefox UA String**
```
Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion

```
1. `Mozilla/5.0` is the general token that says that the browser is Mozilla-compatible. For historical reasons, almost every browser today sends it, since it was used to indicate compatibility with the Mozilla rendering engine - one of the first widespread browsers.
2. Platform = Windows/Mac/Andoid/Mobile
3. rv:geckoversion indicates the release version of Gecko (such as "17.0"). In recent browsers, geckoversion is the same as firefoxversion.
   1. Gecko = rendering enging for Firefox.
4. Gecko/geckotrail indicates that the browser is based on Gecko. (On the desktop, geckotrail is always the fixed string 20100101.)
5. Firefox/firefoxversion indicates that the browser is Firefox and provides the version (such as "17.0").

**What is this?**
```
Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36
```
- `Mozilla/5.0` can be ignored. 
- `Linux; Android 12 `tells us details about the operating system. In this case, the device is running the Android operating system, which is based on Linux.
- `Pixel 6` tells us the device.
- `AppleWebKit/537.36` indicates what browser rendering engine is used. A rendering engine is what transforms HTML into an interactive webpage on the user’s screen. The WebKit browser engine was developed by Apple and is primarily used by Safari, Chromium, and all other WebKit-based browsers.
  - Introduced in 2003 when safari was released to give the new browser the same experience as popular browsers. 
- `(KHTML, like Gecko)`. This section of the string doesn’t necessarily provide more detail on the device but ensures compatibility for historical reasons.
- `Chrome/93.0.4577.62 Mobile Safari/537.36` has more detail on the browser and its version number.

### Summary

- UA strings had junk in them to convince user agent sniggers that they are something else, and for compatability reasons.
- Helps new browsers get latest and greatest version of websites by doing this `PopularBrowser (actually VeryNewBrowser)`.

### Resources

* User Agent Decoder: https://51degrees.com/developers/user-agent-tester?headers=Dalvik%2F2.1.0+(Linux%3B+U%3B+Android+9.0%3B+ZTE+BA520+Build%2FMRA58K)
* https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent
* https://51degrees.com/blog/understanding-user-agent-string#:~:text=AppleWebKit%2F537.36%20indicates%20what%20browser,(KHTML%2C%20like%20Gecko).
* https://humanwhocodes.com/blog/2010/01/12/history-of-the-user-agent-string/