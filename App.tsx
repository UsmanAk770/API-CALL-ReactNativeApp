import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPasswordScreen from './Components/ForgotPasswordScreen';
import SignIn from './Components/SignInScreen';
import SignUp from './Components/SignUpScreen';
import Home from './Components/HomeScreen';
import StudentsList from './Components/StudentList/StudentList';
import Posts from './Components/Others/Posts';
import Albums from './Components/Others/Albums';
import Comments from './Components/Others/Comments';
import Photos from './Components/Others/Photos';
import Todos from './Components/Others/Todos';
import Users from './Components/Others/Users';

export default function App() {
   
  const Stack = createNativeStackNavigator();
   return (

  <NavigationContainer independent={true}>
          
          <Stack.Navigator>

              <Stack.Screen name="Sign In Screen" component={SignIn} options={{
                title:"Log In",
          headerStyle: {
            backgroundColor: '#5e8cc8',
            // textAlign:"center", 
          },
          headerTintColor: '#000000',
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 35,
            fontWeight: 'bold',
          },}}/>
          <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} options={{
          headerStyle: {
            backgroundColor: '#5e8cc8',
          },
          headerTitleAlign: "center",
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontSize: 27.5,
            fontWeight: 'bold',
          },}}/>
          <Stack.Screen name="Sign Up Screen" component={SignUp} options={{
            title:"Sign Up",
          headerStyle: {
            backgroundColor: '#5e8cc8',
          },
          headerTitleAlign: "center",
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontSize: 35,
            fontWeight: 'bold',
          },}}/>
          <Stack.Screen name="Home" component={Home} options={{
          headerStyle: {
            backgroundColor: '#5e8cc8',
          },
          headerTitleAlign: "center",
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontSize: 35,
            fontWeight: 'bold',
          },}}/>
          <Stack.Screen name="Students List" component={StudentsList} options={{
            title:"Students List",
          headerStyle: {
            backgroundColor: '#5e8cc8',
          },
          headerTitleAlign: "center",
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontSize: 35,
            fontWeight: 'bold',
          },}}/>  
          <Stack.Screen name="Posts" component={Posts} options={{
            title:"Posts",
          headerStyle: {
            backgroundColor: '#5e8cc8',
          },
          headerTitleAlign: "center",
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontSize: 35,
            fontWeight: 'bold',
          },}}/>
          <Stack.Screen name="Photos" component={Photos} options={{
            title:"Photos",
          headerStyle: {
            backgroundColor: '#5e8cc8',
          },
          headerTitleAlign: "center",
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontSize: 35,
            fontWeight: 'bold',
          },}}/>
          <Stack.Screen name="Comments" component={Comments} options={{
            title:"Comments",
          headerStyle: {
            backgroundColor: '#5e8cc8',
          },
          headerTitleAlign: "center",
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontSize: 35,
            fontWeight: 'bold',
          },}}/>
          <Stack.Screen name="Todos" component={Todos} options={{
            title:"Todo's",
          headerStyle: {
            backgroundColor: '#5e8cc8',
          },
          headerTitleAlign: "center",
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontSize: 35,
            fontWeight: 'bold',
          },}}/>
          <Stack.Screen name="Albums" component={Albums} options={{
            title:"Albums",
          headerStyle: {
            backgroundColor: '#5e8cc8',
          },
          headerTitleAlign: "center",
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontSize: 35,
            fontWeight: 'bold',
          },}}/>
          <Stack.Screen name="Users" component={Users} options={{
            title:"Users",
          headerStyle: {
            backgroundColor: '#5e8cc8',
          },
          headerTitleAlign: "center",
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontSize: 35,
            fontWeight: 'bold',
          },}}/>

          </Stack.Navigator>

     </NavigationContainer>
   );
}