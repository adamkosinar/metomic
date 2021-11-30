import {FsProvider} from "./FsProvider";
import {singleton} from "tsyringe";
import {EventEmitter} from "events";

@singleton()
export class FsProviderMock extends FsProvider {

    public static mockData = [];

    public get(): any {

        const stream = new EventEmitter();

        return {
            createReadStream: () => {
                return {
                    pipe: () => {
                        process.nextTick(() => {

                            FsProviderMock.mockData.forEach((row) => {
                                stream.emit("data", row);
                            });

                            stream.emit("end");
                        });

                        return stream;
                    }
                };

            }

        };

    }
}

