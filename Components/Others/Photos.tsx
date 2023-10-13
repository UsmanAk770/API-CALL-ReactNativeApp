import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
}

interface PhotoScreenProps {
  navigation: any;
  route: any;
}

const PhotosScreen:  React.FC<PhotoScreenProps> = ({ navigation, route }) => {
  const [data, setData] = useState<Photo[]>([]);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/photos");
        const photosData: Photo[] = await response.json();
        setData(photosData);
        setIsLoaded(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [selectedUser, setSelectedUser] = useState<Photo | null>(null);

  const handleUserClick = (user: Photo) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  const { dataFromsignInScreen } = route.params;
  const userIdToFilter = parseInt(dataFromsignInScreen, 10);
  const filteredData = data.filter((item) => item.albumId === userIdToFilter);

  return (
    <View style={styles.container}>
      {isLoaded ? (
        <View style={styles.whiteOverlay}><ActivityIndicator size="large" color="#0000ff" /></View>
      ) : selectedUser ? (
        <View style={styles.item}>
          <Image
            source={{ uri: selectedUser.url }}
            style={styles.image}
          />
          <Text style={styles.label}>Sr#: {selectedUser.id}</Text>
          <Text style={styles.label}>Album ID: {selectedUser.albumId}</Text>
          <Text style={styles.label}>Title: {selectedUser.title}</Text>
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
              <Image
                source={{ uri: item.url }}
                style={styles.image}
              />
              <Text style={styles.label}>Sr#: {item.id}</Text>
              <Text style={styles.label}>Album ID: {item.albumId}</Text>
              <Text style={styles.label}>Title: {item.title}</Text>
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
  image: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
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

export default PhotosScreen;
