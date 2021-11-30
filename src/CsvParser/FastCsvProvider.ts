import {injectable} from "tsyringe";
import * as csv from 'fast-csv';

@injectable()
export class FastCsvProvider {

    public get() {

        return csv;
    }
}
