export type Debt = Readonly<{
  id: string;
  name: string;
  balance: number;
  dueDate?: string;
}>;
