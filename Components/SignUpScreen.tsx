import * as React from 'react';
import { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform, Pressable, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface SignUpScreenProps {
  navigation: any;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [number, onChangeNumber] = useState('');
  const [password, onChangePassword] = useState('');
  const [cnfrmpassword, onChangeCnfrmPassword] = useState('');
  const [error, setError] = useState('');

  const handleTabChange = (value: boolean) => {
    setIsLogin(value);
    if (value === true) {
      navigation.replace('Sign In Screen');
    }
  };

  const handleSignUp = () => {
    if (!name && !email && !number && !password && !cnfrmpassword) {
      setError('All fields are required.');
      return;
    } else if (name === '') {
      setError('Please enter your name');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      onChangeEmail('');
      setError('Please enter a valid email address.');
      return;
    } else if (number.length < 11 || number.length > 13) {
      onChangeNumber('');
      setError('Please enter a valid 11 digits mobile number');
      return;
    } else if (password.length < 8) {
      onChangePassword('');
      onChangeCnfrmPassword('');
      setError('Password should be at least 8 characters long!');
      return;
    } else if (password !== cnfrmpassword) {
      onChangePassword('');
      onChangeCnfrmPassword('');
      setError("Passwords didn't match. Please enter passwords again.");
      return;
    }
    // Perform signUp logic here
    // ...
  };

  const handleNameChange = (text: string) => {
    onChangeName(text);
    // Hide the error message when email input is changed
    setError('');
  };

  const handleEmailChange = (text: string) => {
    onChangeEmail(text);
    // Hide the error message when password input is changed
    setError('');
  };

  const handleNumberChange = (text: string) => {
    onChangeNumber(text);
    // Hide the error message when email input is changed
    setError('');
  };

  const handlePasswordChange = (text: string) => {
    onChangePassword(text);
    // Hide the error message when password input is changed
    setError('');
  };
  const handleConfirmPasswordChange = (text: string) => {
    onChangeCnfrmPassword(text);
    // Hide the error message when email input is changed
    setError('');
  };

  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.segmentControl}>
          <TouchableOpacity
            style={[styles.tab, isLogin ? styles.activeTab : null]}
            onPress={() => handleTabChange(true)}>
            <Text style={isLogin ? styles.activeTabText : styles.tabText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, !isLogin ? styles.activeTab : null]}
            onPress={() => handleTabChange(false)}>
            <Text style={!isLogin ? styles.activeTabText : styles.tabText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Heading}>
          <Text style={styles.HeadingText}>Register your Account</Text>
        </View>
        <TextInput
          style={styles.inputname}
          value={name}
          placeholder="Enter Name"
          placeholderTextColor="black"
          keyboardType="default"
          onChangeText={handleNameChange}
          clearButtonMode={'always'}
        />
        <TextInput
          style={styles.inputemail}
          value={email}
          placeholder="Enter Email"
          placeholderTextColor="black"
          keyboardType="email-address"
          onChangeText={handleEmailChange}
          clearButtonMode={'always'}
        />
        <TextInput
          style={styles.inputnumber}
          value={number}
          placeholder="Enter Mobile Number"
          placeholderTextColor="black"
          keyboardType="phone-pad"
          onChangeText={handleNumberChange}
          clearButtonMode={'always'}
        />
        <TextInput
          style={styles.inputpassword}
          value={password}
          placeholder="Enter Password"
          placeholderTextColor="black"
          keyboardType="default"
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
          clearButtonMode={'always'}
        />
        <TextInput
          style={styles.inputpassword2}
          value={cnfrmpassword}
          placeholder="Confirm Password"
          placeholderTextColor="black"
          keyboardType="default"
          secureTextEntry={true}
          onChangeText={handleConfirmPasswordChange}
          clearButtonMode={'always'}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={({ pressed }) => [
            styles.buttonSignUp,
            pressed && { opacity: 1.8, backgroundColor: '#356ab0' },
          ]}
          onPress={handleSignUp}>
          <Text style={styles.buttonSignUpText}> Sign Up </Text>
        </Pressable>

        <Text style={styles.ss}>
          If Already have an account?{' '}
          <Text style={styles.ff} onPress={() => { navigation.replace('Sign In Screen'); }}>
            Sign in to Account!
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    //justifyContent: 'center',
    padding: 0,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  segmentControl: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: -10,
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
  Heading: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45,
    marginBottom: 20,
  },
  HeadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5e8cc8',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputname: {
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
  inputemail: {
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
  inputnumber: {
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
  inputpassword: {
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
  inputpassword2: {
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
  buttonSignUp: {
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
  buttonSignUpText: {
    color: '#000000',
    alignItems: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  ss: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    marginTop: 25,
  },
  ff: {
    color: 'green',
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 12,
    alignSelf: 'center',
    padding: 10,
  },
});

export default SignUpScreen;
