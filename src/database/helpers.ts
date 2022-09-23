export type nameFields<T> = {
  [P in keyof T]: string;
}

interface Entity<T> {
  tableName: string;
  namesFields: nameFields<T>;
}