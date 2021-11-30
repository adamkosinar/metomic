import {injectable} from "tsyringe";
import {CategoriesReadModel} from "../ReadModel/CategoriesReadModel";
import {Request, Response} from "restify";

@injectable()
export class AppController {

    constructor(private categoriesReadModel: CategoriesReadModel) {

    }

    public search(request: Request, response: Response): Promise<any> {

        return this.categoriesReadModel.findCategories(request.query.search)
            .then((results) => {

                response.send({
                    searchTerm: request.query.search,
                    results: results
                });

            });

    }
}
