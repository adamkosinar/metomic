import {singleton} from "tsyringe";
import {FastCsvProvider} from "./FastCsvProvider";

@singleton()
export class FastCsvProviderMock extends FastCsvProvider{

    public get(): any {

        return {
            parse: jest.fn()
        };
    }

}
