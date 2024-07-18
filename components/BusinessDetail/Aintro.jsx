import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Aintro({ business }) {
    const router=useRouter();
    
    return (
        <View>
            <View style={{
                position: 'absolute',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                padding: 20
            }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back-circle-sharp" size={40} color="white" style={{
                        padding:10
                    }}/>
                </TouchableOpacity>
                <Ionicons name="heart-outline" size={40} color="white" style={{
                    padding:10
                }}/>
            </View>
            {business?.imageUrl ? (
                <Image source={{ uri: business?.imageUrl }}
                    style={{
                        width: '100%',
                        height: 340
                    }}
                />
            ) : null}
            <View style={{
                padding: 20,
                marginTop: -20,
                backgroundColor: '#fff',
                borderTopLeftRadius: 25,
                borderTopEndRadius: 25
            }}>
                <Text
                    style={{
                        fontSize: 26,
                        fontFamily: 'montserrat-bold'
                    }}
                >
                    {business?.name || ''}
                </Text>
                <Text
                    style={{
                        fontFamily: 'montserrat',
                        fontSize: 18
                    }}
                >
                    {business?.address || ''}
                </Text>
            </View>
        </View>
    );
}
