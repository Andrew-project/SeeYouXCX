import {
    getIMHandlerFactory
} from "../libs/im-sdk/im-factory";

export default class AppIMDelegate {
    constructor(app) {
        this._app = app;
    }

    onLaunch(options) {
        this.iIMHandler = getIMHandlerFactory;
    }

    onShow(options, success) {
        this.iIMHandler.createConnection({
            options: {
                url: 'ws://192.168.1.113:9527'
            },
            success
        });
    }

    onHide() {

    }

    getIMHandlerDelegate() {
        return this.iIMHandler;
    }
}