import PlaceOrder from "../../src/application/usecase/place_order/PlaceOrder";
import GetOrder from "../../src/application/usecase/get_order/GetOrder";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory";

describe("PlaceOrder", () => {
    let placeOrder: PlaceOrder;
    let getOrder: GetOrder;
    let orderRepository: OrderRepository;

    beforeEach(() => {
        const connection = PgPromiseConnectionAdapter.getInstance();
        orderRepository = new OrderRepositoryDatabase(connection);
        const repositoryFactory = new DatabaseRepositoryFactory();
        // const repositoryFactory = new MemoryRepositoryFactory();
        placeOrder = new PlaceOrder(repositoryFactory);
        getOrder = new GetOrder(repositoryFactory);
    });

    afterEach(async () => {
        await orderRepository.clear();
    });

    it("Deve obter um pedido pelo codigo", async function () {
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
        const getOrderOutput = await getOrder.execute(output.code);
        expect(getOrderOutput.total).toBe(138);
    });
});
