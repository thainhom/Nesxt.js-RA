export class Pagination {
  total: number;
  records: object[];
  constructor(total: number, records: object[]) {
    (this.total = total), (this.records = records);
  }
}
