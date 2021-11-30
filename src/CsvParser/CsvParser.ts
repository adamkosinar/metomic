import {injectable} from "tsyringe";
import {FastCsvProvider} from "./FastCsvProvider";
import {FsProvider} from "./FileSystem/FsProvider";

@injectable()
export class CsvParser {

    private fastCsv;
    private fs;

    constructor(fastCsvProvider: FastCsvProvider, fsProvider: FsProvider) {

        this.fastCsv = fastCsvProvider.get();
        this.fs = fsProvider.get();
    }

    public parse(path: string, onData: (row) => void, onEnd: () => void) {

        this.fs.createReadStream(path)
            .pipe(this.fastCsv.parse({ headers: true}))
            .on("data", onData)
            .on("end", onEnd);

    }

}
