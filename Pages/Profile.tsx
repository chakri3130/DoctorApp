import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Alert, ActionSheetIOS, Platform } from "react-native";
import { DoctorProfile } from "../types/profile.types";
import { mockProfileData } from "../utils/mockData";
import ProfileHeader from "../components/Profile/ProfileHeader";
import PersonalInformation from "../components/Profile/PersonalInformation";
import MedicalQualifications from "../components/Profile/MedicalQualifications";
import CertificationsList from "../components/Profile/CertificationsList";
import DigitalSignature from "../components/Profile/DigitalSignature";
import * as ImagePicker from 'expo-image-picker';

function Profile({ route, navigation }: any) {
    const [profileData, setProfileData] = useState<DoctorProfile | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedData, setEditedData] = useState<DoctorProfile | null>(null);
    const [avatarUri, setAvatarUri] = useState<string | null>(null);

    useEffect(() => {
        // Simulate API call to load profile data
        const loadProfileData = async () => {
            try {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 500));
                setProfileData(mockProfileData);
                setEditedData(mockProfileData);
            } catch (error) {
                console.error("Error loading profile data:", error);
            }
        };

        loadProfileData();
    }, []);

    useEffect(() => {
        // Check if route params indicate edit mode
        if (route?.params?.editMode) {
            setIsEditMode(true);
            navigation.setParams({ editMode: false }); // Reset param
        }
    }, [route?.params?.editMode]);

    const handleUpdateSignature = () => {
        console.log("Update signature clicked");
        // Handle signature update logic
    };

    const handleSave = () => {
        if (editedData) {
            setProfileData(editedData);
            setIsEditMode(false);
            Alert.alert("Success", "Profile updated successfully!");
            // Here you would typically make an API call to save the data
        }
    };

    const handleCancel = () => {
        setEditedData(profileData);
        setIsEditMode(false);
    };

    const updateField = (field: keyof DoctorProfile, value: any) => {
        if (editedData) {
            setEditedData({ ...editedData, [field]: value });
        }
    };

    const updateAddressField = (field: string, value: string) => {
        if (editedData) {
            setEditedData({
                ...editedData,
                address: { ...editedData.address, [field]: value }
            });
        }
    };

    const requestCameraPermission = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Camera permission is required to take photos.');
            return false;
        }
        return true;
    };

    const requestMediaLibraryPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Media library permission is required to select photos.');
            return false;
        }
        return true;
    };

    const handleTakePhoto = async () => {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) return;

        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                setAvatarUri(result.assets[0].uri);
                Alert.alert('Success', 'Profile picture updated!');
            }
        } catch (error) {
            console.error('Error taking photo:', error);
            Alert.alert('Error', 'Failed to take photo. Please try again.');
        }
    };

    const handleChoosePhoto = async () => {
        const hasPermission = await requestMediaLibraryPermission();
        if (!hasPermission) return;

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                setAvatarUri(result.assets[0].uri);
                Alert.alert('Success', 'Profile picture updated!');
            }
        } catch (error) {
            console.error('Error choosing photo:', error);
            Alert.alert('Error', 'Failed to select photo. Please try again.');
        }
    };

    const handleAvatarPress = () => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Cancel', 'Take Photo', 'Choose from Library'],
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex === 1) {
                        handleTakePhoto();
                    } else if (buttonIndex === 2) {
                        handleChoosePhoto();
                    }
                }
            );
        } else {
            Alert.alert(
                'Update Profile Picture',
                'Choose an option',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Take Photo', onPress: handleTakePhoto },
                    { text: 'Choose from Library', onPress: handleChoosePhoto },
                ],
                { cancelable: true }
            );
        }
    };

    if (!profileData || !editedData) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const displayData = isEditMode ? editedData : profileData;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {isEditMode && (
                <View style={styles.editModeHeader}>
                    <Text style={styles.editModeText}>Edit Mode</Text>
                    <View style={styles.editButtons}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.cancelButton,
                                pressed && styles.pressedButton
                            ]}
                            onPress={handleCancel}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                styles.saveButton,
                                pressed && styles.pressedButton
                            ]}
                            onPress={handleSave}
                        >
                            <Text style={styles.saveButtonText}>Save</Text>
                        </Pressable>
                    </View>
                </View>
            )}

            <ProfileHeader
                initials={displayData.initials}
                name={displayData.name}
                specialization={displayData.specialization}
                availableForConsultation={displayData.availableForConsultation}
                avatarUri={avatarUri}
                onAvatarPress={handleAvatarPress}
            />

            {isEditMode ? (
                <View style={styles.editSection}>
                    <Text style={styles.editSectionTitle}>Personal Information</Text>

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={editedData.email}
                        onChangeText={(text) => updateField('email', text)}
                        keyboardType="email-address"
                    />

                    <Text style={styles.label}>Phone</Text>
                    <TextInput
                        style={styles.input}
                        value={editedData.phone}
                        onChangeText={(text) => updateField('phone', text)}
                        keyboardType="phone-pad"
                    />

                    <Text style={styles.label}>Street Address</Text>
                    <TextInput
                        style={styles.input}
                        value={editedData.address.street}
                        onChangeText={(text) => updateAddressField('street', text)}
                    />

                    <Text style={styles.label}>City</Text>
                    <TextInput
                        style={styles.input}
                        value={editedData.address.city}
                        onChangeText={(text) => updateAddressField('city', text)}
                    />

                    <Text style={styles.label}>State</Text>
                    <TextInput
                        style={styles.input}
                        value={editedData.address.state}
                        onChangeText={(text) => updateAddressField('state', text)}
                    />

                    <Text style={styles.label}>ZIP Code</Text>
                    <TextInput
                        style={styles.input}
                        value={editedData.address.zip}
                        onChangeText={(text) => updateAddressField('zip', text)}
                        keyboardType="number-pad"
                    />
                </View>
            ) : (
                <PersonalInformation
                    email={displayData.email}
                    phone={displayData.phone}
                    address={displayData.address}
                />
            )}

            {isEditMode ? (
                <View style={styles.editSection}>
                    <Text style={styles.editSectionTitle}>Medical Qualifications</Text>

                    <Text style={styles.label}>Degree</Text>
                    <TextInput
                        style={styles.input}
                        value={editedData.degree}
                        onChangeText={(text) => updateField('degree', text)}
                    />

                    <Text style={styles.label}>Medical School</Text>
                    <TextInput
                        style={styles.input}
                        value={editedData.medicalSchool}
                        onChangeText={(text) => updateField('medicalSchool', text)}
                    />

                    <Text style={styles.label}>Graduation Year</Text>
                    <TextInput
                        style={styles.input}
                        value={editedData.graduationYear.toString()}
                        onChangeText={(text) => updateField('graduationYear', parseInt(text) || 2000)}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.label}>Specialization</Text>
                    <TextInput
                        style={styles.input}
                        value={editedData.specialization}
                        onChangeText={(text) => updateField('specialization', text)}
                    />

                    <Text style={styles.label}>License Number</Text>
                    <TextInput
                        style={styles.input}
                        value={editedData.licenseNumber}
                        onChangeText={(text) => updateField('licenseNumber', text)}
                    />

                    <Text style={styles.label}>Experience (years)</Text>
                    <TextInput
                        style={styles.input}
                        value={editedData.experience.toString()}
                        onChangeText={(text) => updateField('experience', parseInt(text) || 0)}
                        keyboardType="number-pad"
                    />
                </View>
            ) : (
                <MedicalQualifications
                    degree={displayData.degree}
                    medicalSchool={displayData.medicalSchool}
                    graduationYear={displayData.graduationYear}
                    specialization={displayData.specialization}
                    licenseNumber={displayData.licenseNumber}
                    experience={displayData.experience}
                />
            )}

            <CertificationsList certifications={displayData.certifications} />

            <DigitalSignature
                signature={displayData.digitalSignature}
                onUpdate={handleUpdateSignature}
            />
        </ScrollView>
    );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    editModeHeader: {
        backgroundColor: '#3949AB',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    editModeText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    editButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    cancelButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    cancelButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    saveButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
    },
    saveButtonText: {
        color: '#3949AB',
        fontWeight: '600',
    },
    editSection: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        marginBottom: 16,
        marginHorizontal: 16,
        borderRadius: 16,
    },
    editSectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212121',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#666666',
        marginTop: 12,
        marginBottom: 6,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        fontSize: 15,
        color: '#212121',
        backgroundColor: '#F9F9F9',
    },
    pressedButton: {
        opacity: 0.7,
    },
});