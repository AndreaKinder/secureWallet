import ContentTransactions from "../components/transactionsExemple/ContentTransaction";
import { ScrollView } from "react-native";

function Transactions() {
  return (
    <ScrollView style={{ padding: 15 }}>
      <ContentTransactions />
    </ScrollView>
  )
}

export default Transactions;
