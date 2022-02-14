/* eslint-disable jest/valid-describe-callback */
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter";

describe("Connection", () => {
    it("should connect to the database", async () => {
        const connection = new PgPromiseConnectionAdapter();
        const items = await connection.query("SELECT * FROM ccca.item", []);
        console.log(items);

        expect(items).toHaveLength(6);
    });
});
