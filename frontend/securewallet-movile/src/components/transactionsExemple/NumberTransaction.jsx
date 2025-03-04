function NumberTransaction({ transaction, number }) {
  return (
    <div style={{ display: "inline" }}>
      <p>{transaction}</p>
      <p>{number}</p>
    </div>
  );
}

export default NumberTransaction;
