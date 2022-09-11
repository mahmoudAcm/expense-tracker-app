import { StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Layout from '../constants/Layout';

import { View, Text } from './Themed';
import { FormFields } from '../types';

interface ExpenseCardProps extends FormFields {}

export default function ExpenseCard(props: ExpenseCardProps) {
  const navigation = useNavigation();

  const handleEdit = () => {
    navigation.navigate('ExpenseDetails', {
      id: props.id!,
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { flex: 1 }]}>
          {new Date(props.date).toDateString()}
        </Text>
        <Text style={styles.headerText}>Expense: {props.amount}</Text>
      </View>
      <Pressable
        style={styles.cardContent}
        android_ripple={{ color: '#ccc' }}
        onPress={handleEdit}
      >
        <Text style={{ flex: 1 }}>{props.category}</Text>
        <Text>{props.amount} $</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: Layout.window.width * 0.9,
    marginVertical: 6,
    borderRadius: 4,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#ccc0aa',
    width: Layout.window.width * 0.9,
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 1,
    alignItems: 'center',
    fontSize: 10,
  },
  headerText: {
    fontSize: 10,
    color: 'white',
  },
  cardContent: {
    paddingHorizontal: 5,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
