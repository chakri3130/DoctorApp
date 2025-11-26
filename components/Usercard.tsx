import React, { useState } from "react";
import { Text, View, Switch, StyleSheet } from "react-native";
import { Ionicons } from '@react-native-vector-icons/ionicons';

function Usercard({ name, status }: { name: string; status: boolean }) {
    const [isEnabled, setIsEnabled] = useState(status);

    function toogleSwitchHandler() {
        setIsEnabled(!isEnabled);
    }

    const isAvailable = isEnabled;
    return (
        <View style={styles.userCard}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>Dr. {name}</Text>
            <View style={styles.statusContainer}>
                <View style={styles.statusLeft}>
                    <Ionicons name="checkmark-circle" size={20} color={isAvailable ? '#4CAF50' : '#F44336'} />
                    <View>
                        <Text style={styles.statusLabel}>Status</Text>
                        <Text
                            style={[
                                styles.statusText,
                                { color: isAvailable ? '#4CAF50' : '#F44336' }
                            ]}
                        >
                            {isAvailable ? 'Available for patients' : 'Unavailable'}
                        </Text>
                    </View>
                </View>
                <Switch
                    trackColor={{ false: '#E0E0E0', true: '#81C784' }}
                    thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
                    ios_backgroundColor="#E0E0E0"
                    onValueChange={toogleSwitchHandler}
                    value={isEnabled}
                />
            </View>
        </View>
    )
}
export default Usercard;


const styles = StyleSheet.create({
    userCard: {
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 4,
    },
    userName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#3949AB',
        marginBottom: 16,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    statusLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    statusLabel: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 2,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '500',
    },
})