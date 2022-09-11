import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
} from 'react-native';

import { useThemeColor } from './Themed';

interface TextFieldProps
  extends Omit<
    TextInputProps,
    'autoCorrect' | 'autoCapitalize' | 'autoComplete'
  > {
  startIcon?: JSX.Element;
  error?: string;
}

export default function TextField(props: TextFieldProps) {
  const { style, startIcon, ...otherProps } = props;
  const color = useThemeColor({}, 'tabIconSelected');

  return (
    <View>
      <View
        style={[
          style,
          styles.container,
          props.error ? { borderBottomColor: '#bb2e3e' } : {},
        ]}
      >
        <View style={{ marginHorizontal: 8 }}>
          {startIcon ? startIcon : <></>}
        </View>
        <TextInput
          style={[styles.input, style, { color: 'black' }]}
          {...otherProps}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          placeholderTextColor="gray"
        />
      </View>
      <Text style={styles.error}>{props.error || ''}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    minHeight: 35,
    color: 'white',
  },
  error: {
    marginTop: 5,
    marginLeft: 5,
    color: '#bb2e3e'
  },
});
