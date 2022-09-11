import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';

import ExpenseCard from '../components/ExpenseCard';
import { View, Text } from '../components/Themed';
import { useTraker } from '../context';
import { RootStackScreenProps } from '../types';

let data = [
  {
    id: '1',
    category: 'Car',
    amount: '100',
    date: 'Sep 20, 2022',
    name: '',
    description: '',
  },
];

function renderItem(
  budget: number,
  itemData: ListRenderItemInfo<typeof data[0]>,
) {
  if (itemData.index === 0) {
    return <Text style={styles.title}>Budget: {budget.toFixed(2)}</Text>;
  } else {
    return <ExpenseCard {...itemData.item} />;
  }
}

export default function DashboardScreen({
  navigation,
}: RootStackScreenProps<'Dashboard'>) {
  const { expenses, budget } = useTraker();
  const handleAddExpense = () => {
    navigation.navigate('ExpenseForm', {
      type: 'add',
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="add"
          size={24}
          onPress={handleAddExpense}
          color="white"
        />
      ),
    });
  }, [navigation]);

  let screen = (
    <FlatList
      data={[data[0], ...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
      contentContainerStyle={{
        marginTop: 25,
        alignItems: 'center',
        paddingBottom: 70,
      }}
      renderItem={renderItem.bind(null, budget)}
      keyExtractor={(item) => item.id || '0' }
    />
  );

  if (expenses.length === 0) {
    screen = (
      <View style={styles.emptyList}>
        <Text style={styles.emptyListText}>Create your first entry!</Text>
      </View>
    );
  }
  return screen;
}

const styles = StyleSheet.create({
  emptyList: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  emptyListText: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    overflow: 'hidden',
    width: '90%',
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
