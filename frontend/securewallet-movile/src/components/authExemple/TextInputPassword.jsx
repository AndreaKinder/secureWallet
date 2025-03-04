import React from "react";
import { TextInput, View } from "react-native";
import styles from "../styles";

export default function TextInputPassword({ password }) {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="CONTRASEÑA"
        secureTextEntry
        value={password}
        autoCorrect={false}
        autoCapitalize="none"
        accessibilityLabel="Campo de entrada de contraseña" // Mejora la accesibilidad
      />
    </View>
  );
}

