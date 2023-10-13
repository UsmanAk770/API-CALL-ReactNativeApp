import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ActivityIndicator, Switch } from 'react-native-paper'; // Import Switch from react-native-paper
import axios from 'axios';

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

interface TodoScreenProps {
  navigation: any;
  route: any;
}

const TodosScreen: React.FC<TodoScreenProps> = ({ navigation, route }) => {
  const [data, setData] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        const todosData: Todo[] = await response.data;
        setData(todosData);
        setIsLoaded(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const { dataFromsignInScreen } = route.params;
  const userIdToFilter = parseInt(dataFromsignInScreen, 10);
  const filteredData = data.filter(item => item.userId === userIdToFilter);

  const toggleCompletedStatus = (item: Todo) => {
    const updatedData = data.map((todo) => {
      if (todo.id === item.id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setData(updatedData);
  };

  return (
    <View style={styles.container}>
      {isLoaded ? (
        <View style={styles.whiteOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.label}>Sr#: {item.id}</Text>
              <Text style={styles.label}>User ID: {item.userId}</Text>
              <Text style={styles.label}>Title: {item.title}</Text>
              <View style={styles.checkboxContainer}>
                <Switch // Use Switch for checkbox functionality
                  value={item.completed}
                  onValueChange={() => toggleCompletedStatus(item)}
                  color="green" // Set the color for the Switch when it's on
                />
                <Text style={[styles.label, { color: item.completed ? 'green' : 'red' }]}>
                  Completed: {item.completed ? 'YES' : 'NO'}
                </Text>
              </View>
            </View>
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
    marginBottom: 8,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TodosScreen;
