/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export interface FormFields {
  id?: string;
  amount: string;
  name: string;
  description: string;
  date: any;
  category: string;
}

export type RootStackParamList = {
  Modal: undefined;
  Dashboard: undefined;
  ExpenseForm: {
    type: 'add' | 'edit';
    initialValue?: FormFields;
  };
  ExpenseDetails: {
    id: string;
  };
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
