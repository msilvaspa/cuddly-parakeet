import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderRepositoryMemory implements OrderRepository {
    orders: Order[];

    constructor() {
        this.orders = [];
    }
    count(): Promise<number> {
        return Promise.resolve(this.orders.length);
    }

    async get(id: string): Promise<Order> {
        const order = this.orders.find(
            (order) => order.getCode() === id.toString()
        );
        if (!order) throw new Error("Order not found");
        return order;
    }

    async save(order: Order): Promise<void> {
        this.orders.push(order);
    }
    async clear(): Promise<void> {
        this.orders = [];
    }
}
