import React from "react";
import { View, StyleSheet } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import PatientHistory from "../components/PatientHistory";
import RevenueHistory from "../components/RevenueHistory";


function History() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    function segmentHnadler(event: any) {
        setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        console.log("Selected index:", event.nativeEvent.selectedSegmentIndex);
    }

    return (
        <View style={styles.container}>
            <View style={styles.segmentedControlContainer}>
                <SegmentedControl
                    values={['Patients', 'My Revenue']}
                    backgroundColor={"#F5F5F5"}
                    tintColor="#3949AB"
                    activeFontStyle={{ color: "#FFFFFF", fontWeight: '600' }}
                    fontStyle={{ color: "#666666" }}
                    onChange={segmentHnadler}
                    selectedIndex={selectedIndex}
                />
            </View>
            {selectedIndex === 0 ? (
                <PatientHistory />
            ) : (
                <RevenueHistory />
            )}
        </View>
    )

}
export default History;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    segmentedControlContainer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
    }
})