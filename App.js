


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Camerascreen from './screens/Camerascreen';
import DayView from './screens/DayView';
import GalleryScreen from './screens/GalleryScreen';
import Homescreen from './screens/Homescreen';
import InfoScreen from './screens/InfoScreen';
import ThirdScreen from './screens/ThirdScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (


    <NavigationContainer>
    <Stack.Navigator initialRouteName='home' 
     screenOptions={{
     headerShown: false
   }}
  >
   
      <Stack.Screen name="home" component={Homescreen} />
      <Stack.Screen name="second" component={Camerascreen} />
      <Stack.Screen name="third" component={ThirdScreen} />
      <Stack.Screen name="gallery" component={GalleryScreen} />
      <Stack.Screen name="info" component={InfoScreen} />
      <Stack.Screen name="dayview" component={DayView} />
    </Stack.Navigator>
  </NavigationContainer>






  );
}

