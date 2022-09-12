import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import uuid from 'react-native-uuid';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';

import TextField from '../components/TextField';
import Button from '../components/Button';
import { RootStackScreenProps, FormFields } from '../types';
import { useTraker } from '../context';
import i18n, { locale } from '../i18n';

const initialValues: FormFields = {
  amount: '',
  name: '',
  description: '',
  date: new Date().toLocaleDateString(locale),
  category: '',
};

const messages: Record<string, string> = {
  name: i18n.t('name_field_required'),
  amount: i18n.t('amount_field_required'),
};

export default function AddExpenseScreen({
  route,
  navigation,
}: RootStackScreenProps<'ExpenseForm'>) {
  const { setExpenses } = useTraker();
  const [state, setState] = useState(
    route.params.initialValue ?? initialValues,
  );
  const [errors, setErros] = useState<Partial<FormFields>>({});

  useEffect(() => {
    navigation.setOptions({
      title: route.params.type === 'add' ? i18n.t('add_entry') : i18n.t('edit'),
    });
    // console.log(route.params.initialValue);
  }, [route, navigation]);

  const handleChange = (name: keyof FormFields, data: string) => {
    setState((prev) => ({
      ...prev,
      [name]: name === 'amount' ? data.trim() : data,
    }));
  };

  const handleSave = () => {
    let found = 0;
    Object.entries(state).forEach((entry) => {
      if (!entry[1] && entry[0] in messages) {
        setErros((prev) => ({ ...prev, [entry[0]]: messages[entry[0]] }));
        found = 1;
      } else if (entry[0] in messages) {
        setErros((prev) => ({ ...prev, [entry[0]]: '' }));
      }
    });

    if (found == 1) return;

    if (
      !state.amount.match(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
      )
    ) {
      setErros((prev) => ({
        ...prev,
        amount: i18n.t('not_valid_amount_number'),
      }));
      return;
    }

    setErros({});
    setState(initialValues);
    if (route.params.type === 'add') {
      setExpenses((items) => [
        { id: uuid.v4().toString(), ...state },
        ...items,
      ]);
      navigation.navigate('Dashboard');
    } else {
      setExpenses((items) => {
        return items.map((item) => {
          if (item.id === route.params.initialValue?.id) return state;
          return item;
        });
      });
      navigation.navigate('ExpenseDetails', {
        id: route.params.initialValue?.id!,
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <DatePicker
          mode="calendar"
          style={{ backgroundColor: 'transparent', marginBottom: -40 }}
          onDateChange={handleChange.bind(null, 'date')}
          selected={getFormatedDate(new Date(), 'YYYY-MM-DD')}
          options={{
            mainColor: '#F4722B',
          }}
        />
        <TextField
          placeholder={i18n.t('name')}
          style={styles.textField}
          startIcon={<FontAwesome name="user" size={18} color="gray" />}
          value={state.name}
          onChangeText={handleChange.bind(null, 'name')}
          error={errors.name}
        />
        <TextField
          placeholder={i18n.t('amount')}
          style={styles.textField}
          startIcon={<FontAwesome name="money" size={17} color="gray" />}
          value={state.amount}
          onChangeText={handleChange.bind(null, 'amount')}
          keyboardType="decimal-pad"
          error={errors.amount}
          maxLength={9}
        />
        <TextField
          placeholder={i18n.t('category')}
          style={styles.textField}
          startIcon={<FontAwesome name="tags" size={18} color="gray" />}
          value={state.category}
          onChangeText={handleChange.bind(null, 'category')}
        />
        <TextField
          placeholder={i18n.t('description')}
          style={styles.textField}
          multiline
          startIcon={<FontAwesome name="navicon" size={18} color="gray" />}
          value={state.description}
          onChangeText={handleChange.bind(null, 'description')}
        />
        <Button
          style={styles.submitButton}
          textStyle={{ fontWeight: 'bold', paddingHorizontal: 20 }}
          onPress={handleSave}
        >
          {i18n.t('save_data')}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  textField: {
    width: '90%',
  },
  submitButton: {
    marginTop: 10,
    elevation: 0,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
