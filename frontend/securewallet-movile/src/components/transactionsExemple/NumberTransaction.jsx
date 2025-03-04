function NumberTransaction({ transaction, number }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}><p style={{ marginRight: "1em" }}>{transaction}</p><p>{number}</p></div>
  );
}

export default NumberTransaction;
