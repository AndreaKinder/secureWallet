import React, { useState } from "react";
import { View } from "react-native";
import styles from "../styles";
import TextInputUsername from "./TextInputUsername";
import TextInputPassword from "./TextInputPassword";

export default function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.inputView}>
      <TextInputUsername
        value={username}
        onChangeText={setUsername}
        handleLogin={handleLogin}
        password={password}
      />
      <TextInputPassword
        value={password}
        onChangeText={setPassword}
        handleLogin={handleLogin}
        username={username}
      />
    </View>
  );
}
