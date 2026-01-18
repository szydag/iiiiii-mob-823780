import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { StackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTasks, Task } from '../../App';

type RootStackParamList = {
  taskList: undefined;
  addTask: { taskId?: number };
  taskDetail: { taskId: number };
};
type Props = StackScreenProps<RootStackParamList, 'taskList'>;

// --- THEME ---
const THEME = {
  primary: '#2563EB',
  danger: '#EF4444',
  secondary: '#F3F4F6',
  white: '#FFFFFF',
  text: '#1F2937',
  success: '#10B981',
};

// --- COMPONENTS ---

// Component: Header
const AppHeader: React.FC<{ title: string; color: string; textColor: string; backButton?: boolean; navigation?: any }> = ({ title, color, textColor, backButton, navigation }) => (
  <View style={[styles.header, { backgroundColor: color }]}>
    {backButton && navigation && (
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color={textColor} />
      </TouchableOpacity>
    )}
    <Text style={[styles.headerTitle, { color: textColor }]}>{title}</Text>
  </View>
);

// Component: TodoItem
const TodoItem: React.FC<{ item: Task; onPress: (id: number) => void }> = ({ item, onPress }) => {
  const statusColor = item.isCompleted ? THEME.success : THEME.primary;
  const statusText = item.isCompleted ? 'Tamamlandı' : 'Bekliyor';

  return (
    <TouchableOpacity style={styles.listItem} onPress={() => onPress(item.id)}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.itemTitle, item.isCompleted && styles.itemCompletedTitle]}>
          {item.title}
        </Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
        <Text style={styles.statusText}>{statusText}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Component: FAB (Floating Action Button)
const FAB: React.FC<{ icon: string; color: string; action: () => void }> = ({ icon, color, action }) => (
  <TouchableOpacity style={[styles.fab, { backgroundColor: color }]} onPress={action}>
    <Icon name={icon} size={28} color={THEME.white} />
  </TouchableOpacity>
);


// --- SCREEN IMPLEMENTATION ---

const TaskListScreen: React.FC<Props> = ({ navigation }) => {
  const { tasks, fetchTasks } = useTasks();

  const handleNavigateToDetail = (taskId: number) => {
    // Action: navigateToDetail
    navigation.navigate('taskDetail', { taskId });
  };

  const handleNavigateToAdd = () => {
    // Action: navigateToAdd
    navigation.navigate('addTask', {});
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <AppHeader
        title="Yapılacaklar"
        color={THEME.primary}
        textColor={THEME.white}
      />

      {/* List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem item={item} onPress={handleNavigateToDetail} />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Henüz görev yok. Yeni bir tane ekleyin!</Text>
            <TouchableOpacity onPress={fetchTasks} style={{marginTop: 10}}>
                <Text style={{color: THEME.primary}}>Yenile</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={tasks.length === 0 && styles.listContainerEmpty}
      />

      {/* FAB */}
      <FAB
        icon="add" // Maps 'plus' to 'add' icon in Ionicons
        color={THEME.primary}
        action={handleNavigateToAdd}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.secondary,
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 15,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItem: {
    backgroundColor: THEME.white,
    padding: 15,
    marginVertical: 4,
    marginHorizontal: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 16,
    color: THEME.text,
  },
  itemCompletedTitle: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  statusText: {
    color: THEME.white,
    fontSize: 12,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    borderRadius: 30,
    elevation: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280'
  },
  listContainerEmpty: {
    flex: 1,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 18,
  }
});

export default TaskListScreen;