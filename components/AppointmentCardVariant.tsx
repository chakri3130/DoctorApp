import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import { Appointment } from "../utils/appointmentsData";
import JitsiService from "../services/JitsiService";

interface AppointmentCardVariantProps {
    data: Appointment;
    variant: 'today' | 'upcoming' | 'past';
}

function AppointmentCardVariant({ data, variant }: AppointmentCardVariantProps) {
    const getInitials = (name: string) => {
        return name.split(' ').map(word => word[0]).join('').toUpperCase();
    };

    const handleStartConsultation = async () => {
        try {
            await JitsiService.startConsultation({
                roomName: `consultation-${data.id}`,
                patientName: data.name,
                doctorName: 'Dr. Sarah Anderson',
                appointmentId: data.id.toString(),
            });
        } catch (error) {
            Alert.alert('Error', 'Failed to start video consultation. Please try again.');
        }
    };

    // Determine avatar background color based on variant
    const getAvatarStyle = () => {
        if (variant === 'past') {
            return data.name === 'Patricia White'
                ? { backgroundColor: '#FFEBEE' }
                : { backgroundColor: '#E3F2FD' };
        }
        return { backgroundColor: '#E3F2FD' };
    };

    const getInitialsColor = () => {
        if (variant === 'past' && data.name === 'Patricia White') {
            return '#C62828';
        }
        return '#3949AB';
    };

    return (
        <View style={styles.appointmentCard}>
            <View style={styles.mainSection}>
                <View style={styles.leftSection}>
                    <View style={[styles.avatar, getAvatarStyle()]}>
                        <Text style={[styles.initials, { color: getInitialsColor() }]}>
                            {getInitials(data.name)}
                        </Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.patientName}>{data.name}</Text>
                        <Text style={styles.patientInfo}>{data.age}Y • {data.gender}</Text>
                        <View style={styles.timeContainer}>
                            <Ionicons name="time-outline" size={14} color="#666666" />
                            <Text style={styles.timeText}>{data.time}</Text>
                            {variant === 'past' && (
                                <>
                                    <Ionicons name="calendar-outline" size={14} color="#666666" style={{ marginLeft: 8 }} />
                                    <Text style={styles.timeText}>{data.date}</Text>
                                </>
                            )}
                        </View>
                    </View>
                </View>

                {/* Right side badges */}
                {variant === 'today' && (
                    <View style={styles.confirmedBadge}>
                        <Text style={styles.confirmedText}>Confirmed</Text>
                    </View>
                )}
                {variant === 'upcoming' && (
                    <View style={styles.confirmedBadge}>
                        <Text style={styles.confirmedText}>Confirmed</Text>
                    </View>
                )}
                {variant === 'past' && data.name === 'Patricia White' && (
                    <View style={styles.cancelledBadge}>
                        <Text style={styles.cancelledText}>Cancelled</Text>
                    </View>
                )}
            </View>

            {/* Action buttons - only for 'today' and 'past' variants */}
            {variant === 'today' && (
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.cancelButton,
                            pressed && { opacity: 0.6 }
                        ]}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            styles.startButton,
                            pressed && { opacity: 0.8 }
                        ]}
                        onPress={handleStartConsultation}
                    >
                        <Text style={styles.startButtonText}>Start Consultation</Text>
                    </Pressable>
                </View>
            )}

            {variant === 'past' && (
                <Pressable
                    style={({ pressed }) => [
                        styles.viewDetailsButton,
                        pressed && { opacity: 0.8 }
                    ]}
                >
                    <Text style={styles.viewDetailsText}>View Details</Text>
                </Pressable>
            )}
        </View>
    );
}

export default AppointmentCardVariant;

const styles = StyleSheet.create({
    appointmentCard: {
        padding: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        backgroundColor: '#FFFFFF',
        marginBottom: 16,
    },
    mainSection: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    leftSection: {
        flexDirection: 'row',
        flex: 1,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    initials: {
        fontSize: 16,
        fontWeight: '600',
    },
    infoContainer: {
        flex: 1,
    },
    patientName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#212121',
        marginBottom: 4,
    },
    patientInfo: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 6,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    timeText: {
        fontSize: 14,
        color: '#666666',
    },
    confirmedBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        height: 28,
    },
    confirmedText: {
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: '500',
    },
    cancelledBadge: {
        backgroundColor: '#FFEBEE',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        height: 28,
    },
    cancelledText: {
        fontSize: 12,
        color: '#C62828',
        fontWeight: '500',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666666',
    },
    startButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#3949AB',
        alignItems: 'center',
    },
    startButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    viewDetailsButton: {
        width: '100%',
        paddingVertical: 8,
        borderRadius: 16,
        backgroundColor: '#06B2CB',
        alignItems: 'center',
    },
    viewDetailsText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
