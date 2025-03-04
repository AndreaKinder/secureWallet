import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { handleLogin, setupRoutes } from "../../scripts/handleAuth";
import { useRouter } from "expo-router";
import styles from "../components/styles";

const LoginScreen = ({onLoginSuccessProp}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setError(null);
    console.log("LoginScreen montado");

    return () => {
      console.log("LoginScreen desmontado");
    };
  }, []);

  const submitLogin = async () => {
    setLoading(true);
    try {
      const response = await handleLogin(username, password);

      if (response.status === 200) {
        console.log("Login exitoso:", response.data);
        setupRoutes();
        onLoginSuccessProp(true);
      } else if (response.status === 422) {
        console.error("Error de validacion:", response.data);
        setError(response.data.detail);
        onLoginSuccessProp(false);
      } else {
        console.error("Error en el login:", response.status, response.data);
        setError(response.statusText);
        onLoginSuccessProp(false);
      }
    } catch (error) {
      console.error("Error en el login:", error.message);
      setError(error.message);
      onLoginSuccessProp(false);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name, value) => {
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesion</Text>
      <TextInput
        placeholder="Usuario"
        style={styles.input}
        value={username}
        onChangeText={(value) => handleInputChange("username", value)}
      />
      <TextInput
        placeholder="Contrasenya"
        style={styles.input}
        value={password}
        onChangeText={(value) => handleInputChange("password", value)}
        secureTextEntry={true}
      />
      <Button
        title="Iniciar sesion"
        onPress={submitLogin}
        disabled={loading}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}
export default LoginScreen;

