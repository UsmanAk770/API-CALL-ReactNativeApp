import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import axios from 'axios';

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface Company {
  name: string;
}

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface UserScreenProps {
  navigation: any;
  route: any;
}

const UsersScreen:  React.FC<UserScreenProps> = ({ navigation, route }) => {
  const [data, setData] = useState<User[]>([]);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        const userData: User[] = await response.data;
        setData(userData);
        setIsLoaded(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  const { dataFromsignInScreen } = route.params;
  const userIdToFilter = parseInt(dataFromsignInScreen, 10);
  const filteredData = data.filter(item => item.id === userIdToFilter);

  return (
    <View style={styles.container}>
      {isLoaded ? (
        <View style={styles.whiteOverlay}><ActivityIndicator size="large" color="#0000ff" /></View>
      ) : selectedUser ? (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>UserID: {selectedUser.id}</Text>
          <Text style={styles.detailText}>Username: {selectedUser.username}</Text>
          <Text style={styles.detailText}>Name: {selectedUser.name}</Text>
          <Text style={styles.detailText}>Email: {selectedUser.email}</Text>
          <Text style={styles.detailText}> </Text>
          <Text style={styles.detailText}>Address: </Text>
          <Text style={styles.detailText}>Street: {selectedUser.address.street}</Text>
          <Text style={styles.detailText}>Suite: {selectedUser.address.suite}</Text>
          <Text style={styles.detailText}>City: {selectedUser.address.city}</Text>
          <Text style={styles.detailText}>Zipcode: {selectedUser.address.zipcode}</Text>
          <Text style={styles.detailText}> </Text>
          <Text style={styles.detailText}>Phone#: {selectedUser.phone}</Text>
          <Text style={styles.detailText}>Website: {selectedUser.website}</Text>
          <Text style={styles.detailText}>Company: {selectedUser.company.name}</Text>
          <Text style={styles.detailText}> </Text>
          {/* Add more detailed information here */}
          {/* <Button title="Back" onPress={handleBackClick} /> */}
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? 'black' : '#356ab0' },
            ]}
            onPress={handleBackClick}
          >
            {({ pressed }) => (
              <Text style={[styles.buttonText, { color: pressed ? 'white' : 'black' }]}>Go Back</Text>
            )}
          </Pressable>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleUserClick(item)}>
              <View style={styles.item}>
                <Text style={styles.label}>ID: {item.id}</Text>
                <Text style={styles.label}>Username: {item.username}</Text>
                <Text style={styles.label}>Name: {item.name}</Text>
                <Text style={styles.label}>Email: {item.email}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    paddingHorizontal: 16,
  },
  item: {
    backgroundColor: '#5e8cc8',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 16,
  },
  detailText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    marginBottom: 10,
    width: 120,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  whiteOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'      
  },
});

export default UsersScreen;
