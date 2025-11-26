import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
function RevenueCard() {
    return (
        <LinearGradient
            colors={['#2258A4', '#0CA1C4']}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.revenueCard}
        >
            <View style={styles.revenueHeader}>
                <Text style={styles.revenueText}>My Revenue</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.revenueAmount}>$2,540</Text>
            <Text style={styles.week}>This Week</Text>
        </LinearGradient>
    )
}

export default RevenueCard;

const styles = StyleSheet.create({
    revenueCard: {
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 20,
    },
    revenueText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    revenueHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    revenueAmount: {
        fontSize: 32,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    week: {
        fontSize: 14,
        color: '#FFFFFF',
        opacity: 0.9,
    },
});