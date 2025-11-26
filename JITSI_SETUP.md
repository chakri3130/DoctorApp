# Jitsi Meet Integration Setup

## Overview
The app now includes Jitsi Meet video consultation functionality. When users click "Start Consultation" button anywhere in the app, it will launch a Jitsi Meet video call.

## Installation
The package has been installed with:
```bash
npm i @jitsi/react-native-sdk --force
```

## iOS Setup (Required)

### 1. Update Info.plist
Add camera and microphone permissions to `ios/DoctorApp/Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>Camera access is required for video consultations</string>
<key>NSMicrophoneUsageDescription</key>
<string>Microphone access is required for video consultations</string>
```

### 2. Install iOS Dependencies
```bash
cd ios
pod install
cd ..
```

## Android Setup (Required)

### 1. Update AndroidManifest.xml
Add permissions to `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
```

### 2. Update build.gradle
Ensure minimum SDK version is 24 in `android/app/build.gradle`:

```gradle
android {
    defaultConfig {
        minSdkVersion 24
    }
}
```

## How It Works

### 1. JitsiService
A centralized service handles all Jitsi Meet functionality:
- Located at: `services/JitsiService.ts`
- Singleton pattern for app-wide access
- Manages meeting lifecycle and events

### 2. Start Consultation
When user clicks "Start Consultation":
```typescript
await JitsiService.startConsultation({
    roomName: `consultation-${appointmentId}`,
    patientName: 'Patient Name',
    doctorName: 'Dr. Name',
    appointmentId: 'appointment-id',
});
```

### 3. Features Enabled
- ✅ Audio/Video calls
- ✅ Chat
- ✅ Screen sharing
- ✅ Raise hand
- ✅ Reactions
- ✅ Picture-in-picture (PIP)
- ❌ Recording (disabled for privacy)
- ❌ Invites (disabled)

### 4. Event Listeners
The app listens to:
- Conference joined/left
- Participant joined/left
- Ready to close

## Usage in Components

### AppointmentCard.tsx
```typescript
const handleStartConsultation = async () => {
    try {
        await JitsiService.startConsultation({
            roomName: `consultation-${data.id}`,
            patientName: data.name,
            doctorName: 'Dr. Sarah Anderson',
            appointmentId: data.id.toString(),
        });
    } catch (error) {
        Alert.alert('Error', 'Failed to start video consultation.');
    }
};
```

### AppointmentCardVariant.tsx
Same implementation as AppointmentCard.

## Customization

### Use Your Own Jitsi Server
Edit `services/JitsiService.ts`:
```typescript
serverURL: 'https://your-jitsi-server.com'
```

### Modify Features
Edit `featureFlags` in `JitsiService.ts`:
```typescript
featureFlags: {
    'chat.enabled': false, // Disable chat
    'recording.enabled': true, // Enable recording
    // ... other flags
}
```

### Change Doctor Name
Update the `doctorName` parameter when calling `startConsultation()`:
```typescript
doctorName: 'Your Doctor Name'
```

## Testing

### Test on Device
1. Build the app: `npx expo run:ios` or `npx expo run:android`
2. Navigate to Dashboard or Appointments
3. Click "Start Consultation" button
4. Jitsi Meet should launch with video call

### Test Room Joining
- Each appointment creates a unique room
- Multiple users can join the same room using the same `roomName`
- Room names format: `consultation-{appointmentId}-{random}`

## Troubleshooting

### iOS Issues
- Make sure pods are installed: `cd ios && pod install`
- Check Info.plist has camera/mic permissions
- Clean build: `cd ios && xcodebuild clean`

### Android Issues
- Check minSdkVersion is 24 or higher
- Verify permissions in AndroidManifest.xml
- Clean build: `cd android && ./gradlew clean`

### Meeting Not Starting
- Check internet connection
- Verify Jitsi server URL is accessible
- Check device permissions for camera/microphone
- Look at console logs for error messages

## Security Considerations

1. **Recording Disabled**: Recording is disabled by default for privacy
2. **Unique Room Names**: Each consultation gets a unique room ID
3. **No Public Invites**: Invite functionality is disabled
4. **Secure Server**: Use HTTPS for Jitsi server URL

## Future Enhancements

- [ ] Add meeting duration tracking
- [ ] Store consultation history
- [ ] Enable recording with consent
- [ ] Add waiting room functionality
- [ ] Implement custom UI overlay
- [ ] Add prescription sharing during call
- [ ] Enable file sharing
