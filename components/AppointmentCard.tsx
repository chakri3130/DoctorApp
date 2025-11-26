import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import { Appointment } from "../utils/appointmentsData";
import JitsiService from "../services/JitsiService";

function Appointmentcard({ data, segmentdata }: { data: Appointment, segmentdata?: { page: string, selectedType: string } }) {
    // Function to get initials from name
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

    // Function to calculate time difference (mock implementation)
    const getTimeUntilAppointment = (time: string) => {
        // This is a simplified version - you can implement actual time calculation
        const times = ['7 min', '37 min', '67 min'];
        return times[Math.floor(Math.random() * times.length)];
    };

    return (
        <View style={styles.appointmentCard}>
            <View style={styles.topSection}>
                <View style={styles.leftSection}>
                    <View style={styles.avatar}>
                        <Text style={styles.initials}>{getInitials(data.name)}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.patientName}>{data.name}</Text>
                        <Text style={styles.patientInfo}>{data.age}Y • {data.gender}</Text>
                        <View style={styles.timeContainer}>
                            <Ionicons name="time-outline" size={14} color="#666666" />

                            <Text style={styles.timeText}>{data.time}</Text>
                        </View>
                    </View>
                </View>
                {segmentdata?.page === "appointment" ? (
                    <View style={styles.confirmedBadge}>
                        <Text style={styles.confirmedText}>Confirmed</Text>
                    </View>
                ) : (
                    <View style={styles.timeBadge}>
                        <Text style={styles.timeBadgeText}>Starts in {getTimeUntilAppointment(data.time)}</Text>
                    </View>
                )}
            </View>

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
        </View>
    );
}
export default Appointmentcard;

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
    topSection: {
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
        backgroundColor: '#E3F2FD',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    initials: {
        fontSize: 16,
        fontWeight: '600',
        color: '#3949AB',
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
    timeBadge: {
        backgroundColor: '#FFF3E0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    timeBadgeText: {
        fontSize: 12,
        color: '#F57C00',
        fontWeight: '500',
    },
    confirmedBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    confirmedText: {
        fontSize: 12,
        color: '#4CAF50',
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
});