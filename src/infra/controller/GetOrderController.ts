import GetOrder from "../../application/usecase/get_order/GetOrder";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";

export default class GetOrderController {
    constructor(readonly repositoryFactory: RepositoryFactory) {}

    async execute(code: string) {
        const getOrders = new GetOrder(this.repositoryFactory);
        return getOrders.execute(code);
    }
}
