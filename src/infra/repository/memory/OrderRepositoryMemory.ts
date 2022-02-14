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

    // async findById(id: number): Promise<Order | undefined> {
    //     return this.orders.find((order) => order.id === id);
    // }

    async save(order: Order): Promise<void> {
        this.orders.push(order);
    }
    async clear(): Promise<void> {
        this.orders = [];
    }
}
