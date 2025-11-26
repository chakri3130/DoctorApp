# Development Build Instructions

## Problem
Jitsi Meet SDK requires native modules that are not available in Expo Go. You need to create a custom development build.

## Solution Options

### Option 1: Create Development Build (Recommended)

1. **Install EAS CLI**
```bash
npm install -g eas-cli
```

2. **Login to Expo**
```bash
eas login
```

3. **Configure EAS Build**
```bash
eas build:configure
```

4. **Build for iOS (requires Apple Developer account)**
```bash
eas build --profile development --platform ios
```

5. **Build for Android**
```bash
eas build --profile development --platform android
```

6. **Install the development build on your device**
- iOS: Download from TestFlight or direct install
- Android: Download APK and install

7. **Run the app**
```bash
npx expo start --dev-client
```

### Option 2: Local Development Build

#### For iOS:
```bash
# Install expo-dev-client
npm install expo-dev-client --legacy-peer-deps

# Prebuild native projects
npx expo prebuild

# Install iOS dependencies
cd ios && pod install && cd ..

# Run on iOS
npx expo run:ios
```

#### For Android:
```bash
# Install expo-dev-client
npm install expo-dev-client --legacy-peer-deps

# Prebuild native projects
npx expo prebuild

# Run on Android
npx expo run:android
```

### Option 3: Alternative Video Solution (No Build Required)

If you want to avoid custom builds, you can use web-based video solutions that work in Expo Go:

1. **Agora.io Web SDK** - Works through WebView
2. **Daily.co** - Web-based video calls
3. **Whereby** - Embedded video rooms
4. **Zoom Web SDK** - Through WebView

## Recommended Approach

**For Quick Testing**: Use Option 3 with a web-based solution

**For Production**: Use Option 1 (EAS Build) - it's the most reliable and maintained by Expo

## Common Issues

### React Version Conflict
The error occurs because Jitsi SDK requires React 18, but your project uses React 19.

**Solution**: Downgrade React (not recommended) or wait for Jitsi SDK update, or use EAS Build which handles this better.

### Missing expo-dev-client
After any native module installation, you need expo-dev-client to run outside Expo Go.

## Quick Fix for Now

To test the app without Jitsi:

1. **Comment out Jitsi imports** in:
   - `services/JitsiService.ts`
   - `components/AppointmentCard.tsx`
   - `components/AppointmentCardVariant.tsx`
   - `App.tsx`

2. **Replace with placeholder**:
```typescript
const handleStartConsultation = async () => {
    Alert.alert(
        'Video Consultation',
        'This feature requires a development build. Please follow BUILD_INSTRUCTIONS.md'
    );
};
```

3. **Run in Expo Go**:
```bash
npx expo start
```

## Next Steps

Choose one of the options above based on your needs:
- Quick testing → Use web-based alternative
- Production app → Create EAS development build
- Full control → Local development build
