import Item from "../src/Item";
import Order from "../src/Order";
import Coupon from "../src/Coupon";

describe('Order', () => {
    it("Deve criar um pedido vazio", function () {
        const order = new Order("320.410.908-98");
        expect(order.getTotal()).toBe(0);
    });

    it("deve criar um pedido com 3 itens", function () {
        const order = new Order("320.410.908-98");
        order.addItem(new Item(1, "Musica", 'CD', 30), 3);
        order.addItem(new Item(2, "Video", 'DVD', 50), 1);
        order.addItem(new Item(3, "Video", 'VHS', 10), 2);

        expect(order.getTotal()).toBe(160);
    })
    it('deve criar pedido com 3 itens e cupom de desconto', () => {
        const order = new Order("320.410.908-98");
        order.addItem(new Item(1, "Musica", 'CD', 30), 3);
        order.addItem(new Item(2, "Video", 'DVD', 50), 1);
        order.addItem(new Item(3, "Video", 'VHS', 10), 2);
        order.addCoupon(new Coupon('VALE20', 20));
        expect(order.getTotal()).toBe(160);
    })
})
