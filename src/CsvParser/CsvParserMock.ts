import {injectable} from "tsyringe";

@injectable()
export class CsvParserMock {

    public static mockData = [];
    public static parseCallCount = 0;

    public parse(path, onData, onEnd) {

        CsvParserMock.parseCallCount +=1;

        CsvParserMock.mockData.forEach(onData);
        onEnd();
    }

}
