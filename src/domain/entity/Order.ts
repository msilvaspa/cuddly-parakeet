import Coupon from "./Coupon";
import Cpf from "./Cpf";
import FreightCalculator from "./FreightCalculator";
import Item from "./Item";
import OrderItem from "./OrderItem";
import DefaultFreightCalculator from "./DefaultFreightCalculator";
import OrderCode from "./OrderCode";

export default class Order {
    cpf: Cpf;
    private orderItems: OrderItem[];
    coupon: Coupon | undefined;
    private freight: number;
    private code: OrderCode;

    constructor(
        cpf: string,
        readonly date: Date = new Date(),
        readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator(),
        readonly sequence: number = 1
    ) {
        this.cpf = new Cpf(cpf);
        this.orderItems = [];
        this.freight = 0;
        this.code = new OrderCode(date, sequence);
    }

    addItem(item: Item, quantity: number) {
        this.freight += this.freightCalculator.calculate(item) * quantity;
        this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
    }

    getCpf() {
        return this.cpf.value;
    }

    getOrderItems() {
        return this.orderItems;
    }

    getTotal(): number {
        let total = this.orderItems.reduce(
            (_total, orderItem) => _total + orderItem.getTotal(),
            0
        );
        if (this.coupon && this.coupon.isValid()) {
            total -= this.coupon.calculateDiscount(total);
        }
        total += this.getFreight();
        return total;
    }

    addCoupon(coupon: Coupon) {
        if (coupon.isValid()) this.coupon = coupon;
    }

    getFreight() {
        return this.freight;
    }

    getCode() {
        return this.code.value;
    }
}
