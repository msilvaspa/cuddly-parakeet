export default class Item {
    constructor(readonly id: number, readonly category: string, readonly description: string, readonly price: number) {
        this.id = id;
        this.category = category;
        this.price = price;
    }
}