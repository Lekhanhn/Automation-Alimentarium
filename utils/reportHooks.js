import { ReportStore } from '../utils/ReportStore.js';
import { ExcelReport } from '../utils/ExcelReport.js';

let startTime;

test.beforeAll(() => {

    ReportStore.initialize();
    startTime = Date.now();

});

test.afterAll(async() => {

    const excel = new ExcelReport();
   
    await excel.generateReport();

});