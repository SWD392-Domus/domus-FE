export type QuotationsProps = {
  id: string;
  expiredAt: string;
  createdAt: string;
  lastUpdatedAt: string;
  createdBy: string;
  lastUpdatedBy: string;
  staff: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
};
