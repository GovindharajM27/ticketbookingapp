import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
    const { signOut, user } = useAuth();

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to sign out?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', onPress: signOut, style: 'destructive' }
        ]);
    };

    const profileOptions = [
        { id: '1', icon: 'person-outline', title: 'Edit Profile' },
        { id: '2', icon: 'notifications-outline', title: 'Notifications' },
        { id: '3', icon: 'lock-closed-outline', title: 'Privacy & Security' },
        { id: '4', icon: 'help-circle-outline', title: 'Help & Support' },
        { id: '5', icon: 'log-out-outline', title: 'Logout', color: '#ff4444', action: handleLogout },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=e91e63&color=fff&size=128` }}
                    style={styles.avatar}
                />
                <Text style={styles.name}>{user?.displayName || 'User'}</Text>
                <Text style={styles.email}>{user?.email || 'No email provided'}</Text>
            </View>

            <View style={styles.optionsContainer}>
                {profileOptions.map(option => (
                    <TouchableOpacity
                        key={option.id}
                        style={styles.option}
                        onPress={option.action}
                    >
                        <View style={styles.optionLeft}>
                            <Ionicons name={option.icon as any} size={22} color={option.color || '#333'} />
                            <Text style={[styles.optionTitle, option.color && { color: option.color }]}>
                                {option.title}
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#ccc" />
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.footer}>
                <Text style={styles.version}>App Version 1.0.0</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    email: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    optionsContainer: {
        marginTop: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionTitle: {
        fontSize: 16,
        marginLeft: 15,
        color: '#333',
    },
    footer: {
        padding: 40,
        alignItems: 'center',
    },
    version: {
        fontSize: 12,
        color: '#999',
    },
});
