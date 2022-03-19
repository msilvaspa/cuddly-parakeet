import GetOrders from "../../application/usecase/get_orders/GetOrders";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";

export default class GetOrdersController {
    constructor(readonly repositoryFactory: RepositoryFactory) {}

    async execute() {
        const getOrders = new GetOrders(this.repositoryFactory);
        return getOrders.execute();
    }
}
