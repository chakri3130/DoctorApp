import SegmentedControl from "@react-native-segmented-control/segmented-control";
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { appointmentsData } from "../utils/appointmentsData";
import AppointmentCardVariant from "../components/AppointmentCardVariant";

function Appointments() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [displayedAppointments, setDisplayedAppointments] = useState(appointmentsData.slice(0, 3));

    function segmenteventHandler(event: any) {
        setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        console.log("Selected index:", event.nativeEvent.selectedSegmentIndex);
        if (event.nativeEvent.selectedSegmentIndex === 0) {
            setDisplayedAppointments(appointmentsData.slice(0, 3));
        } else if (event.nativeEvent.selectedSegmentIndex === 1) {
            setDisplayedAppointments(appointmentsData.slice(3, 6));
        } else {
            setDisplayedAppointments(appointmentsData.slice(6, 10));
        }
    }

    // Determine the variant based on selected tab
    const getVariant = (): 'today' | 'upcoming' | 'past' => {
        if (selectedIndex === 0) return 'today';
        if (selectedIndex === 1) return 'upcoming';
        return 'past';
    };

    return (
        <View style={styles.container}>
            <View style={styles.segmentedControlContainer}>
                <SegmentedControl
                    values={['Today', 'Upcoming', 'Past']}
                    backgroundColor={"#F5F5F5"}
                    tintColor="#3949AB"
                    activeFontStyle={{ color: "#FFFFFF", fontWeight: '600' }}
                    fontStyle={{ color: "#666666" }}
                    style={styles.segmentedControl}
                    appearance="light"
                    selectedIndex={selectedIndex}
                    onChange={segmenteventHandler}
                />
            </View>
            <ScrollView
                style={styles.segmentedChildControlContainer}
                showsVerticalScrollIndicator={false}
            >
                {displayedAppointments.map((appointment) => (
                    <AppointmentCardVariant
                        key={appointment.id}
                        data={appointment}
                        variant={getVariant()}
                    />
                ))}
            </ScrollView>
        </View>
    )

}
export default Appointments;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    segmentedControlContainer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    segmentedControl: {
        height: 40,
    },
    segmentedChildControlContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    }
})