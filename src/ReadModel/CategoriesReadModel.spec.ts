import "reflect-metadata";
import {container} from "tsyringe";
import {CsvParser} from "../CsvParser/CsvParser";
import {CsvParserMock} from "../CsvParser/CsvParserMock";
import {CategoriesReadModel} from "./CategoriesReadModel";

container.register(CsvParser, CsvParserMock);

describe("CategoriesReadModel", () => {

    describe("when asked to search categories by string", () => {

        CsvParserMock.mockData =  [
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
            },
            {
                "parent ": "MockParent 2 ",
                " child": " MockChild 11"
            },
            {
                "parent ": "MockParent 2 ",
                " child": " MockChild 2"
            },
            {
                "parent ": "MockParent 2 ",
                " child": " MockChild 30"
            }
        ];

        it("should find the right results", () => {

            const categories = container.resolve(CategoriesReadModel);

            return categories.findCategories("MockChild 30")
                .then((results) => {
                    expect(results.length).toBe(1);
                    expect(results[0].parent).toEqual("MockParent 2");
                    expect(results[0].children[0]).toEqual("MockChild 30");
                });

        });

        it("should cache parsed data", () => {

            CsvParserMock.parseCallCount = 0;

            const categories = container.resolve(CategoriesReadModel);

            return categories.findCategories("mock")
                .then(() => {

                    return categories.findCategories("mock");
                })
                .then(() => {

                    expect(CsvParserMock.parseCallCount).toBe(1);
                });

        });
    });

});
