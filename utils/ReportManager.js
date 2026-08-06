import { ReportStore } from './ReportStore.js';

class ReportManager {

    addResult(page, button, status, remarks) {

        ReportStore.addResult({
            page,
            button,
            status,
            remarks
        });

    }

}

export const report = new ReportManager();