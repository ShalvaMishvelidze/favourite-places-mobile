import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

const BtnOutlined = ({ onPress, icon, children }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={18}
        color={colors.primary500}
        style={styles.icon}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default BtnOutlined;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: colors.primary500,
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
