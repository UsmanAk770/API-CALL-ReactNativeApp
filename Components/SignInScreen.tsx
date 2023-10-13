import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
} from 'react-native';

interface SignInScreenProps {
  navigation: any;
}

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isPasswordEntered, setIsPasswordEntered] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showErrorMessageText, setShowErrorMessageText] = useState('');

  const handleSignIn = () => {
    if (email === '' && password === '') {
      setShowErrorMessage(true);
      setShowErrorMessageText('Please enter both email and password');
    } else if (!isValidEmail && password === '') {
      setShowErrorMessage(true);
      setShowErrorMessageText('Please enter valid email and password');
    } else if (!isValidEmail && !isPasswordEntered) {
      setShowErrorMessage(true);
      setShowErrorMessageText('Please enter valid email and password');
    } else if (!isValidEmail && isPasswordEntered) {
      setShowErrorMessage(true);
      setShowErrorMessageText('Please enter a valid email');
    } else if (isValidEmail && !isPasswordEntered) {
      setShowErrorMessage(true);
      setShowErrorMessageText('Please enter a correct password');
    } else if (email === '' && isPasswordEntered) {
      setShowErrorMessage(true);
      setShowErrorMessageText('Please enter a valid email');
    } else if (
      (email.toLowerCase() === 'user1@gmail.com' &&
        password === '1234user1') ||
      (email.toLowerCase() === 'user2@gmail.com' && password === '1234user2')
    ) {
      if (email.toLowerCase() === 'user1@gmail.com') {
        navigation.replace('Home', { dataFromsignInScreen: '1' });
        setShowErrorMessage(false);
      } else if (email.toLowerCase() === 'user2@gmail.com') {
        navigation.replace('Home', { dataFromsignInScreen: '2' });
        setShowErrorMessage(false);
      }
    } else {
      setShowErrorMessage(true);
      setShowErrorMessageText(
        'Entered email/password is incorrect, Please try again!'
      );
    }
  };

  const validateEmail = (text: string) => {
    setShowErrorMessage(false);
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(text));
    setEmail(text);
  };

  const validatePassword = (text: string) => {
    setShowErrorMessage(false);
    setPassword(text);
    setIsPasswordEntered(true);
  };

  
  const handleTabChange = (value: boolean) => {
    setIsLogin(value);
    if (value === false) {
      navigation.replace('Sign Up Screen');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.segmentControl}>
          <TouchableOpacity
            style={[styles.tab, isLogin ? styles.activeTab : null]}
            onPress={() => handleTabChange(true)}
          >
            <Text style={isLogin ? styles.activeTabText : styles.tabText}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, !isLogin ? styles.activeTab : null]}
            onPress={() => handleTabChange(false)}
          >
            <Text style={!isLogin ? styles.activeTabText : styles.tabText}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.Heading}>
            <Text style={styles.HeadingText}>Sign in to Continue</Text>
          </View>
          <TextInput
            style={[
              styles.input,
              !isValidEmail && styles.invalidInput,
            ]}
            placeholder="Email"
            placeholderTextColor="black"
            keyboardType="email-address"
            clearButtonMode={'always'}
            onChangeText={validateEmail}
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              !isPasswordEntered && styles.invalidInput,
            ]}
            placeholder="Password"
            placeholderTextColor="black"
            clearButtonMode={'always'}
            secureTextEntry
            onChangeText={validatePassword}
            value={password}
          />
        </View>
        {showErrorMessage && (
          <Text style={styles.errorMessage}>{showErrorMessageText}</Text>
        )}
        <Pressable
          style={({ pressed }) => [
            styles.signInButton,
            pressed && { opacity: 1.8, backgroundColor: '#356ab0' },
          ]}
          onPress={handleSignIn}
        >
          <Text style={styles.signInButtonText}>Sign In</Text>
        </Pressable>
        <TouchableOpacity
          style={styles.buttonForgotPassword}
          onPress={() => {
            navigation.navigate('Forgot Password');
          }}
        >
          <Text style={styles.buttonForgotPassword}> Forgot Password? </Text>
        </TouchableOpacity>
        <Text style={styles.ss}>
          Dont have an account?{' '}
          <Text
            style={styles.ff}
            onPress={() => {
              navigation.replace('Sign Up Screen');
            }}
          >
            Create a New Account!
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  segmentControl: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 60,
    backgroundColor: 'lightgray',
    borderRadius: 8,
    overflow: 'hidden',
    width: '80%',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: '#5e8cc8',
  },
  tabText: {
    fontWeight: 'bold',
    color: 'gray',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  Heading: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
    marginBottom: 20,
  },
  HeadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5e8cc8',
  },
  input: {
    height: 40,
    width: 300,
    borderRadius: 15,
    borderColor: '#000000',
    color: 'black',
    margin: 12,
    borderWidth: 1,
   
    marginTop: 10,
    padding: 10,
    paddingHorizontal: 10,
  },
  invalidInput: {
    borderColor: 'black',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
  },
  signInButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000000',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 15,
    width: 300,
    padding: 10,
    backgroundColor: '#5e8cc8',
    marginTop: 10,
  },
  signInButtonText: {
    color: '#000000',
    alignItems: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  ss: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    marginTop: 10,
  },
  ff: {
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  buttonForgotPassword: {
    alignItems: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    justifyContent: 'center',
    color: 'black',
    marginTop: 7.5,
    marginBottom: 10,
  },
});