import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TaskListScreen from '../screens/TaskListScreen';
import AddEditTaskScreen from '../screens/AddEditTaskScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';

type RootStackParamList = {
  taskList: undefined;
  addTask: { taskId?: number };
  taskDetail: { taskId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Navigation structure matching the design's "stack" navigation
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="taskList"
        screenOptions={{
          headerShown: false, // Custom headers are used in components
        }}
      >
        <Stack.Screen name="taskList" component={TaskListScreen} />
        <Stack.Screen name="addTask" component={AddEditTaskScreen} />
        <Stack.Screen name="taskDetail" component={TaskDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;