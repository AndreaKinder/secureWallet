import { Stack } from "expo-router";
import { View } from "react-native";
import Transactions from "../src/screens/Transactions";
import { Text } from "react-native";
/**
 * A layout component that renders a <p>User</p> element above the Transactions screen.
 *
 * @returns {React.ReactElement} A JSX element representing the layout.
 */
function TransactionsLayout() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  <Text style={{ fontSize: 30, fontWeight: "bold", textTransform: "uppercase", textAlign: "center", color: "red" }}>Transactions List</Text>
  <Transactions />
<Text style={{ fontSize: 20, textAlign: "center", marginVertical: 20 }}>
  Información del Usuario: User
</Text>
<Text style={{ fontSize: 20, textAlign: "center", marginVertical: 20 }}>
  Localización: Barcelona, España
</Text>

      </View>  );
}

export default TransactionsLayout;

