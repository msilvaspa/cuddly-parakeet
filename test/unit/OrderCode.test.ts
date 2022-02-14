import OrderCode from "../../src/domain/entity/OrderCode";

describe("OrderCode", () => {
    test("Deve criar um código de pedido", () => {
        const orderCode = new OrderCode(new Date("2022-02-02"), 5);
        expect(orderCode.value).toBe("202200000005");
    });
});
