import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Address } from "../../types/profile.types";

interface PersonalInformationProps {
    email: string;
    phone: string;
    address: Address;
}

function PersonalInformation({ email, phone, address }: PersonalInformationProps) {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <View style={styles.sectionIconContainer}>
                    <Ionicons name="document-text" size={20} color="#3949AB" />
                </View>
                <Text style={styles.sectionTitle}>Personal Information</Text>
            </View>

            <View style={styles.infoItem}>
                <Ionicons name="mail-outline" size={20} color="#666666" />
                <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Email Address</Text>
                    <Text style={styles.infoValue}>{email}</Text>
                </View>
            </View>

            <View style={styles.infoItem}>
                <Ionicons name="call-outline" size={20} color="#666666" />
                <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Phone Number</Text>
                    <Text style={styles.infoValue}>{phone}</Text>
                </View>
            </View>

            <View style={styles.infoItem}>
                <Ionicons name="location-outline" size={20} color="#666666" />
                <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Address</Text>
                    <Text style={styles.infoValue}>{address.street}</Text>
                    <Text style={styles.infoValue}>
                        {address.city}, {address.state} {address.zip}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default PersonalInformation;

const styles = StyleSheet.create({
    section: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        marginBottom: 16,
        borderRadius: 16,
        marginHorizontal: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    sectionIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E8EAF6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212121',
    },
    infoItem: {
        flexDirection: 'row',
        marginBottom: 20,
        gap: 12,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 15,
        color: '#212121',
        lineHeight: 20,
    },
});
