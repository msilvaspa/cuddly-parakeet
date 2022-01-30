import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
    cpf: Cpf;
    orderItems: OrderItem[] = [];
    coupon: Coupon | undefined;

    constructor(cpf: string) {
        this.cpf = new Cpf(cpf);
    }
    
    addItem(item: Item, quantity: number) {
        this.orderItems.push(new OrderItem(item.id, item.price, quantity));
    }
    
    getTotal(): number {
        return this.orderItems.reduce((total, orderItem) => total + orderItem.getTotal(), 0);
    }

    addCoupon(coupon: Coupon) {
        this.coupon = coupon;
    }
}