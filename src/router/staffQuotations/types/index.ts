export type QuotationsProps = {
  id: string;
  expireAt: string;
  staffId: string;
  customerId: string;
  status: "Requested" | "processing" | "success" | "failed";
};
