import { Platform, Alert } from 'react-native';

// Try to import Jitsi, but handle if it's not available (Expo Go)
let JitsiMeet: any = null;
try {
    JitsiMeet = require('@jitsi/react-native-sdk');
} catch (error) {
    console.log('Jitsi Meet SDK not available - requires development build');
}

interface JitsiMeetingOptions {
    roomName: string;
    patientName: string;
    doctorName: string;
    appointmentId?: string;
}

class JitsiService {
    private static instance: JitsiService;
    private isJitsiAvailable: boolean;

    private constructor() {
        this.isJitsiAvailable = JitsiMeet !== null;
    }

    public static getInstance(): JitsiService {
        if (!JitsiService.instance) {
            JitsiService.instance = new JitsiService();
        }
        return JitsiService.instance;
    }

    /**
     * Start a Jitsi Meet consultation
     * @param options Meeting configuration options
     */
    public async startConsultation(options: JitsiMeetingOptions): Promise<void> {
        // Check if Jitsi is available (development build)
        if (!this.isJitsiAvailable || !JitsiMeet) {
            Alert.alert(
                'Development Build Required',
                'Video consultation requires a development build. This feature is not available in Expo Go.\n\nPlease see BUILD_INSTRUCTIONS.md for setup details.',
                [{ text: 'OK' }]
            );
            throw new Error('Jitsi Meet not available - requires development build');
        }

        try {
            // Generate a unique room name if not provided
            const roomName = options.roomName || this.generateRoomName(options.appointmentId);

            const meetingOptions = {
                room: roomName,
                serverURL: 'https://meet.jit.si', // You can use your own Jitsi server
                userInfo: {
                    displayName: options.doctorName,
                    email: '', // Optional: add doctor's email
                    avatar: '', // Optional: add doctor's avatar URL
                },
                featureFlags: {
                    'call-integration.enabled': false,
                    'chat.enabled': true,
                    'invite.enabled': false,
                    'meeting-name.enabled': true,
                    'meeting-password.enabled': false,
                    'pip.enabled': true, // Picture-in-picture
                    'raise-hand.enabled': true,
                    'recording.enabled': false, // Disable recording for privacy
                    'reactions.enabled': true,
                    'screen-sharing.enabled': true,
                    'video-share.enabled': false,
                    'toolbox.alwaysVisible': false,
                    'welcomepage.enabled': false,
                },
                configOverrides: {
                    'startWithAudioMuted': false,
                    'startWithVideoMuted': false,
                    'subject': `Consultation with ${options.patientName}`,
                },
            };

            // Launch Jitsi Meet
            await JitsiMeet.launch(meetingOptions);

            console.log(`Started consultation: ${roomName} with ${options.patientName}`);
        } catch (error) {
            console.error('Error starting Jitsi consultation:', error);
            throw new Error('Failed to start video consultation. Please try again.');
        }
    }

    /**
     * Generate a unique room name for the meeting
     */
    private generateRoomName(appointmentId?: string): string {
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 8);

        if (appointmentId) {
            return `consultation-${appointmentId}-${randomStr}`;
        }

        return `consultation-${timestamp}-${randomStr}`;
    }

    /**
     * Add event listeners for Jitsi Meet
     */
    public setupEventListeners(): void {
        if (!this.isJitsiAvailable || !JitsiMeet) {
            console.log('Jitsi Meet not available - skipping event listeners');
            return;
        }

        // Conference joined event
        JitsiMeet.addEventListener('conferenceJoined', (event: any) => {
            console.log('Conference joined:', event);
        });

        // Conference left event
        JitsiMeet.addEventListener('conferenceLeft', (event: any) => {
            console.log('Conference left:', event);
        });

        // Participant joined event
        JitsiMeet.addEventListener('participantJoined', (event: any) => {
            console.log('Participant joined:', event);
        });

        // Participant left event
        JitsiMeet.addEventListener('participantLeft', (event: any) => {
            console.log('Participant left:', event);
        });

        // Conference will join event
        JitsiMeet.addEventListener('conferenceWillJoin', (event: any) => {
            console.log('Conference will join:', event);
        });

        // Ready to close event
        JitsiMeet.addEventListener('readyToClose', () => {
            console.log('Jitsi Meet ready to close');
        });
    }

    /**
     * Remove all event listeners
     */
    public removeEventListeners(): void {
        if (!this.isJitsiAvailable || !JitsiMeet) {
            return;
        }
        JitsiMeet.removeAllListeners();
    }

    /**
     * End the current meeting
     */
    public async endConsultation(): Promise<void> {
        if (!this.isJitsiAvailable || !JitsiMeet) {
            return;
        }

        try {
            await JitsiMeet.endCall();
            console.log('Consultation ended');
        } catch (error) {
            console.error('Error ending consultation:', error);
        }
    }
}

export default JitsiService.getInstance();
