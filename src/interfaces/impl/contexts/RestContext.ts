import { Method } from "got/dist/source/as-promise/types";

export default class RestContext implements IContext {
    host: string;
    method: Method;
    protocol: string;
    path: string;
    queryParams: Map<String, String>;
    headers: Map<String, String>;

    constructor(host: string, method: Method, protocol: string, path: string, headers: Map<String, String>) {
        this.host = host;
        this.method = method;
        this.protocol = protocol;
        this.path = path;
        this.headers = headers;
    }
    update(key: string, value: any) {
        this[key] = value;
    }
    clear(key: string) {
        delete this[key];
    }

    get(key: string) {
        return this[key];
    }
}