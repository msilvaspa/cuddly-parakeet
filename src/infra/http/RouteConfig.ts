import DefaultFreightCalculator from "../../domain/entity/DefaultFreightCalculator";
import FreightCalculator from "../../domain/entity/FreightCalculator";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import PlaceOrderController from "../controller/PlaceOrderController";
import SimulateFreightController from "../controller/SimulateFreightController";
import Http from "./Http";

export default class RouteConfig {
    constructor(
        http: Http,
        repositoryFactory: RepositoryFactory,
        freightCalculator: FreightCalculator
    ) {
        http.on("/orders", "post", async function (params: any, body: any) {
            const placeOrderController = new PlaceOrderController(
                repositoryFactory
            );
            return placeOrderController.execute(params, body);
        });

        http.on(
            "/simulateFreight",
            "post",
            async function (params: any, body: any) {
                const simulateFreightController = new SimulateFreightController(
                    repositoryFactory,
                    freightCalculator
                );
                return simulateFreightController.execute(params, body);
            }
        );
    }
}
