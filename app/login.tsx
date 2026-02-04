import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
    const { user, signInWithGoogle } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            router.replace('/(tabs)' as any);
        }
    }, [user]);

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await signInWithGoogle();
        } catch (error: any) {
            console.error('Google Sign-In Error:', error);
            Alert.alert('Login Failed', error.message || 'An error occurred during sign in.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Ionicons name="ticket" size={100} color="#e91e63" />
                <Text style={styles.appName}>TicketShow</Text>
                <Text style={styles.tagline}>Book your favorite movies in seconds</Text>
            </View>

            <TouchableOpacity
                style={styles.googleButton}
                disabled={loading}
                onPress={handleGoogleLogin}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <>
                        <Ionicons name="logo-google" size={24} color="#fff" style={styles.icon} />
                        <Text style={styles.buttonText}>Sign in with Google</Text>
                    </>
                )}
            </TouchableOpacity>

            <Text style={styles.footerText}>
                By signing in, you agree to our Terms and Conditions
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 60,
    },
    appName: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    tagline: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4285F4',
        paddingVertical: 15,
        borderRadius: 30,
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        minHeight: 56,
    },
    icon: {
        marginRight: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerText: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        textAlign: 'center',
        color: '#999',
        fontSize: 12,
    },
});
