import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { LinearGradient } from 'expo-linear-gradient';

interface DailyRevenue {
    date: string;
    consultations: number;
    amount: number;
}

function RevenueHistory() {
    const today = new Date();
    const [fromDate, setFromDate] = useState(new Date('2025-11-11'));
    const [toDate, setToDate] = useState(new Date('2025-11-17'));
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);

    // Sample revenue data
    const dailyRevenue: DailyRevenue[] = [
        { date: 'Nov 17, 2025', consultations: 8, amount: 720 },
        { date: 'Nov 16, 2025', consultations: 6, amount: 540 },
        { date: 'Nov 15, 2025', consultations: 7, amount: 630 },
    ];

    const totalConsultations = dailyRevenue.reduce((sum, day) => sum + day.consultations, 0);
    const totalRevenue = dailyRevenue.reduce((sum, day) => sum + day.amount, 0);
    const avgPerConsultation = totalConsultations > 0 ? Math.round(totalRevenue / totalConsultations) : 0;

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

    const getProgressPercentage = (consultations: number) => {
        const maxConsultations = Math.max(...dailyRevenue.map(d => d.consultations));
        return (consultations / maxConsultations) * 100;
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

            {/* Total Revenue Card */}
            <LinearGradient
                colors={['#2258A4', '#0CA1C4']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.revenueCard}
            >
                <Text style={styles.revenueTitle}>Total Revenue</Text>
                <Text style={styles.revenueAmount}>₹{totalRevenue}</Text>

                <View style={styles.revenueDivider} />

                <View style={styles.revenueStats}>
                    <View style={styles.revenueStatItem}>
                        <Text style={styles.revenueStatNumber}>{totalConsultations}</Text>
                        <Text style={styles.revenueStatLabel}>Consultations</Text>
                    </View>
                    <View style={styles.revenueStatItem}>
                        <Text style={styles.revenueStatNumber}>₹{avgPerConsultation}</Text>
                        <Text style={styles.revenueStatLabel}>Avg per Consultation</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* Daily Revenue List */}
            {dailyRevenue.map((day, index) => (
                <View key={index} style={styles.dailyCard}>
                    <View style={styles.dailyHeader}>
                        <View style={styles.dailyInfo}>
                            <Ionicons name="calendar" size={24} color="#5B8FE8" />
                            <View style={styles.dailyText}>
                                <Text style={styles.dailyDate}>{day.date}</Text>
                                <Text style={styles.dailyConsultations}>{day.consultations} consultations</Text>
                            </View>
                            <Text style={styles.dailyAmount}>₹{day.amount}</Text>
                        </View>
                    </View>

                    {/* Progress Bar */}
                    <View style={styles.progressBarContainer}>
                        <View
                            style={[
                                styles.progressBar,
                                { width: `${getProgressPercentage(day.consultations)}%` }
                            ]}
                        />
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

export default RevenueHistory;

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
    revenueCard: {
        padding: 24,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    revenueTitle: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 8,
    },
    revenueAmount: {
        fontSize: 48,
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 16,
    },
    revenueDivider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginBottom: 16,
    },
    revenueStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    revenueStatItem: {
        alignItems: 'center',
    },
    revenueStatNumber: {
        fontSize: 24,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    revenueStatLabel: {
        fontSize: 12,
        color: '#FFFFFF',
        opacity: 0.9,
    },
    dailyCard: {
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
    dailyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    dailyInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    dailyText: {
        flex: 1,
    },
    dailyDate: {
        fontSize: 16,
        fontWeight: '600',
        color: '#212121',
        marginBottom: 4,
    },
    dailyConsultations: {
        fontSize: 14,
        color: '#666666',
    },
    dailyAmount: {
        fontSize: 20,
        fontWeight: '700',
        color: '#5B8FE8',
    },
    progressBarContainer: {
        height: 6,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#5B8FE8',
        borderRadius: 3,
    },
});