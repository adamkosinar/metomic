import {injectable} from "tsyringe";

@injectable()
export class CategoriesReadModelMock {

    public static callArgs;
    public static mockData;

    public findCategories(search: string): Promise<any> {

        CategoriesReadModelMock.callArgs = search;

        return new Promise((resolve) => {

            return resolve( CategoriesReadModelMock.mockData);
        });

    }

}
