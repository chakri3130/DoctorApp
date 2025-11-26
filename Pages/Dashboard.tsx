import React from "react";
import { Text, View, Switch, StyleSheet, FlatList, ScrollView, Pressable } from "react-native";
import Usercard from "../components/Usercard";
import Appointmentcard from "../components/AppointmentCard";
import { appointmentsData } from "../utils/appointmentsData";
import RevenueCard from "../components/RevenueCard";
import CompletedCard from "../components/completedCard";

const user = {
    name: " Sarah Anderson",
    id: 122,
    status: true
}

function Dashboard() {
    // Get only first 3 appointments for display
    const todayAppointments = appointmentsData.slice(0, 3);
    const completedAppointments = appointmentsData.slice(3, 6);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Usercard name={user.name} status={user.status} />
            <View style={styles.appointmentsHeader}>
                <Text style={styles.sectionTitle}>Today's Appointments</Text>
                <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
                    <Text style={styles.viewAll}>View All</Text>
                </Pressable>
            </View>
            {todayAppointments.map((appointment) => (
                <Appointmentcard key={appointment.id} data={appointment} />
            ))}

            <RevenueCard />

            <View style={styles.appointmentsHeader}>
                <Text style={styles.sectionTitle}>Completed Today</Text>
                <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
                    <Text style={styles.viewAll}>View All</Text>
                </Pressable>
            </View>
            {completedAppointments.map((appointment) => (
                <CompletedCard key={appointment.id} data={appointment} />
            ))}
        </ScrollView>
    )

}
export default Dashboard;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5F5F5',
    },
    appointmentsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212121',
    },
    viewAll: {
        color: '#3949AB',
        fontWeight: '500',
        fontSize: 14,
    }

});