export const orderStatuses: {
  [
    key:
      | string
      | "waiting_payment"
      | "waiting_payment_verification"
      | "processing"
      | "delivering"
      | "done"
  ]: string;
} = {
  waiting_payment: "Menunggu pembayaran",
  waiting_payment_verification: "Menunggu verifikasi pembayaran",
  processing: "Sedang diproses",
  delivering: "Dalam pengantaran",
  done: "Selesai",
};
