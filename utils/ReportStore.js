import fs from "fs";

const REPORT_FILE = "./reports/report.json";

export class ReportStore {

    static initialize() {
        fs.mkdirSync("./reports", { recursive: true });

        fs.writeFileSync(
            REPORT_FILE,
            JSON.stringify([], null, 2)
        );
    }

    static addResult(result) {

        const results = JSON.parse(
            fs.readFileSync(REPORT_FILE, "utf-8")
        );

        results.push(result);

        fs.writeFileSync(
            REPORT_FILE,
            JSON.stringify(results, null, 2)
        );
    }

    static getResults() {

        return JSON.parse(
            fs.readFileSync(REPORT_FILE, "utf-8")
        );

    }

}