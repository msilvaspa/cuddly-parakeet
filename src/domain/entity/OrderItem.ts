export default class OrderItem {
    constructor(readonly id: number, readonly price: number, readonly quantity: number) {

    }
    getTotal = () => this.price * this.quantity;
}