import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { colors } from './constants/colors';
import Map from './screens/Map';

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.primary500,
            },
            headerTintColor: colors.gray700,
            contentStyle: {
              backgroundColor: colors.gray700,
            },
          }}
        >
          <stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation: { navigate } }) => ({
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon={'add'}
                  size={24}
                  color={tintColor}
                  onPress={() => navigate('AddPlace')}
                />
              ),
              title: 'Favourite Places',
            })}
          />
          <stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: 'Add a New Place',
            }}
          />
          <stack.Screen name="Map" component={Map} />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
}
