import axios from "axios";
import PlaceOrder from "../../src/application/usecase/place_order/PlaceOrder";
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";

describe("API", () => {
    let placeOrder: PlaceOrder;
    let orderRepository: OrderRepositoryDatabase;

    beforeEach(function () {
        const connection = PgPromiseConnectionAdapter.getInstance();
        orderRepository = new OrderRepositoryDatabase(connection);
        const repositoryFactory = new DatabaseRepositoryFactory();
        placeOrder = new PlaceOrder(repositoryFactory);
    });

    afterEach(async function () {
        await orderRepository.clear();
    });

    it("deve testar a API /orders POST", async () => {
        const response = await axios({
            url: "http://localhost:3000/orders",
            method: "post",
            data: {
                cpf: "839.435.452-10",
                orderItems: [
                    { idItem: 1, quantity: 1 },
                    { idItem: 2, quantity: 1 },
                    { idItem: 3, quantity: 3 },
                ],
                date: new Date("2021-12-10"),
                coupon: "VALE20",
            },
        });
        const order = response.data;
        expect(order.total).toBe(138);
    });

    it("deve testar a API /simulateFreight POST", async () => {
        const response = await axios({
            url: "http://localhost:3000/simulateFreight",
            method: "post",
            data: {
                items: [
                    { idItem: 4, quantity: 1 },
                    { idItem: 5, quantity: 1 },
                    { idItem: 6, quantity: 3 },
                ],
            },
        });
        const order = response.data;
        expect(order.amount).toBe(260);
    });

    it("deve testar a API /orders GET", async () => {
        const input = {
            cpf: "839.435.452-10",
            orderItems: [
                { idItem: 1, quantity: 1 },
                { idItem: 2, quantity: 1 },
                { idItem: 3, quantity: 3 },
            ],
            date: new Date("2021-12-10"),
            coupon: "VALE20",
        };
        await placeOrder.execute(input);

        const response = await axios({
            url: "http://localhost:3000/orders",
            method: "get",
        });
        const orders = response.data;
        expect(orders.orders).toHaveLength(1);
    });

    it("deve testar a API /orders/:code GET", async () => {
        const input = {
            cpf: "839.435.452-10",
            orderItems: [
                { idItem: 1, quantity: 1 },
                { idItem: 2, quantity: 1 },
                { idItem: 3, quantity: 3 },
            ],
            date: new Date("2021-12-10"),
            coupon: "VALE20",
        };
        await placeOrder.execute(input);

        const response = await axios({
            url: "http://localhost:3000/orders/202100000001",
            method: "get",
        });
        const order = response.data;
        expect(order.code).toBe("202100000001");
    });
});
