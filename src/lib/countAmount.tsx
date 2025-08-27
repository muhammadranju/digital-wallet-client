/* eslint-disable @typescript-eslint/no-explicit-any */
export const countAmount = (transactionData: any) => {
  const cashInData = transactionData?.data.filter(
    (transaction: { type: string }) => transaction.type === "CASH_IN"
  );

  const cashOutData = transactionData?.data.filter(
    (transaction: { type: string }) => transaction.type === "CASH_OUT"
  );

  const totalCashInAmount = cashInData?.reduce(
    (total: any, transaction: { amount: any }) => total + transaction?.amount,
    0
  );
  const totalCashOutAmount = cashOutData?.reduce(
    (total: any, transaction: { amount: any }) => total + transaction.amount,
    0
  );

  return {
    totalCashInAmount,
    totalCashOutAmount,
  };
};
