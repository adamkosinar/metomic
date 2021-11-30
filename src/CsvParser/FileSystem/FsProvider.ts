import * as fs from "fs";
import {injectable} from "tsyringe";

@injectable()
export class FsProvider {

    public get() {

        return fs;
    }

}
