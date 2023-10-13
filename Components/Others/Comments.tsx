import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

interface CommentScreenProps {
  navigation: any;
  route: any;
}

const UserCommentsDataScreen:  React.FC<CommentScreenProps> = ({ navigation, route }) => {
  const [data, setData] = useState<Comment[]>([]);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/comments");
        const postData: Comment[] = await response.json();
        setData(postData);
        setIsLoaded(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [selectedUser, setSelectedUser] = useState<Comment | null>(null);

  const handleUserClick = (user: Comment) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  const { dataFromsignInScreen } = route.params;
  const userIdToFilter = parseInt(dataFromsignInScreen, 10);
  const filteredData = data.filter((item) => item.postId === userIdToFilter);

  return (
    <View style={styles.container}>
      {isLoaded ? (
        <View style={styles.whiteOverlay}><ActivityIndicator size="large" color="#0000ff" /></View>
      ) : selectedUser ? (
        <View style={styles.item}>
        <Text style={styles.srNumber}>Sr# {selectedUser.id}</Text>
              <Text style={styles.postId}>Post ID: {selectedUser.postId}</Text>
              <Text style={styles.name}>Name: {selectedUser.name}</Text>
              <Text style={styles.email}>Email: {selectedUser.email}</Text>
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
            <TouchableOpacity  style={styles.item} onPress={() => handleUserClick(item)}>
              <Text style={styles.srNumber}>Sr# {item.id}</Text>
              <Text style={styles.postId}>Post ID: {item.postId}</Text>
              <Text style={styles.name}>Name: {item.name}</Text>
              <Text style={styles.email}>Email: {item.email}</Text>
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
    fontSize: 18,
    fontWeight:'bold', 
    color: '#fff',
  },
  postId: {
    fontSize: 16,
    fontWeight:'bold',
    color: '#fff',
  },
  name: {
    fontSize: 16,
    fontWeight:'bold',
    color: '#fff',
  },
  email: {
    fontSize: 16,
    fontWeight:'bold',
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
    justifyContent: 'center'      
 },
 button: {
  backgroundColor: 'black',
  padding: 15,
  marginTop:15,
  marginBottom: 10,
  width: 120,
  alignItems: 'center',
  borderRadius: 10,
},
buttonText: {
  fontSize: 16,
},
});

export default UserCommentsDataScreen;
