export const orderStatuses: {
  [
    key: string | "waiting_payment" | "processing" | "delivering" | "done"
  ]: string;
} = {
  waiting_payment: "Menunggu pembayaran",
  processing: "Sedang diproses",
  delivering: "Dalam pengantaran",
  done: "Selesai",
};
