import FreightCalculator from "../../../domain/entity/FreightCalculator";
import ItemRepository from "../../../domain/repository/ItemRepository";
import SimulateFreightInput from "./SimulateFreightInput";
import SimulateFreightOutput from "./SimulateFreightOutput";

export default class SimulateFreight {
    constructor(
        private readonly itemRepository: ItemRepository,
        private readonly freightCalculator: FreightCalculator
    ) {}

    async execute(input: SimulateFreightInput): Promise<SimulateFreightOutput> {
        let amount = 0;
        for (const item of input.items) {
            const itemData = await this.itemRepository.findById(item.idItem);
            if (!itemData) throw new Error("Item not found");
            amount +=
                this.freightCalculator.calculate(itemData) * item.quantity;
        }
        return new SimulateFreightOutput(amount);
    }
}
