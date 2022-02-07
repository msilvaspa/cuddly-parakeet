import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderRepositoryMemory implements OrderRepository {
    orders: Order[];

    constructor() {
        this.orders = [];
    }

    // async findById(id: number): Promise<Order | undefined> {
    //     return this.orders.find((order) => order.id === id);
    // }

    async save(order: Order): Promise<void> {
        this.orders.push(order);
    }
}
