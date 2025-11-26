import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@react-native-vector-icons/ionicons';

interface MedicalQualificationsProps {
    degree: string;
    medicalSchool: string;
    graduationYear: number;
    specialization: string;
    licenseNumber: string;
    experience: number;
}

function MedicalQualifications({
    degree,
    medicalSchool,
    graduationYear,
    specialization,
    licenseNumber,
    experience
}: MedicalQualificationsProps) {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <View style={styles.sectionIconContainer}>
                    <Ionicons name="school" size={20} color="#00897B" />
                </View>
                <Text style={styles.sectionTitle}>Medical Qualifications</Text>
            </View>

            <View style={styles.qualificationItem}>
                <Text style={styles.qualificationLabel}>Degree</Text>
                <Text style={styles.qualificationValue}>{degree}</Text>
            </View>

            <View style={styles.qualificationItem}>
                <Text style={styles.qualificationLabel}>Medical School</Text>
                <Text style={styles.qualificationValue}>{medicalSchool}</Text>
                <Text style={styles.graduationText}>Graduated {graduationYear}</Text>
            </View>

            <View style={styles.qualificationItem}>
                <Text style={styles.qualificationLabel}>Specialization</Text>
                <Text style={styles.qualificationValue}>{specialization}</Text>
            </View>

            <View style={styles.qualificationItem}>
                <Text style={styles.qualificationLabel}>License Number</Text>
                <Text style={styles.qualificationValue}>{licenseNumber}</Text>
            </View>

            <View style={styles.qualificationItem}>
                <Text style={styles.qualificationLabel}>Experience</Text>
                <Text style={styles.qualificationValue}>{experience} years</Text>
            </View>
        </View>
    );
}

export default MedicalQualifications;

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
        backgroundColor: '#E0F2F1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212121',
    },
    qualificationItem: {
        marginBottom: 16,
    },
    qualificationLabel: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 4,
    },
    qualificationValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#212121',
    },
    graduationText: {
        fontSize: 14,
        color: '#999999',
        marginTop: 2,
    },
});
