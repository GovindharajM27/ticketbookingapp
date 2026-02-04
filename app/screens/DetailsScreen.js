import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { events } from '../../data/events';

export default function DetailsScreen() {
    const { eventId } = useLocalSearchParams();
    const router = useRouter();

    const event = events.find((e) => e.id === eventId);

    if (!event) {
        return (
            <View style={styles.container}>
                <Text>Event not found!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Image source={{ uri: event.image }} style={styles.image} />
                <View style={styles.content}>
                    <Text style={styles.title}>{event.title}</Text>
                    <View style={styles.row}>
                        <Text style={styles.infoLabel}>Date: </Text>
                        <Text style={styles.infoValue}>{event.date}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoLabel}>Time: </Text>
                        <Text style={styles.infoValue}>{event.time}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoLabel}>Price: </Text>
                        <Text style={styles.infoValue}>₹ {event.price}</Text>
                    </View>
                    <Text style={styles.descriptionHeader}>About the Movie</Text>
                    <Text style={styles.description}>{event.description}</Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => router.push({ pathname: '/screens/SeatScreen', params: { eventId: event.id } })}
                >
                    <Text style={styles.bookButtonText}>Book Tickets</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
    },
    infoValue: {
        fontSize: 16,
        color: '#333',
    },
    descriptionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#555',
        lineHeight: 22,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
    },
    bookButton: {
        backgroundColor: '#e91e63',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
