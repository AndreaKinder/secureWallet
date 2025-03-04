import { Stack } from "expo-router";
import { View } from "react-native";
import Transactions from "@/src/screens/Transactions";

/**
 * A layout component that renders a <p>User</p> element above the Transactions screen.
 *
 * @returns {React.ReactElement} A JSX element representing the layout.
 */
function TransactionsLayout() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <h1 style={{marginTop: 10, marginBottom: 10}} >{exportUsername() || "User"}</h1>
        <Transactions />
      </View>  );
}

export default TransactionsLayout;

