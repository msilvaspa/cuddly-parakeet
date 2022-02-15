import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";
import ValidateCoupon from "../../src/application/usecase/validate_coupon/ValidateCoupon";

describe("ValidateCoupon", () => {
    it("deve validar um cupom de desconto", async () => {
        const couponRepository = new CouponRepositoryDatabase(
            PgPromiseConnectionAdapter.getInstance()
        );
        const validateCoupon = new ValidateCoupon(couponRepository);
        const isValid = await validateCoupon.execute("VALE20");
        expect(isValid).toBeTruthy();
    });
});
