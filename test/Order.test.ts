import Item from "../src/Item";
import Order from "../src/Order";
import Coupon from "../src/Coupon";
import DefaultFreightCalculator from "../src/DefaultFreightCalculator";
import FixedFreightCalculator from "../src/FixedFreightCalculator";

describe("Order", () => {
    beforeAll(() => {
        jest.useFakeTimers().setSystemTime(new Date("2022-01-01").getTime());
    });

    it("Deve criar um pedido vazio", function () {
        const order = new Order("320.410.908-98");
        expect(order.getTotal()).toBe(0);
    });

    it("deve criar um pedido com 3 itens", function () {
        const order = new Order("320.410.908-98");
        order.addItem(new Item(1, "Musica", "CD", 30), 3);
        order.addItem(new Item(2, "Video", "DVD", 50), 1);
        order.addItem(new Item(3, "Video", "VHS", 10), 2);

        expect(order.getTotal()).toBe(160);
    });
    test("Deve criar um pedido com 3 itens com um cupom de desconto", function () {
        const cpf = "839.435.452-10";
        const order = new Order(cpf);
        order.addItem(new Item(1, "Música", "CD", 30), 3);
        order.addItem(new Item(2, "Vídeo", "DVD", 50), 1);
        order.addItem(new Item(3, "Vídeo", "VHS", 10), 2);
        order.addCoupon(new Coupon("VALE20", 20));
        const total = order.getTotal();
        expect(total).toBe(128);
    });

    test("Deve criar um pedido com 3 itens com um cupom de desconto expirado", function () {
        const cpf = "839.435.452-10";
        const order = new Order(cpf);
        order.addItem(new Item(1, "Música", "CD", 30), 3);
        order.addItem(new Item(2, "Vídeo", "DVD", 50), 1);
        order.addItem(new Item(3, "Vídeo", "VHS", 10), 2);
        order.addCoupon(new Coupon("VALE20", 20, new Date("2021-12-01")));
        const total = order.getTotal();
        expect(total).toBe(160);
    });

    test("Deve criar um pedido com 3 itens com o calculo do frete com a estrategia default", function () {
        const cpf = "839.435.452-10";
        const order = new Order(
            cpf,
            new Date(),
            new DefaultFreightCalculator()
        );
        order.addItem(
            new Item(
                4,
                "Instrumentos musicais",
                "Guitarra",
                1000,
                100,
                30,
                10,
                3
            ),
            1
        );
        order.addItem(
            new Item(
                5,
                "Instrumentos musicais",
                "amplificador",
                5000,
                100,
                50,
                50,
                20
            ),
            1
        );
        order.addItem(
            new Item(6, "Acessorios", "Cabo", 30, 10, 10, 10, 0.9),
            3
        );
        const freight = order.getFreight();
        expect(freight).toBe(260);
    });
    test("Deve criar um pedido com 3 itens com o calculo do frete com a estrategia fixo", function () {
        const cpf = "839.435.452-10";
        const order = new Order(cpf, new Date(), new FixedFreightCalculator());
        order.addItem(
            new Item(
                4,
                "Instrumentos musicais",
                "Guitarra",
                1000,
                100,
                30,
                10,
                3
            ),
            1
        );
        order.addItem(
            new Item(
                5,
                "Instrumentos musicais",
                "amplificador",
                5000,
                100,
                50,
                50,
                20
            ),
            1
        );
        order.addItem(
            new Item(6, "Acessorios", "Cabo", 30, 10, 10, 10, 0.9),
            3
        );
        const freight = order.getFreight();
        expect(freight).toBe(50);
    });
});
