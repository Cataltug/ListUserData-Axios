
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';


const UserList = () => {
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = () => {
    setLoading(true);
    setError(null);

    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(err => {
        console.log('There was an error with the axios request:', err);
        setError('Error fetching data.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(fetchUsers, []);

  return (
    <SafeAreaView styles = {{flex: 1}}>
      
        <Button title="Fetch Again" onPress={fetchUsers} />

        {loading && (
          <View style={styles.center}>
            <ActivityIndicator size="large" />
            <Text>Loading...</Text>
          </View>
        )}

        {error && <Text style={styles.error}>{error}</Text>}

        {!loading && !error && (
          <FlatList
            data={users}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
            )}
          />
        )}
      
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16 
  },
  center: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
  },
  item: { 
    padding: 12, 
    borderBottomWidth: 1, 
    borderColor: "gray"
  },
  name: { 
    fontSize: 16, 
    fontWeight: "600" 
  },
  email: { 
    fontSize: 14, 
    color: "gray" 
  },
  error: { 
    color: "red", 
    marginVertical: 8, 
    textAlign: "center" 
  },
});

export default UserList;