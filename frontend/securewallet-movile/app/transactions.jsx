import { Stack } from "expo-router";

function TransactionsLayout() {
    return (
        <Stack>
            <Stack.Screen name="transactions" component={Transactions} />
        </Stack>
    );
}

export default TransactionsLayout;

