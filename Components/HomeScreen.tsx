import React from 'react';
import { View, Text, Pressable, TouchableOpacity, StyleSheet } from 'react-native';

interface HomeScreenProps {
  navigation: any;
  route: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {

  const { dataFromsignInScreen } = route.params;

  const handleResourcePress = (resource: string) => {
    // Handle button press based on the selected resource (e.g., navigate to a new screen)
    console.log(`Button pressed: ${resource}`);
  };

  return (

  <View style={styles.container}>
      <Text style={styles.head}>Welcome User {dataFromsignInScreen}</Text>
      <Text style={styles.heading}>View JSONPlaceholder 6 Resources</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.column}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? '#4a6da7' : '#5e8cc8' },
            ]}
            onPress={() => { navigation.navigate('Posts', { dataFromsignInScreen }); }}
          >
            {({ pressed }) => (
              <Text style={[styles.buttonText, { color: pressed ? 'white' : 'black' }]}>Posts</Text>
            )}
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? '#4a6da7' : '#5e8cc8' },
            ]}
            onPress={() => { navigation.navigate('Comments', { dataFromsignInScreen }); }}
          >
            {({ pressed }) => (
              <Text style={[styles.buttonText, { color: pressed ? 'white' : 'black' }]}>Comments</Text>
            )}
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? '#4a6da7' : '#5e8cc8' },
            ]}
            onPress={() => { navigation.navigate('Albums', { dataFromsignInScreen }); }}
          >
            {({ pressed }) => (
              <Text style={[styles.buttonText, { color: pressed ? 'white' : 'black' }]}>Albums</Text>
            )}
          </Pressable>
        </View>
        <View style={styles.column}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? '#4a6da7' : '#5e8cc8' },
            ]}
            onPress={() => { navigation.navigate('Photos', { dataFromsignInScreen }); }}
          >
            {({ pressed }) => (
              <Text style={[styles.buttonText, { color: pressed ? 'white' : 'black' }]}>Photos</Text>
            )}
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? '#4a6da7' : '#5e8cc8' },
            ]}
            onPress={() => { navigation.navigate('Todos', { dataFromsignInScreen }); }}
          >
            {({ pressed }) => (
              <Text style={[styles.buttonText, { color: pressed ? 'white' : 'black' }]}>Todos</Text>
            )}
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? '#4a6da7' : '#5e8cc8' },
            ]}
            onPress={() => { navigation.navigate('Users', { dataFromsignInScreen }); }}
          >
            {({ pressed }) => (
              <Text style={[styles.buttonText, { color: pressed ? 'white' : 'black' }]}>Users</Text>
            )}
          </Pressable>
        </View>
      </View>
      <Text style={styles.heading2}>View List of all Students</Text>
      <Pressable
        style={({ pressed }) => [
          styles.button2,
          { backgroundColor: pressed ? '#4a6da7' : '#5e8cc8' },
        ]}
        onPress={() => { navigation.navigate('Students List'); }}
      >
        {({ pressed }) => (
          <Text style={[styles.buttonText, { color: pressed ? 'white' : 'black' }]}>Student List</Text>
        )}
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.buttonsignout,
          { backgroundColor: pressed ? '#8b0000' : 'red' },
        ]}
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Sign In Screen' }] })}
      >
        {({ pressed }) => (
          <Text style={[styles.buttonText, { color: pressed ? 'black' : 'black' }]}>Sign Out</Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    color: 'black',
    fontSize: 40,
    marginTop: -40,
    marginBottom: 60,
  },
  heading: {
    color: 'black',
    fontSize: 20,
    marginTop: -50,
    marginBottom: 20,
  },
  heading2: {
    color: 'black',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5e8cc8',
    padding: 15,
    marginBottom: 10,
    width: 120,
    alignItems: 'center',
    borderRadius: 10,
  },
  button2: {
    backgroundColor: '#5e8cc8',
    padding: 20,
    marginBottom: 10,
    width: 140,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsignout: {
    backgroundColor: '#5e8cc8',
    padding: 20,
    marginTop: 40,
    width: 120,
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default HomeScreen;
