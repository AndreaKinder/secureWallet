import { TextInput, View } from "react-native";
import styles from "../styles";

export default function TextInputUsername({ username }) {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="USUARIO"
        value={username}
        autoCorrect={false}
        autoCapitalize="none"
      />
    </View>
  );
}
