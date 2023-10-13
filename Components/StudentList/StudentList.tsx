import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface Item {
  id: string;
  name: string;
  email: string;
  mobile: string;
  description: string;
  image: string;
}

const DetailsScreen: React.FC<{ selectedItem: Item; onBackPress: () => void }> = ({ selectedItem, onBackPress }) => {
  return (
    <View style={styles.detailsContainer}>
      <Image
        style={styles.detailsImage}
        resizeMode="cover"
        source={{ uri: selectedItem.image }}
      />
      <Text style={styles.detailsText}>User Id: {selectedItem.id}</Text>
      <Text style={styles.detailsText}>Name: {selectedItem.name}</Text>
      <Text style={styles.detailsText}>Email: {selectedItem.email}</Text>
      <Text style={styles.detailsText}>Mobile#: {selectedItem.mobile}</Text>
      <Text style={styles.descriptionText}>Description: {selectedItem.description}</Text>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#356ab0' : 'black' },
        ]}
        onPress={onBackPress}
      >
        {({ pressed }) => (
          <Text style={[styles.buttonText, { color: pressed ? 'black' : 'white' }]}>Go Back</Text>
        )}
      </Pressable>
    </View>
  );
};

const App: React.FC = () => {
  const [screen, setScreen] = useState('Home'); // Initial screen state
  const [data, setData] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  const getUserData = async () => {
    try {
      const response = await fetch("https://thapatechnical.github.io/userapi/users.json");
      const myData: Item[] = await response.json();
      setData(myData);
      setIsLoaded(false);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleListItemPress = (item: Item) => {
    setSelectedItem(item);
    setShowDetails(true);
  };

  const handleBackPress = () => {
    setShowDetails(false);
  };

  return (
    <View style={styles.container}>
      {isLoaded ? (
        <View style={styles.whiteOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : showDetails ? (
        <DetailsScreen selectedItem={selectedItem!} onBackPress={handleBackPress} />
      ) : (
        <View>
          <Text style={styles.mainheader}>List of Students</Text>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => handleListItemPress(item)}>
                  <View style={styles.card}>
                    <View style={styles.imagecontainer}>
                      <Image
                        style={styles.imagestyle}
                        resizeMode="cover"
                        source={{ uri: item.image }}
                      />
                    </View>
                    <View>
                      <View style={styles.bigDataContainer}>
                        <Text style={styles.bioData}>Bio Data</Text>
                        <Text style={styles.idNumber}>{item.id}</Text>
                      </View>
                      <View style={styles.mainContainer}>
                        <Text style={styles.myName}>Name : {item.name}</Text>
                        <Text style={styles.myName}>Email : {item.email}</Text>
                        <Text style={styles.myName}>Mobile# : {item.mobile}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainheader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333', // Text color
  },
  card: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Add elevation for Android shadow
  },
  imagecontainer: {
    alignItems: 'center',
  },
  imagestyle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 10,
  },
  bigDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  bioData: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  idNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  mainContainer: {
    marginTop: 10,
  },
  myName: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  listItem: {
    backgroundColor: '#5e8cc8',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5e8cc8',
    // padding: 50,
  },
  detailsImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  detailsText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
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

export default App;
