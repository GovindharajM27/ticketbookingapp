import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SuccessScreen() {
    const router = useRouter();

    const handleGoHome = () => {
        router.replace('/(tabs)' as any);
    };

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Ionicons name="checkmark-circle" size={100} color="#4CAF50" />
            </View>

            <Text style={styles.title}>Booking Successful!</Text>
            <Text style={styles.message}>Your tickets have been confirmed and saved.</Text>

            <TouchableOpacity
                style={styles.bookingsButton}
                onPress={() => router.replace('/(tabs)/bookings' as any)}
            >
                <Text style={styles.bookingsButtonText}>View My Bookings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
                <Text style={styles.homeButtonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    iconContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
    },
    bookingsButton: {
        backgroundColor: '#fff',
        borderColor: '#e91e63',
        borderWidth: 2,
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 30,
        marginBottom: 16,
    },
    bookingsButtonText: {
        color: '#e91e63',
        fontSize: 16,
        fontWeight: 'bold',
    },
    homeButton: {
        backgroundColor: '#e91e63',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 30,
    },
    homeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
