import type { AxiosInstance } from "axios";

export default class ApiModuleFactory {
    protected _axios;
    constructor(axios: AxiosInstance) {
        this._axios = axios;
    }
}
