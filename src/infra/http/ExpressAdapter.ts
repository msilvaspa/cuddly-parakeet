import Http from "./Http";
import express, { Request, Response } from "express";

export default class ExpressAdapter implements Http {
    app: any;

    constructor() {
        this.app = express();
        this.app.use(express.json());
    }

    on(url: string, method: string, handler: any): void {
        this.app[method](url, async (req: Request, res: Response) => {
            const output = await handler(req, res);
            res.send(output);
        });
    }

    listen(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}
