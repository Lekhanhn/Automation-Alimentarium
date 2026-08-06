import { ExcelReport } from "./utils/ExcelReport.js";
import { sendReport } from "./utils/EmailReport.js";

export default async () => {

    //console.log("Generating Excel Report...");

    const excel = new ExcelReport();
    
    const totalTime = Date.now() - global.startTime;

    excel.setBrowser("chromium");
    excel.setExecutionTime(totalTime);
    await excel.saveReport();
    await sendReport();

};