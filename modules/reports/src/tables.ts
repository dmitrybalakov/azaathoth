import { Reports } from ".";

export class ReportsTables {
  TOP_ROW = Symbol('TOP_ROW');
  HEADER_ROW = Symbol('HEADER_ROW');
  SEPARATOR = Symbol('SEPARATOR');
  BOTTOM_ROW = Symbol('BOTTOM_ROW');
  
  constructor (
    public reports: Reports
  ) { }

  format <T>(
    data: (T | symbol)[], 
    description: ReportsTablesDescription<T>
  ) {
    const headers = description.columns.map(a => a.title);
    const rows: (symbol | string[])[] = [];
    const maxLength = headers.map((a) => a.length + 2);

    rows.push(this.TOP_ROW);
    if (!description.withOutHeaders) {
      rows.push(this.HEADER_ROW);
      rows.push(this.SEPARATOR);
    }

    for (const item of data) {
      if (typeof item === 'symbol') {
        rows.push(item);
        continue;
      }

      const row: string[] = [];
      for (let i = 0; i < description.columns.length; i++) {
        const column = description.columns[i];
        const value = this.reports.strings.formatValue(typeof column.value === 'function' 
          ? ` ${column.value(item)}` 
          : ` ${item[column.value]}`
        );

        maxLength[i] = Math.max(maxLength[i], value.length + 2);
        row.push(value);
      }
      
      rows.push(row);
    }

    rows.push(this.BOTTOM_ROW);

    return rows.map((row) => {
      if (typeof row === 'symbol') {
        switch (row) {
          case this.TOP_ROW:
            return this.fillRow(maxLength, '╔', '╦', '╗', '═');

          case this.SEPARATOR:
            return this.fillRow(maxLength, '╠', '╬', '╣', '═');

          case this.BOTTOM_ROW:
            return this.fillRow(maxLength, '╚', '╩', '╝', '═');

          case this.HEADER_ROW:
            return [
              '║',
              description
                .columns
                .map(({ title }, i) => this.reports.strings.format(` ${title}`, maxLength[i]))
                .join('║')
              ,
              '║'
            ].join('')

          default:
            throw new Error(`Unhandled symbol ${String(row)}`)
        }
      }

      return [
        '║',
        description.columns.map((_, i) => this.reports.strings.format(row[i], maxLength[i])).join('║'),
        '║'
      ].join('');
    }).join('\n')
  }

  private fillRow(
    maxLength: number[], 
    left: string, 
    joinChar: string,
    right: string, 
    fillChar: string
  ): string {
    return [
      left,
      maxLength.map((w) => new Array(w).fill(fillChar).join('')).join(joinChar),
      right
    ].flat().join('')
  }
}

export type ReportsTablesDescription<T> = {
  columns: ReportsTablesColumnDescription<T>[],
  withOutHeaders?: boolean,
};

export type ReportsTablesColumnDescription<T> = {
  title: string,
  value: keyof T | ((item: T) => unknown),
  maxWidth?: number,
};