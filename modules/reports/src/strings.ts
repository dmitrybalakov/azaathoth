import { Reports } from ".";

export class ReportsStrings {
  private DELIMITER = new Array(128).fill('=').join('');

  constructor (
    public reports: Reports
  ) { }

  delimiter (): string {
    return this.DELIMITER;
  }

  joinLineByLine (data: unknown[], separator: string = ' '): string {
    const splitted: string[][] = [];
    const maxLengths: number[] = [];
    let rowsCount = 0;

    for (const item of data) {
      const splittedItem = this.formatValue(item).split('\n');
      
      rowsCount = Math.max(rowsCount, splittedItem.length);
      splitted.push(splittedItem);
      maxLengths.push(splittedItem.reduce((a, i) => Math.max(a, i.length), 0))
    }
    
    const result: string[] = [];
    for (let i = 0; i < rowsCount; i++) {
      const resultRow: string[] = [];
      
      for (let j = 0; j < splitted.length; j++) {
        resultRow.push(this.format(splitted[j][i] || '', maxLengths[j]));
      }

      result.push(resultRow.join(separator));
    }

    return result.join('\n');
  }

  formatValue (value: unknown): string {
    if (value == null) {
      return `<${value}>`;
    }

    return value.toString();
  }

  format (value: unknown, length: number, separator: string = ' '): string {
    const str = this.formatValue(value);

    if (str.length <= length) {
      return str + new Array(Math.max(0, length - str.length)).fill(separator).join('');
    }

    return `${str.substring(0, length - 3)}...`
  }
}