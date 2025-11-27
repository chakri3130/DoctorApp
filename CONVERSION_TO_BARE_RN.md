# Expo to Bare React Native Conversion

## Conversion Completed ✅

Your DoctorApp has been successfully converted from Expo to a bare React Native project.

### Changes Made

1. **Generated Native Directories**
   - `ios/` — Native iOS project with Xcode workspace
   - `android/` — Native Android project with Gradle build system

2. **Updated Dependencies**
   - Added `react-native-webrtc` (required by `@jitsi/react-native-sdk`)
   - Installed all native dependencies via CocoaPods for iOS
   - Gradle will auto-install Android dependencies on first build

3. **Updated npm Scripts** (`package.json`)
   ```json
   {
     "start": "react-native start",
     "android": "react-native run-android",
     "ios": "react-native run-ios",
     "build:ios": "cd ios && xcodebuild -workspace DoctorApp.xcworkspace -scheme DoctorApp -configuration Release -derivedDataPath build",
     "build:android": "cd android && ./gradlew assembleRelease"
   }
   ```

### What's New

- **Native Build System**: Xcode (iOS) and Android Studio/Gradle (Android)
- **Direct File Access**: You now have full control over native code in `ios/` and `android/` directories
- **CocoaPods Installed**: iOS dependencies managed via `Podfile` (already installed via `pod install`)
- **Backup Branch**: Your original Expo setup is saved in the `backup/expo-to-bare` git branch

### Running the App

#### Development Mode

**iOS (Simulator/Device)**
```bash
npm start              # Start Metro bundler in one terminal
npm run ios           # Run in iOS simulator (in another terminal)
```

**Android (Emulator/Device)**
```bash
npm start              # Start Metro bundler in one terminal
npm run android       # Run on Android emulator (in another terminal)
```

#### Production Build

**iOS (Release)**
```bash
npm run build:ios
# Produces: ios/build/Release-iphoneos/DoctorApp.app
```

**Android (Release APK)**
```bash
npm run build:android
# Produces: android/app/build/outputs/apk/release/app-release.apk
```

### File Structure

```
DoctorApp/
├── ios/
│   ├── DoctorApp/                   # App native code
│   ├── DoctorApp.xcodeproj/         # Xcode project
│   ├── DoctorApp.xcworkspace        # Xcode workspace (USE THIS)
│   ├── Podfile                      # CocoaPods config
│   └── Podfile.lock                 # CocoaPods lock file
├── android/
│   ├── app/                         # Main app module
│   ├── gradle/                      # Gradle wrapper
│   ├── build.gradle                 # Project-level Gradle
│   └── gradle.properties            # Gradle properties
├── App.tsx                          # React Native entry component
├── index.ts                         # App index
├── package.json                     # (UPDATED with new scripts)
└── ... (rest of your app code)
```

### Next Steps

1. **Test the App**
   - Run `npm start` to start the Metro bundler
   - Open a second terminal and run `npm run ios` or `npm run android`
   - Verify your app works on both platforms

2. **Configure Signing (iOS Release)**
   - Open `ios/DoctorApp.xcworkspace` in Xcode
   - Select the "DoctorApp" target
   - Go to "Signing & Capabilities"
   - Select your Apple Developer Team
   - Configure bundle identifier if needed

3. **Configure Signing (Android Release)**
   - Create a signing key (if you don't have one): `keytool -genkey -v -keystore release.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias`
   - Follow Android documentation for configuring `android/app/build.gradle` with your keystore

4. **Push to Git**
   - Commit your changes: `git add . && git commit -m "Convert from Expo to bare React Native"`
   - Your backup branch (`backup/expo-to-bare`) is already created and pushed

### Important Files to Be Aware Of

- `ios/DoctorApp.xcworkspace` — **Always** use this workspace in Xcode (NOT `.xcodeproj`)
- `ios/Podfile` — Manages iOS native dependencies. Run `pod install` after adding new RN packages
- `android/app/build.gradle` — Manages Android build config and dependencies
- `app.json` — Expo config (no longer used but can remain for documentation)

### Troubleshooting

**"pod install" issues?**
```bash
cd ios && rm -rf Pods Podfile.lock && pod install
```

**Metro bundler issues?**
```bash
npm start -- --reset-cache
```

**Android build issues?**
```bash
cd android && ./gradlew clean && ./gradlew assembleDebug
```

### Reverting (If Needed)

Your original Expo setup is preserved in the `backup/expo-to-bare` branch:
```bash
git checkout backup/expo-to-bare
```

---

**Conversion Date**: 2025-11-27  
**From**: Expo SDK 54  
**To**: Bare React Native 0.81.5
