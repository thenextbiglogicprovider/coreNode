import { Request, Response, Router } from "express";
import * as path from "path";

// tslint:disable-next-line:no-namespace
//export namespace Controller.Contract {
export interface IAppController {
    NAME: string;
    ROUTER: Router;
    VIEW_PATH: string;
    CURRENT_VIEW_PATH: string;
    CURRENT_ROUTE: string;
    CURRENT_REQUEST: Request;
    /**
     * GetViewPath
     */
     GetViewPath(): string;
     /**
      * Get
      */
      Get(route: string): Router;

     /**
      * Put
      */
      Put(route: string): Router;

      /**
       * Post
       */
       Post(route: string): Router;
       /**
        * Delete
        */
       Delete(route: string): Router;
    }
//}
