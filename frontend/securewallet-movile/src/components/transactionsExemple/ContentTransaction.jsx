import NumberTransaction from "./NumberTransaction";

const transactions = [
  { number: +100, transaction: "Deposito" },
  { number: -200, transaction: "Retiro" },
  { number: +250, transaction: "Deposito" },
  { number: -2, transaction: "Cafe" },
  { number: -10, transaction: "Suscripcion" },
  { number: -50, transaction: "Retiro" },
  { number: +300, transaction: "Deposito" },
  { number: -75, transaction: "Restaurante" },
  { number: +400, transaction: "Pago" },
  { number: -15, transaction: "Regalo" },
  { number: +500, transaction: "Ahorro" },
  { number: -100, transaction: "Compra" },
  { number: +50, transaction: "Interes" },
  { number: -25, transaction: "Taxi" },
  { number: +120, transaction: "Deposito" },
  { number: -30, transaction: "Entretenimiento" }
];

function ContentTransaction() {
  return (
    <ul>
      {transactions.map((transaction, index) => (
        <li
          key={index}
          style={{ display: "flex", justifyContent: "start" }}
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
