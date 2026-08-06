import ExcelJS from 'exceljs';
import { ReportStore } from './ReportStore.js';

export class ExcelReport {
    constructor(){
        console.log("Excel Report constructor called")
        console.log("Process ID:", process.pid);
        this.workbook = new ExcelJS.Workbook();
        this.worksheet = this.workbook.addWorksheet('Link Validation Report');

        this.worksheet.mergeCells('A1:E1');
        this.worksheet.getCell('A1').value = 'Website Link Validation Report';
        this.worksheet.getCell('A1').font = {
            bold: true,
            size: 18
        };

        this.worksheet.getCell('A3').value = 'Execution Details';
        this.worksheet.getCell('A3').font = {
            bold: true,
            size: 16
        };
        this.worksheet.getCell('A5').value = 'Website';
        this.worksheet.getCell('B5').value = 'https://staging.alimentarium.org/en';

        this.worksheet.getCell('A6').value = 'Execution Date';
        this.worksheet.getCell('B6').value = new Date().toLocaleDateString();

        this.worksheet.getCell('A7').value = 'Browser';
        //this.worksheet.getCell('B7').value = 'Chrome';

        this.worksheet.getCell('A8').value = 'Execution Time';
        
        

        this.worksheet.getCell('A10').value = 'Summary';
        this.worksheet.getCell('A10').font = {
            bold: true,
            size: 16
        };

        this.worksheet.addRow([]);
        this.worksheet.addRow([
            'Total Components', 'Passed', 'Failed'
        ]);
        
        this.worksheet.addRow([]);
        const summaryDetails = this.worksheet.lastRow;
        summaryDetails.eachCell(cell => {
            cell.border = this.borderStyle;
        });
        this.worksheet.addRow([]);


        this.worksheet.getCell('A15').value = 'Deatiled Results';
        this.worksheet.getCell('A15').font = {
            bold: true,
            size: 16
        };
        this.worksheet.addRow([]);
        this.borderStyle = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        this.worksheet.addRow([
            'sl.No', 'Page', 'Button', 'Status', 'Remarks'
        ]);

        const headerRow = this.worksheet.lastRow;
        headerRow.eachCell(cell => {
            cell.font = {
                bold: true
            };
            cell.border = this.borderStyle;
        });

        this.worksheet.columns.forEach(column => {
            column.width = 30;
        });

        this.slNo = 1;
        this.total = 0;
        this.passed = 0;
        this.failed = 0;
    }

    // addResult(page, button, status, remarks){
    //     console.log(`Adding Row #${this.slNo}: ${page} - ${button}`);
    //     const row = this.worksheet.addRow([
    //         this.slNo++,
    //         page,
    //         button,
    //         status,
    //         remarks
    //     ]);
    //     this.total++;

    //     if(status==="Pass"){

    //     this.passed++;

    //     }else{

    //     this.failed++;

    //     }

    //     row.eachCell(cell => {

    //         cell.border = this.borderStyle;

    //     });

    //     const statusCell = row.getCell(4);

    //     statusCell.font = {
    //         bold: true,
    //         color: {
    //             argb: status === 'Pass'
    //                 ? '008000'
    //                 : 'FF0000'
    //         }
    //     };
        
    // }

//     async saveReport(){
//         console.log("Saving report...");
//         console.log("Total Results:", this.total);
//         console.log("Worksheet Rows:", this.worksheet.rowCount);
//         this.worksheet.eachRow((row, rowNumber) => {
//                 console.log(rowNumber, row.values);
//         });
// a
//         this.worksheet.getCell("A13").value=this.total;

//         this.worksheet.getCell("B13").value=this.passed;

//         this.worksheet.getCell("C13").value=this.failed;

//         await this.workbook.xlsx.writeFile(
//             './reports/Website_Link_Report.xlsx'
//         );
//     }

    async saveReport() {

        const results = ReportStore.getResults();

        for (const result of results) {

            const row = this.worksheet.addRow([

                this.slNo++,
                result.page,
                result.button,
                result.status,
                result.remarks

            ]);

            this.total++;

            if (result.status === "Pass")
                this.passed++;
            else
                this.failed++;

            row.eachCell(cell => {
                cell.border = this.borderStyle;
            });

            row.getCell(4).font = {

                bold: true,

                color: {

                    argb: result.status === "Pass"

                        ? "008000"

                        : "FF0000"

                }

            };

        }

        this.worksheet.getCell("A13").value = this.total;
        this.worksheet.getCell("B13").value = this.passed;
        this.worksheet.getCell("C13").value = this.failed;

        await this.workbook.xlsx.writeFile(
            "./reports/Website_Link_Report.xlsx"
        );

    }

    setBrowser(browser){
        this.worksheet.getCell("B7").value=browser;
    }

    setExecutionTime(milliseconds) {
        const seconds = (milliseconds / 1000).toFixed(2);
        this.worksheet.getCell('B8').value = `${seconds} sec`;
    }
    
}