import {
  View,
  ViewProps,
  Text,
  TextProps,
  Pressable,
  PressableProps,
  StyleSheet,
} from 'react-native';

interface ButtonProps {
  children: TextProps['children'];
  style?: Omit<ViewProps['style'], 'elevation'>;
  textStyle?: TextProps['style'];
  onPress?: PressableProps['onPress'];
}

export default function Button(props: ButtonProps) {
  const { style, children, textStyle, onPress } = props;
  return (
    <View style={[styles.button, style]}>
      <Pressable android_ripple={{ color: '#ccc' }} onPress={onPress}>
        <Text style={[styles.text, textStyle]}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    elevation: 2,
    backgroundColor: '#2196f3',
    borderRadius: 5,
    overflow: 'hidden',
  },
  text: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    color: 'white',
    textAlign: 'center'
  },
});
