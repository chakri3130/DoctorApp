import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Certification } from "../../types/profile.types";

interface CertificationsListProps {
    certifications: Certification[];
}

function CertificationsList({ certifications }: CertificationsListProps) {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <View style={styles.sectionIconContainer}>
                    <Ionicons name="ribbon" size={20} color="#8E24AA" />
                </View>
                <Text style={styles.sectionTitle}>Certifications</Text>
            </View>

            {certifications.map((cert, index) => (
                <View key={index} style={styles.certificationItem}>
                    <View style={[
                        styles.certificationIcon,
                        { backgroundColor: index % 2 === 0 ? '#E3F2FD' : '#E0F2F1' }
                    ]}>
                        <Ionicons
                            name={cert.icon as any}
                            size={24}
                            color={index % 2 === 0 ? '#3949AB' : '#00897B'}
                        />
                    </View>
                    <View style={styles.certificationContent}>
                        <Text style={styles.certificationTitle}>{cert.title}</Text>
                        <Text style={styles.certificationOrg}>{cert.organization}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
}

export default CertificationsList;

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
        backgroundColor: '#F3E5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212121',
    },
    certificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    certificationIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    certificationContent: {
        flex: 1,
    },
    certificationTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#212121',
        marginBottom: 4,
    },
    certificationOrg: {
        fontSize: 14,
        color: '#666666',
    },
});
