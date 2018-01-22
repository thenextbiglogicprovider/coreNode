import {
    Router,
    Request,
    Response
} from "express";

import * as path from "path";

import { Utils } from "../config/utils";

class homeController {
    /**
     *
     */
    constructor() {

    }

    private _router: Router = Router();
    public get router(): Router {
        return this._router;
    }

    private _viewPath: string =path.join(__dirname, Utils.Constants.VIEWPATH);
    private _currentView:string;

    public get viewPath(): string {
        return this._viewPath;
    }

    /**
     * Get
     */
    public Get() {
        return this._router.get('/', (req: Request, res: Response) => {
            this._currentView=this._viewPath.replace('{0}','home').replace('{1}','index');
            res.render(this._currentView,{locals:{ title:'Home'}});
        });
    }
}

export const HomeController =new homeController();