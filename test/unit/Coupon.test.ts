import Coupon from "../../src/domain/entity/Coupon";

describe("Coupon", () => {
    beforeAll(() => {
        jest.useFakeTimers().setSystemTime(new Date("2022-01-01").getTime());
    });
    it("deve criar um cupom de desconto válido", () => {
        const coupon = new Coupon("VALE20", 20);
        expect(coupon.isValid()).toBeTruthy();
        expect(coupon.isExpired()).toBeFalsy();
    });

    it("deve criar um cupom de desconto expirado", () => {
        const coupon = new Coupon("VALE20", 20, new Date("2021-02-01"));
        expect(coupon.isExpired()).toBeTruthy();
        expect(coupon.isValid()).toBeFalsy();
        expect(coupon.calculateDiscount(100)).toBe(0);
    });
});
