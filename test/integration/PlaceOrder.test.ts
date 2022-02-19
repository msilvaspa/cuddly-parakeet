import PlaceOrder from "../../src/application/usecase/place_order/PlaceOrder";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory";

describe("PlaceOrder", () => {
    let placeOrder: PlaceOrder;
    let orderRepository: OrderRepository;

    beforeEach(() => {
        const connection = PgPromiseConnectionAdapter.getInstance();
        orderRepository = new OrderRepositoryDatabase(connection);
        const repositoryFactory = new DatabaseRepositoryFactory();
        // const repositoryFactory = new MemoryRepositoryFactory();
        placeOrder = new PlaceOrder(repositoryFactory);
    });

    afterEach(async () => {
        await orderRepository.clear();
    });

    it("Deve fazer um pedido", async function () {
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
        const output = await placeOrder.execute(input);
        expect(output.total).toBe(138);
    });

    it("Deve fazer um pedido com cálculo de frete", async function () {
        const input = {
            cpf: "839.435.452-10",
            orderItems: [
                { idItem: 4, quantity: 1 },
                { idItem: 5, quantity: 1 },
                { idItem: 6, quantity: 3 },
            ],
            date: new Date("2021-12-10"),
        };
        const output = await placeOrder.execute(input);
        expect(output.total).toBe(6350);
    });

    it("Deve dar erro caso item nao exista", async function () {
        const input = {
            cpf: "839.435.452-10",
            orderItems: [{ idItem: 7, quantity: 1 }],
            date: new Date("2021-12-10"),
        };
        await expect(placeOrder.execute(input)).rejects.toThrow();
    });

    it("Deve fazer um pedido com código", async function () {
        const input = {
            cpf: "839.435.452-10",
            orderItems: [
                { idItem: 4, quantity: 1 },
                { idItem: 5, quantity: 1 },
                { idItem: 6, quantity: 3 },
            ],
            date: new Date("2021-12-10"),
        };
        const output = await placeOrder.execute(input);
        expect(output.code).toBe("202100000001");
    });
});
