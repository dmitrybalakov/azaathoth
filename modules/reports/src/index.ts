export * from './model'

import { ReportsStrings } from "./strings";
import { ReportsTables } from "./tables";

export class Reports {
  strings: ReportsStrings = new ReportsStrings(this);
  tables: ReportsTables = new ReportsTables(this);
}

export default new Reports();