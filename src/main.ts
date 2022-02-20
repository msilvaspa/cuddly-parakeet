import PlaceOrder from "./application/usecase/place_order/PlaceOrder";
import SimulateFreight from "./application/usecase/simulate_freight/SimulateFreight";
import DefaultFreightCalculator from "./domain/entity/DefaultFreightCalculator";
import PgPromiseConnectionAdapter from "./infra/database/PgPromiseConnectionAdapter";
import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import ItemRepositoryDatabase from "./infra/repository/database/ItemRepositoryDatabase";

const repositoryFactory = new DatabaseRepositoryFactory();
const expressAdapter = new ExpressAdapter();

expressAdapter.on("/orders", "post", async (params: any, body: any) => {
    const placeOrder = new PlaceOrder(repositoryFactory);
    const input = body;
    input.date = new Date(input.date);
    return placeOrder.execute(input);
});

expressAdapter.on(
    "/simulateFreight",
    "post",
    async (params: any, body: any) => {
        const simulateFreight = new SimulateFreight(
            new ItemRepositoryDatabase(
                PgPromiseConnectionAdapter.getInstance()
            ),
            new DefaultFreightCalculator()
        );
        const input = body;
        return simulateFreight.execute(input);
    }
);

expressAdapter.listen(3000);
