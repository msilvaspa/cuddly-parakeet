import OrderItem from "../../src/domain/entity/OrderItem";

describe("OrderItem", () => {
    it("deve calcular o total corretamente", () => {
        const orderItem = new OrderItem(1, 30, 3);
        expect(orderItem.getTotal()).toBe(90);
    });
});
