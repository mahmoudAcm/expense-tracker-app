import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

import { FormFields } from './types';

interface TrakerState {
  expenses: FormFields[];
  budget: number;
  setExpenses: Dispatch<SetStateAction<FormFields[]>>;
  setBudget: Dispatch<SetStateAction<number>>;
}

const Traker = createContext<TrakerState>({
  expenses: [],
  budget: 0,
  setExpenses: () => {},
  setBudget: () => {},
});

export const useTraker = () => {
  return useContext(Traker);
};

export default function TrakerProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [expenses, setExpenses] = useState<FormFields[]>([]);
  const [budget, setBudget] = useState(0);

  return (
    <Traker.Provider value={{ expenses, budget, setExpenses, setBudget }}>
      {children}
    </Traker.Provider>
  );
}
