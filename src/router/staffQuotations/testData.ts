import { QuotationsProps } from "./types";

export const quotations: QuotationsProps[] = Array.from(
  { length: 31 },
  (_, i) => ({
    id: `Q${i + 1}`,
    expiredAt: `2022-01-0${(i % 9) + 1}`,
    createdAt: `2022-01-0${(i % 9) + 1}`,
    lastUpdatedAt: `2022-01-0${(i % 9) + 1}`,
    createdBy: `Staff ${i + 1}`,
    lastUpdatedBy: `Staff ${i + 1}`,
    customer: `Customer ${i + 1}`,
    staff: `Staff ${i + 1}`,
    amount: (i + 1) * 100000,
    status: "pending",
  })
);
