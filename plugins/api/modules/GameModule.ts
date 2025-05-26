import ApiModuleFactory from "~/plugins/api/modules/ApiModuleFactory";

export default class GameModule extends ApiModuleFactory {

    public start () {
        return this._axios.post("/game/start", {}, { headers: { "content-type": "application/json" }});
    }

    public getLevel (hash: string) {
        return this._axios.get(`/level/${hash}`, {}, { headers: { "content-type": "application/json" }});
    }

    public getGames () {
        return this._axios.get(`/games`, {}, { headers: { "content-type": "application/json" }});
    }

    public answer (data) {
        return this._axios.post("/answers", data, { headers: { "content-type": "application/json" }});
    }

}
