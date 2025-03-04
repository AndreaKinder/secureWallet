import { Text, StyleSheet } from "react-native";

function NumberTransaction({ transaction, number }) {
  return (
    <Text style={{ fontSize: 16 }}>
      {transaction} {number.toFixed(2)} 
    </Text>
  );
}

export default NumberTransaction;
