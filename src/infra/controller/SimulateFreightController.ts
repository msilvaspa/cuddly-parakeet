import SimulateFreight from "../../application/usecase/simulate_freight/SimulateFreight";
import FreightCalculator from "../../domain/entity/FreightCalculator";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";

export default class SimulateFreightController {
    constructor(
        readonly repositoryFactory: RepositoryFactory,
        readonly freightCalculator: FreightCalculator
    ) {}

    async execute(params: any, body: any) {
        const simulateFreight = new SimulateFreight(
            this.repositoryFactory.createItemRepository(),
            this.freightCalculator
        );
        const input = body;
        return simulateFreight.execute(input);
    }
}
