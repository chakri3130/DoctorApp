import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { appointmentsData } from "../utils/appointmentsData";

function PatientHistory() {
    const today = new Date();
    const [fromDate, setFromDate] = useState(new Date('2025-11-11'));
    const [toDate, setToDate] = useState(new Date('2025-11-17'));
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);

    const completedAppointments = appointmentsData.slice(0, 3);

    const getInitials = (name: string) => {
        return name.split(' ').map(word => word[0]).join('').toUpperCase();
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const onFromDateChange = (event: any, selectedDate?: Date) => {
        setShowFromPicker(false);

        if (event.type === 'dismissed') {
            return;
        }

        if (selectedDate) {
            setFromDate(selectedDate);
            // If the selected from date is after the current to date, update to date
            if (selectedDate > toDate) {
                setToDate(selectedDate);
            }
        }
    };

    const onToDateChange = (event: any, selectedDate?: Date) => {
        setShowToPicker(false);

        if (event.type === 'dismissed') {
            return;
        }

        if (selectedDate) {
            setToDate(selectedDate);
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Date Pickers */}
            <View style={styles.datePickerContainer}>
                <View style={styles.dateInputWrapper}>
                    <Text style={styles.dateLabel}>From Date</Text>
                    <Pressable
                        style={({ pressed }) => [
                            styles.dateInput,
                            pressed && { backgroundColor: '#F0F0F0' }
                        ]}
                        onPress={() => setShowFromPicker(true)}
                    >
                        <Text style={styles.dateText}>{formatDate(fromDate)}</Text>
                        <Ionicons name="calendar-outline" size={20} color="#666666" />
                    </Pressable>
                </View>

                <View style={styles.dateInputWrapper}>
                    <Text style={styles.dateLabel}>To Date</Text>
                    <Pressable
                        style={({ pressed }) => [
                            styles.dateInput,
                            pressed && { backgroundColor: '#F0F0F0' }
                        ]}
                        onPress={() => setShowToPicker(true)}
                    >
                        <Text style={styles.dateText}>{formatDate(toDate)}</Text>
                        <Ionicons name="calendar-outline" size={20} color="#666666" />
                    </Pressable>
                </View>
            </View>

            {showFromPicker && (
                <DateTimePicker
                    value={fromDate}
                    mode="date"
                    display="default"
                    onChange={onFromDateChange}
                    maximumDate={today}
                />
            )}

            {showToPicker && (
                <DateTimePicker
                    value={toDate}
                    mode="date"
                    display="default"
                    onChange={onToDateChange}
                    minimumDate={fromDate}
                    maximumDate={today}
                />
            )}

            {/* Statistics Card */}
            <LinearGradient
                colors={['#2258A4', '#0CA1C4',]}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statsCard}
            >
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>12</Text>
                    <Text style={styles.statLabel}>Total{'\n'}Appointments</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>9</Text>
                    <Text style={styles.statLabel}>Completed</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>3</Text>
                    <Text style={styles.statLabel}>Cancelled</Text>
                </View>
            </LinearGradient>

            {/* Patient List */}
            {completedAppointments.map((appointment) => (
                <View key={appointment.id} style={styles.patientCard}>
                    <View style={styles.patientInfo}>
                        <View style={styles.avatarGreen}>
                            <Text style={styles.avatarInitials}>{getInitials(appointment.name)}</Text>
                        </View>
                        <View style={styles.patientDetails}>
                            <Text style={styles.patientName}>{appointment.name}</Text>
                            <Text style={styles.patientMeta}>{appointment.age}Y • {appointment.gender}</Text>
                        </View>
                        <View style={styles.completedBadge}>
                            <Text style={styles.completedText}>Completed</Text>
                        </View>
                    </View>
                    <View style={styles.appointmentMeta}>
                        <View style={styles.metaItem}>
                            <Ionicons name="calendar-outline" size={16} color="#666666" />
                            <Text style={styles.metaText}>{appointment.date}</Text>
                        </View>
                        <Text style={styles.timeText}>{appointment.time}</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

export default PatientHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 16,
    },
    datePickerContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    dateInputWrapper: {
        flex: 1,
    },
    dateLabel: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 8,
    },
    dateInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    dateText: {
        fontSize: 14,
        color: '#212121',
    },
    statsCard: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 24,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        fontSize: 32,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 16,
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    patientCard: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    patientInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatarGreen: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#C8E6C9',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    avatarInitials: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2E7D32',
    },
    patientDetails: {
        flex: 1,
    },
    patientName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#212121',
        marginBottom: 4,
    },
    patientMeta: {
        fontSize: 14,
        color: '#666666',
    },
    completedBadge: {
        backgroundColor: '#C8E6C9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    completedText: {
        fontSize: 12,
        color: '#2E7D32',
        fontWeight: '600',
    },
    appointmentMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: 14,
        color: '#666666',
    },
    timeText: {
        fontSize: 14,
        color: '#212121',
        fontWeight: '500',
    },
})