import { ReportStore } from "./utils/ReportStore.js";

export default async () => {

    global.startTime = Date.now();

    ReportStore.initialize();

};