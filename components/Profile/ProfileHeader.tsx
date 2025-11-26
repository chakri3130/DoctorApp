import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { LinearGradient } from 'expo-linear-gradient';

interface ProfileHeaderProps {
    initials: string;
    name: string;
    specialization: string;
    availableForConsultation: boolean;
    avatarUri?: string | null;
    onAvatarPress?: () => void;
}

function ProfileHeader({ initials, name, specialization, availableForConsultation, avatarUri, onAvatarPress }: ProfileHeaderProps) {
    return (
        <View style={styles.header}>
            <Pressable
                onPress={onAvatarPress}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
                {avatarUri ? (
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
                        <View style={styles.cameraButton}>
                            <Ionicons name="camera" size={16} color="#FFFFFF" />
                        </View>
                    </View>
                ) : (
                    <LinearGradient
                        colors={['#5B8FE8', '#4FC3F7']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.avatar}
                    >
                        <Text style={styles.avatarText}>{initials}</Text>
                        <View style={styles.cameraButton}>
                            <Ionicons name="camera" size={16} color="#FFFFFF" />
                        </View>
                    </LinearGradient>
                )}
            </Pressable>
            <Text style={styles.doctorName}>{name}</Text>
            <Text style={styles.doctorSpecialization}>{specialization}</Text>
            <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: availableForConsultation ? '#4CAF50' : '#F44336' }]} />
                <Text style={[styles.statusText, { color: availableForConsultation ? '#4CAF50' : '#F44336' }]}>
                    {availableForConsultation ? 'Available for consultation' : 'Not Available'}
                </Text>
            </View>
        </View>
    );
}

export default ProfileHeader;

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingVertical: 32,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        position: 'relative',
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
        position: 'relative',
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#3949AB',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    doctorName: {
        fontSize: 22,
        fontWeight: '600',
        color: '#212121',
        marginBottom: 4,
    },
    doctorSpecialization: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 12,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    statusText: {
        fontSize: 14,
    },
});
