import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from '@react-native-vector-icons/ionicons';

interface DigitalSignatureProps {
    signature: string;
    onUpdate?: () => void;
}

function DigitalSignature({ signature, onUpdate }: DigitalSignatureProps) {
    return (
        <View style={styles.section}>
            <View style={styles.signatureHeader}>
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionIconContainer}>
                        <Ionicons name="create" size={20} color="#F57C00" />
                    </View>
                    <Text style={styles.sectionTitle}>Digital Signature</Text>
                </View>
                {onUpdate && (
                    <Pressable
                        onPress={onUpdate}
                        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                    >
                        <Text style={styles.updateLink}>Update</Text>
                    </Pressable>
                )}
            </View>

            <View style={styles.signatureBox}>
                <Text style={styles.signatureText}>{signature}</Text>
            </View>
        </View>
    );
}

export default DigitalSignature;

const styles = StyleSheet.create({
    section: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        marginBottom: 16,
        borderRadius: 16,
        marginHorizontal: 16,
    },
    signatureHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    sectionIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF3E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212121',
    },
    updateLink: {
        fontSize: 14,
        color: '#3949AB',
        fontWeight: '600',
    },
    signatureBox: {
        backgroundColor: '#F5F5F5',
        padding: 24,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    signatureText: {
        fontSize: 28,
        fontStyle: 'italic',
        color: '#212121',
    },
});
