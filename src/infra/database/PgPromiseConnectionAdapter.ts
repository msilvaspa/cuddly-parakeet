import Connection from "./Connection";
import pgp from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";

export default class PgPromiseConnectionAdapter implements Connection {
    pgp: pg.IClient;

    constructor() {
        this.pgp = pgp()(
            "postgres://postgres:postgres@localhost:5432/postgres"
        );
    }
    query(statement: string, params: any[]): Promise<pg.IResult> {
        return this.pgp.query(statement, params);
    }
}
