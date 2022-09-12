import { useEffect, useMemo } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import { Text } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Button from '../components/Button';
import { useTraker } from '../context';
import i18n, { locale } from '../i18n';

export default function ExpenseDetailsScreen({
  navigation,
  route,
}: RootStackScreenProps<'ExpenseDetails'>) {
  const { setExpenses, expenses } = useTraker();

  const selectedExpense = useMemo(
    () => expenses.find(({ id }) => route.params.id === id),
    [route, navigation, expenses],
  );

  useEffect(() => {
    navigation.setOptions({
      title: i18n.t('expense_details'),
      headerRight: () => (
        <AntDesign
          name="delete"
          size={24}
          onPress={handleDelete}
          color="white"
        />
      ),
    });
  }, [navigation]);

  const handleOnSure = () => {
    if (!selectedExpense) return;
    setExpenses((items) => items.filter(({ id }) => route.params.id !== id));
    navigation.navigate('Dashboard');
  };

  const handleDelete = () => {
    Alert.alert('Alert!', i18n.t('delete_expense_alert'), [
      { text: i18n.t('sure'), onPress: handleOnSure },
      { text: i18n.t('cancel') },
    ]);
  };

  const handleEdit = () => {
    navigation.navigate('ExpenseForm', {
      type: 'edit',
      initialValue: selectedExpense,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <View style={styles.row}>
          <FontAwesome name="user" size={20} color="gray" />
          <Text style={{ flex: 1, marginLeft: 12 }}>
            {selectedExpense?.name}
          </Text>
        </View>
        <View style={styles.row}>
          <FontAwesome name="tags" size={20} color="gray" />
          <Text style={{ flex: 1, marginLeft: 7 }}>
            {selectedExpense?.category}
          </Text>
          <Text style={{ fontWeight: 'bold' }}>
            {selectedExpense?.amount} $
          </Text>
        </View>
        <View style={styles.row}>
          <FontAwesome name="calendar" size={20} color="gray" />
          <Text style={{ flex: 1, marginLeft: 10 }}>{i18n.t('date')}</Text>
          <Text>
            {new Date(selectedExpense?.date).toLocaleDateString(locale)}
          </Text>
        </View>
        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <FontAwesome name="navicon" size={20} color="gray" />
          <Text style={{ flex: 1, marginLeft: 10 }}>{i18n.t('remark')}</Text>
          <Text style={styles.discription}>{selectedExpense?.description}</Text>
        </View>
      </View>
      <Button
        style={styles.button}
        onPress={handleEdit}
        textStyle={{ fontStyle: 'italic' }}
      >
        <FontAwesome name="edit" /> {i18n.t('edit')}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  details: {
    marginTop: 40,
    marginBottom: 40,
    width: '90%',
    elevation: 4,
    borderRadius: 4,
    minHeight: 200,
    backgroundColor: 'white',
  },
  button: {
    width: 70,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  discription: {
    width: '60%',
    textAlign: 'justify',
  },
});
