import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { events } from '../../data/events';

const NUM_ROWS = 6;
const SEATS_PER_ROW = 8;

const generateSeats = () => {
    const seats = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        for (let j = 0; j < SEATS_PER_ROW; j++) {
            seats.push({
                id: `${String.fromCharCode(65 + i)}${j + 1}`,
                status: Math.random() < 0.2 ? 'booked' : 'available', // Randomly book some seats
            });
        }
    }
    return seats;
};

const SEAT_DATA = generateSeats();

export default function SeatScreen() {
    const { eventId } = useLocalSearchParams();
    const router = useRouter();
    const event = events.find((e) => e.id === eventId);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const toggleSeat = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const totalPrice = selectedSeats.length * (event ? event.price : 0);

    const handleCheckout = () => {
        if (selectedSeats.length === 0) {
            Alert.alert('Please select at least one seat');
            return;
        }
        router.push({
            pathname: '/screens/CheckoutScreen',
            params: {
                eventId,
                selectedSeats: JSON.stringify(selectedSeats),
                totalPrice,
            },
        });
    };

    const renderSeat = ({ item }) => {
        const isSelected = selectedSeats.includes(item.id);
        const isBooked = item.status === 'booked';

        return (
            <TouchableOpacity
                style={[
                    styles.seat,
                    isBooked && styles.bookedSeat,
                    isSelected && styles.selectedSeat,
                ]}
                disabled={isBooked}
                onPress={() => toggleSeat(item.id)}
            >
                <Text style={[styles.seatText, (isSelected || isBooked) && styles.activeSeatText]}>
                    {item.id}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.screenTitle}>Select Seats</Text>
            <Text style={styles.screenSubtitle}>{event?.title}</Text>

            <View style={styles.screenIndicator}>
                <View style={styles.screenLine} />
                <Text style={styles.screenText}>SCREEN THIS WAY</Text>
            </View>

            <FlatList
                data={SEAT_DATA}
                renderItem={renderSeat}
                keyExtractor={(item) => item.id}
                numColumns={SEATS_PER_ROW}
                contentContainerStyle={styles.seatsContainer}
            />

            <View style={styles.legend}>
                <View style={styles.legendItem}>
                    <View style={[styles.seat, styles.legendSeat, styles.availableLegend]} />
                    <Text>Available</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.seat, styles.legendSeat, styles.bookedSeat]} />
                    <Text>Booked</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.seat, styles.legendSeat, styles.selectedSeat]} />
                    <Text>Selected</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <View>
                    <Text style={styles.totalLabel}>Total Price</Text>
                    <Text style={styles.totalPrice}>₹ {totalPrice}</Text>
                </View>
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                    <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 16,
    },
    screenTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 4,
    },
    screenSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    screenIndicator: {
        alignItems: 'center',
        marginBottom: 30,
    },
    screenLine: {
        width: '80%',
        height: 4,
        backgroundColor: '#ccc',
        borderRadius: 2,
        marginBottom: 8,
    },
    screenText: {
        fontSize: 10,
        color: '#999',
    },
    seatsContainer: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    seat: {
        width: 35,
        height: 35,
        margin: 4,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        backgroundColor: '#fff',
    },
    bookedSeat: {
        backgroundColor: '#d3d3d3',
        borderColor: '#d3d3d3',
    },
    selectedSeat: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    seatText: {
        fontSize: 10,
        color: '#555',
    },
    activeSeatText: {
        color: '#fff',
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendSeat: {
        width: 20,
        height: 20,
        marginRight: 8,
        borderWidth: 1,
    },
    availableLegend: {
        borderColor: '#ddd',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
    },
    totalLabel: {
        fontSize: 12,
        color: '#666',
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    checkoutButton: {
        backgroundColor: '#e91e63',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 8,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
