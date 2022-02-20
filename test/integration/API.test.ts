import axios from "axios";

describe("API", () => {
    it("deve testar a API", async () => {
        const response = await axios({
            method: "POST",
            url: "http://localhost:3000/orders",
            data: {
                cpf: "764.373.140-36",
                orderItems: [
                    { idItem: 1, quantity: 1 },
                    { idItem: 2, quantity: 1 },
                    { idItem: 3, quantity: 3 },
                ],
                date: new Date("2021-12-10"),
                coupon: "VALE20",
            },
        });
        console.log(response.data);

        expect(true).toBe(true);
    });
});
