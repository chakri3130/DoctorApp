import { View, Text, StyleSheet } from "react-native";
import { Appointment } from "../utils/appointmentsData";

function CompletedCard({ data }: { data: Appointment }) {
    const getInitials = (name: string) => {
        return name.split(' ').map(word => word[0]).join('').toUpperCase();
    };

    return (
        <View style={styles.completedCard}>
            <View style={styles.avatar}>
                <Text style={styles.initials}>{getInitials(data.name)}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.patientName}>{data.name}</Text>
                <Text style={styles.patientInfo}>{data.age}Y • {data.gender}</Text>
            </View>
            <View style={styles.rightSection}>
                <Text style={styles.timeText}>{data.time}</Text>
                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>Completed</Text>
                </View>
            </View>
        </View>
    );
}
export default CompletedCard;

const styles = StyleSheet.create({
    completedCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#C8E6C9',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    initials: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2E7D32',
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
    },
    rightSection: {
        alignItems: 'flex-end',
    },
    timeText: {
        fontSize: 14,
        color: '#212121',
        marginBottom: 8,
        fontWeight: '500',
    },
    statusBadge: {
        backgroundColor: '#C8E6C9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        color: '#2E7D32',
        fontWeight: '600',
    },
})