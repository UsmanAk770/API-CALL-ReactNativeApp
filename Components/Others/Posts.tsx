import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
const baseUrl = 'https://jsonplaceholder.typicode.com/posts';
interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface UserPostsDataScreenProps {
  navigation: any;
  route: any;
}

const UserPostsDataScreen: React.FC<UserPostsDataScreenProps> = ({ navigation, route }) => {
  const { dataFromsignInScreen } = route.params;
  const userIdToFilter = parseInt(dataFromsignInScreen, 10);
  const [data, setData] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  //       const userData: Post[] = await response.json();
  //       setData(userData);
  //       setIsLoaded(false);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const userData: Post[] = response.data;
        setData(userData);
        setIsLoaded(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [selectedUser, setSelectedUser] = useState<Post | null>(null);

  const handleUserClick = (user: Post) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  const filteredData = data.filter((item) => item.userId === userIdToFilter);

  return (
    <View style={styles.container}>
      {isLoaded ? (
        <View style={styles.whiteOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : selectedUser ? (
        <View style={styles.item}>
          <Text style={styles.srNumber}>Sr# {selectedUser.id}</Text>
          <Text style={styles.userId}>User ID: {selectedUser.userId}</Text>
          <Text style={styles.title}>Title: {selectedUser.title}</Text>
          <Text style={styles.body}>Body: {selectedUser.body}</Text>
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
            <TouchableOpacity style={styles.item} onPress={() => handleUserClick(item)}>
              <Text style={styles.srNumber}>Sr# {item.id}</Text>
              <Text style={styles.userId}>User ID: {item.userId}</Text>
              <Text style={styles.title}>Title: {item.title}</Text>
              <Text style={styles.body}>Body: {item.body}</Text>
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
  },
  srNumber: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  userId: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  body: {
    fontSize: 16,
    color: '#fff',
  },
  whiteOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    marginTop: 15,
    marginBottom: 10,
    width: 120,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default UserPostsDataScreen;
