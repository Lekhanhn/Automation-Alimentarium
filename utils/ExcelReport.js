import ExcelJS from 'exceljs';
import { ReportStore } from './ReportStore.js';

export class ExcelReport {
    constructor(){
        // console.log("Excel Report constructor called")
        // console.log("Process ID:", process.pid);
        this.workbook = new ExcelJS.Workbook();
        this.worksheet = this.workbook.addWorksheet('Link Validation Report');

        this.worksheet.mergeCells('A1:E1');
        this.worksheet.mergeCells('A3:E3');
        this.worksheet.mergeCells('A10:E10');
        this.worksheet.mergeCells('A15:E15');
        this.worksheet.getCell('A1').fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '4D88E0' }
        }

        this.worksheet.getCell('A1').value = 'Website Link Validation Report';
        this.worksheet.getCell('A1').font = {
            bold: true,
            size: 16
        };

        this.worksheet.getCell('A3').value = 'Execution Details';
        this.worksheet.getCell('A3').font = {
            bold: true,
            size: 14
        };
        this.worksheet.getCell('A3').fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'B3CAE2' }
        };
        this.worksheet.getCell('A5').value = 'Website';
        this.worksheet.getCell('B5').value = 'https://staging.alimentarium.org/en';

        this.worksheet.getCell('A6').value = 'Execution Date';
        this.worksheet.getCell('B6').value = new Date().toLocaleDateString();

        this.worksheet.getCell('A7').value = 'Browser';
        //this.worksheet.getCell('B7').value = 'Chrome';

        this.worksheet.getCell('A8').value = 'Execution Time';
        
        this.borderStyle = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        

        this.worksheet.getCell('A10').value = 'Summary';
        this.worksheet.getCell('A10').font = {
            bold: true,
            size: 14
        };
        this.worksheet.getCell('A10').fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'B3CAE2' }
        };

        this.worksheet.getCell('A12').value = 'Total Components';
        this.worksheet.getCell('A12').fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'D9D9D9' }
        };
        this.worksheet.getCell("A12").border= this.borderStyle

        this.worksheet.getCell('B12').value = 'Passed';
        this.worksheet.getCell('B12').fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'D9D9D9' }
        };
        this.worksheet.getCell("B12").border= this.borderStyle

        this.worksheet.getCell('C12').value = 'Failed';
        this.worksheet.getCell('C12').fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'D9D9D9' }
        };
        this.worksheet.getCell("C12").border= this.borderStyle

        
        this.worksheet.getCell('A15').value = 'Detailed Results';
        this.worksheet.getCell('A15').font = {
            bold: true,
            size: 14
        };
        this.worksheet.getCell('A15').fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'B3CAE2' }
        };

        this.worksheet.addRow([]);
        

        this.worksheet.addRow([
            'Sl.No', 'Page', 'Button', 'Status', 'Remarks'
        ]);

        const headerRow = this.worksheet.lastRow;
        headerRow.eachCell(cell => {
            cell.font = {
                bold: true
            };
            cell.border = this.borderStyle;
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'D9D9D9' } 
            };
            cell.alignment={
                horizontal: 'center',
                vertical: 'middle'
            }
        });
        
        this.worksheet.columns.forEach(column => {
            column.width = 30;
            column.alignment = {
                vertical: 'middle'
            }
        });
      

        this.slNo = 1;
        this.total = 0;
        this.passed = 0;
        this.failed = 0;
    }

    async saveReport() {
        const results = ReportStore.getResults();
        let currentPage = "";
        let startRow = 0;

        for (const result of results) {

            const row = this.worksheet.addRow([
                "",                     // Sl.No later
                result.page,
                result.button,
                result.status,
                result.remarks
            ]);

            // New page started
            if (currentPage !== result.page) {

                // Merge previous page
                if (startRow !== 0) {

                    const endRow = row.number - 1 ;

                    this.worksheet.mergeCells(`A${startRow}:A${endRow}`);
                    this.worksheet.mergeCells(`B${startRow}:B${endRow}`);

                    this.worksheet.getCell(`A${startRow}`).value = this.slNo++;
                    this.worksheet.getCell(`B${startRow}`).value = currentPage;

                    this.worksheet.getCell(`A${startRow}`).alignment = {
                        vertical: "middle",
                        horizontal: "center",
                        wrapText: true
                    };

                    this.worksheet.getCell(`B${startRow}`).alignment = {
                        vertical: "middle",
                        wrapText: true
                    };
                    
                }
                
                currentPage = result.page;
                startRow = row.number;
            }

            this.total++;

            if (result.status === "Pass")
                this.passed++;
            else
                this.failed++;

            // row.eachCell(cell => {
            //     cell.border = this.borderStyle;
            //     cell.alignment = {
            //         wrapText: true
            //     }
            // });

            // row.getCell(1).alignment={
            //     horizontal: 'center',
            //     vertical: 'middle'
            // }

            // Status colour
            row.getCell(4).font = {
                bold: true,
                color: {
                    argb: result.status === "Pass"
                        ? "008000"
                        : "FF0000"
                }
            };

            row.eachCell(cell => {
                cell.border = this.borderStyle;
                cell.alignment = {
                    wrapText: true
                };
            });
        }

        const endRow = this.worksheet.lastRow.number;

        this.worksheet.mergeCells(`A${startRow}:A${endRow}`);
        this.worksheet.mergeCells(`B${startRow}:B${endRow}`);

        this.worksheet.getCell(`A${startRow}`).value = this.slNo++;
        this.worksheet.getCell(`B${startRow}`).value = currentPage;

        this.worksheet.getCell(`A${startRow}`).alignment = {
            vertical: "middle",
            horizontal: "center"
        };

        this.worksheet.getCell(`B${startRow}`).alignment = {
            vertical: "middle"
        };


        // const results = ReportStore.getResults();

        // for (const result of results) {

        //     const row = this.worksheet.addRow([

        //         this.slNo++,
        //         result.page,
        //         result.button,
        //         result.status,
        //         result.remarks

        //     ]);

        //     this.total++;

        //     if (result.status === "Pass")
        //         this.passed++;
        //     else
        //         this.failed++;

        //     row.eachCell(cell => {
        //         cell.border = this.borderStyle;
        //         cell.alignment = {
        //             wrapText: true
        //         }
        //     });

        //     row.getCell(1).alignment={
        //         horizontal: 'center',
        //         vertical: 'middle'
        //     }
            
        //     row.getCell(4).font = {

        //         bold: true,

        //         color: {

        //             argb: result.status === "Pass"

        //                 ? "008000"

        //                 : "FF0000"

        //         }

        //     };

        // }

        this.worksheet.getCell("A13").value = this.total;
        this.worksheet.getCell("A13").border= this.borderStyle
        this.worksheet.getCell("B13").value = this.passed;
        this.worksheet.getCell("B13").border= this.borderStyle
        this.worksheet.getCell("C13").value = this.failed;
        this.worksheet.getCell("C13").border= this.borderStyle


        await this.workbook.xlsx.writeFile(
            "./reports/Alimentarium_TestReport.xlsx"
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