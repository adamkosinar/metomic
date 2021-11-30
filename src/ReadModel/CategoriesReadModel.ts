import {injectable} from "tsyringe";
import {CsvParser} from "../CsvParser/CsvParser";
import * as _ from "lodash";
import {CategoryMap} from "./CategoryMap";
import {Category} from "./Category";

@injectable()
export class CategoriesReadModel {

    private categoriesMap: CategoryMap = {};

    constructor(private csvParser: CsvParser) {
    }

    public findCategories(search: string): Promise<Category[]> {

        return this.processCsv().then(() => {

            search = search.toLowerCase();

            return _.chain(this.categoriesMap)
                .values()
                .reduce((reduced: Category[], category: Category) => {

                    if (category.parent.toLowerCase().indexOf(search) != -1) {

                        reduced.push(category);

                        return reduced;
                    }

                    category.children = _.filter(category.children,(name) => {
                        return name.toLowerCase().indexOf(search) != -1;
                    });

                    if (category.children.length != 0) {

                        reduced.push(category);
                    }

                    return reduced;

                }, []).value();

        });

    }

    private processCsv(): Promise<CategoryMap> {

        return new Promise((resolve) => {

            if (!_.isEmpty(this.categoriesMap)) {

                return resolve(this.categoriesMap);
            }

            this.csvParser.parse(process.env.FILE_PATH, (row) => {

                row = _.mapKeys(row,(value, key) => {
                    return key.trim();
                });

                const parentName = row.parent.trim();

                if (!this.categoriesMap[parentName]) {

                    this.categoriesMap[parentName] = {
                        parent: parentName,
                        children: []
                    };
                }

                const childName = row.child.trim();

                if (this.isUniqueCategory(this.categoriesMap[parentName].children, childName)) {

                    this.categoriesMap[parentName].children.push(childName);
                }

            }, () => {
                resolve(this.categoriesMap);
            });
        });

    }

    private isUniqueCategory(categoryNames: string[], categoryName: string): boolean {

        return !_.includes(categoryNames, categoryName);

    }
}
