import axios from "axios";

describe.skip("API", () => {
    it("deve testar a API /oders POST", async () => {
        const response = await axios({
            url: "http://localhost:3000/orders",
            method: "post",
            data: {
                cpf: "839.435.452-10",
                orderItems: [
                    { idItem: 1, quantity: 1 },
                    { idItem: 2, quantity: 1 },
                    { idItem: 3, quantity: 3 },
                ],
                date: new Date("2021-12-10"),
                coupon: "VALE20",
            },
        });
        const order = response.data;
        expect(order.total).toBe(138);
    });
    it("deve testar a API /simulateFreight POST", async () => {
        const response = await axios({
            url: "http://localhost:3000/simulateFreight",
            method: "post",
            data: {
                items: [
                    { idItem: 4, quantity: 1 },
                    { idItem: 5, quantity: 1 },
                    { idItem: 6, quantity: 3 },
                ],
            },
        });
        const order = response.data;
        expect(order.amount).toBe(260);
    });
});
