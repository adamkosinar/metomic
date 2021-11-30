import "reflect-metadata";
import {container} from "tsyringe";
import {FastCsvProvider} from "./FastCsvProvider";
import {FastCsvProviderMock} from "./FastCsvProviderMock";
import {FsProvider} from "./FileSystem/FsProvider";
import {FsProviderMock} from "./FileSystem/FsProviderMock";
import {CsvParser} from "./CsvParser";

container.register(FastCsvProvider, {useClass: FastCsvProviderMock});
container.register(FsProvider, {useClass: FsProviderMock});

describe("CsvParser", () => {

    describe("when asked to parse csv", () => {

        const parser = container.resolve(CsvParser);

        it("should parse csv", (done) => {

            FsProviderMock.mockData = [
                {
                    "parent ": "MockParent 1 ",
                    " child": " MockChild 1"
                },
                {
                    "parent ": "MockParent 1 ",
                    " child": " MockChild 2"
                },
                {
                    "parent ": "MockParent 1 ",
                    " child": " MockChild 3"
                }
            ];

            const onData = jest.fn();

            return parser.parse("mock", onData, () => {

                expect(onData.mock.calls.length).toBe(3);
                done();
            });
        });

    });

});
