import ApiModuleFactory from "~/plugins/api/modules/ApiModuleFactory";

export default class AuthModule extends ApiModuleFactory {
    public login (formData) {
        return this._axios.post("login", formData);
    }

    public refreshToken(refreshToken: string) {
        return this._axios.post("token/refresh", {'refresh_token' : refreshToken});
    }

    public userDetails(){
        return this._axios.get("/users/details");
    }

    public register(formData) {
        return this._axios.post("register", formData);
    }

}
