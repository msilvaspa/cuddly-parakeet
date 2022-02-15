import Connection from "./Connection";
import pgp from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";

export default class PgPromiseConnectionAdapter implements Connection {
    pgp: pg.IClient;

    static insance: PgPromiseConnectionAdapter;

    private constructor() {
        this.pgp = pgp()(
            "postgres://postgres:postgres@localhost:5432/postgres"
        );
    }

    static getInstance(): PgPromiseConnectionAdapter {
        if (!PgPromiseConnectionAdapter.insance) {
            PgPromiseConnectionAdapter.insance =
                new PgPromiseConnectionAdapter();
        }
        return PgPromiseConnectionAdapter.insance;
    }

    async query(statement: string, params: any[]): Promise<pg.IResult> {
        return this.pgp.query(statement, params);
    }
}
