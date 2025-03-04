import NumberTransaction from "./NumberTransaction";

const transactions = [
  { number: 100, transaction: "deposito" },
  { number: 200, transaction: "retiro" },
  { number: 250, transaction: "deposito" },
  { number: -2, transaction: "cafe" },
  { number: -10, transaction: "suscripcion" },
  { number: 50, transaction: "retiro" },
];

function ContentTransaction() {
  return (
    <ul>
      {transactions.map((transaction, index) => (
        <li
          key={index}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <NumberTransaction
            transaction={transaction.transaction}
            number={transaction.number}
          />
        </li>
      ))}
    </ul>
  );
}

export default ContentTransaction;
