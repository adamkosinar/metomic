import "reflect-metadata";
import {container} from "tsyringe";
import {CategoriesReadModel} from "../ReadModel/CategoriesReadModel";
import {CategoriesReadModelMock} from "../ReadModel/CategoriesReadModelMock";
import {AppController} from "./AppController";

container.register(CategoriesReadModel, {useClass: CategoriesReadModelMock});

describe("AppController", () => {

    const controller = container.resolve(AppController);

    CategoriesReadModelMock.mockData = [
        {
            parent: "Mock1",
            children: [
                "Child1",
                "Child2"
            ]
        },
        {
            parent: "Mock2",
            children: [
                "Child1",
                "Child2"
            ]
        }
    ];

    it("should respond with right results", () => {

        const request = {
            query: {
                search: "test"
            }
        };

        const response = {
            send: jest.fn()
        };

        return controller.search(request, response)
            .then(() => {
                expect(CategoriesReadModelMock.callArgs).toEqual("test");
                expect(response.send.mock.calls[0][0].searchTerm).toEqual("test");
                expect(response.send.mock.calls[0][0].results).toBeDefined();
            });

    });

});
