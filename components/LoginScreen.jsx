import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Link } from 'expo-router';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { Colors } from '@/constants/Colors';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({ redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' })});

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  return (
    <View>
      <View style={{ display: 'flex', alignItems: 'center', marginTop: 100 }}>
        <Image 
          source={require('./../assets/images/login.png')}
          style={{ width: 220, height: 450, borderRadius: 20, borderWidth: 6, borderColor: '#000' }}
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={{ fontSize: 30, fontFamily: 'montserrat-bold', textAlign: 'center' }}>
          Your Ultimate 
          <Text style={{ color: Colors.PRIMARY }}> Community Business Directory</Text> App
        </Text>
        <Text style={{ fontSize: 15, fontFamily: 'montserrat', textAlign: 'center', marginVertical: 15, color: Colors.GREY }}>
          Find your favorite near your and post your own business to your community
        </Text>
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={{ textAlign: 'center', color: '#fff', fontFamily: 'montserrat' }}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: -20,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 20,
  },
});

export default LoginScreen;
