import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { events } from '../../data/events';
import { db } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

export default function CheckoutScreen() {
    const { eventId, selectedSeats, totalPrice } = useLocalSearchParams<{ eventId: string, selectedSeats: string, totalPrice: string }>();
    const router = useRouter();
    const { user } = useAuth();

    const event = events.find((e) => e.id === eventId);
    const seats = JSON.parse(selectedSeats || '[]');
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        if (!user) {
            Alert.alert('Login Required', 'Please sign in to book tickets.');
            return;
        }

        setLoading(true);
        try {
            // Save booking to Firestore
            await addDoc(collection(db, 'bookings'), {
                userId: user.uid,
                userEmail: user.email,
                eventId: eventId,
                movieTitle: event?.title,
                seats: seats,
                totalPrice: Number(totalPrice),
                status: 'Confirmed',
                createdAt: serverTimestamp(),
            });

            // Simulate a short delay for payment effect
            setTimeout(() => {
                setLoading(false);
                router.replace({
                    pathname: '/screens/SuccessScreen',
                    params: { eventId, selectedSeats }
                } as any);
            }, 1000);
        } catch (error) {
            console.error('Booking Error:', error);
            setLoading(false);
            Alert.alert('Booking Failed', 'Something went wrong while saving your booking.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Booking Summary</Text>

            <View style={styles.card}>
                <Text style={styles.movieTitle}>{event?.title}</Text>
                <Text style={styles.detailText}>{event?.genre}</Text>
                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.value}>{event?.date}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Time</Text>
                    <Text style={styles.value}>{event?.time}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Seats</Text>
                    <Text style={styles.value}>{seats.join(', ')}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalValue}>₹ {totalPrice}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.payButton}
                onPress={handlePayment}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.payButtonText}>Pay Now</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 30,
    },
    movieTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    detailText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        color: '#666',
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e91e63',
    },
    payButton: {
        backgroundColor: '#e91e63',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    payButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
