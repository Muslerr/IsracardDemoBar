import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlaceholderScreen from '../screens/PlaceholderScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Placeholder"
        component={PlaceholderScreen}
        options={{ title: 'Isracard Demo' }}
      />
    </Stack.Navigator>
  );
}
