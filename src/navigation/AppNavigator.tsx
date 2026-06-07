import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import BookDetailsScreen from '../screens/BookDetailsScreen';
import { RootStackParamList } from './navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookDetails"
        component={BookDetailsScreen}
        options={{ title: 'Book Details' }}
      />
    </Stack.Navigator>
  );
}
