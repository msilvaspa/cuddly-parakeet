import FreightCalculator from "./FreightCalculator";
import Item from "./Item";

export default class DefaultFreightCalculator implements FreightCalculator {
    calculate(item: Item): number {
        if (!item.width || !item.height || !item.length || !item.weight)
            return 0;
        const freight = 1000 * item.getVolume() * (item.getDensity() / 100);
        const MIN_FREIGHT = 10;
        return Math.max(freight, MIN_FREIGHT);
    }
}
