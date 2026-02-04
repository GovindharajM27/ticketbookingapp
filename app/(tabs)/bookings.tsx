import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { events } from '../../data/events';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

interface Booking {
    id: string;
    eventId: string;
    seats: string[];
    movieTitle: string;
    status: string;
    createdAt: any;
}

export default function BookingsScreen() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        if (!user) return;

        try {
            const q = query(
                collection(db, 'bookings'),
                where('userId', '==', user.uid),
                orderBy('createdAt', 'desc')
            );

            const querySnapshot = await getDocs(q);
            const fetchedBookings: Booking[] = [];
            querySnapshot.forEach((doc) => {
                fetchedBookings.push({ id: doc.id, ...doc.data() } as Booking);
            });

            setBookings(fetchedBookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [user]);

    const renderBooking = ({ item }: { item: Booking }) => {
        const event = events.find(e => e.id === item.eventId);
        return (
            <View style={styles.card}>
                <Image source={{ uri: event?.image }} style={styles.image} />
                <View style={styles.details}>
                    <Text style={styles.title}>{item.movieTitle || event?.title}</Text>
                    <Text style={styles.info}>Date: {event?.date} at {event?.time}</Text>
                    <Text style={styles.info}>Seats: {item.seats.join(', ')}</Text>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                </View>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#e91e63" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Bookings</Text>
            {bookings.length > 0 ? (
                <FlatList
                    data={bookings}
                    renderItem={renderBooking}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                    onRefresh={fetchBookings}
                    refreshing={loading}
                />
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No bookings found</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 16,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        marginBottom: 16,
        color: '#333',
    },
    list: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    image: {
        width: 100,
        height: 120,
    },
    details: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    info: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#e8f5e9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginTop: 8,
    },
    statusText: {
        fontSize: 10,
        color: '#2e7d32',
        fontWeight: 'bold',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
    },
});
