import Coupon from "../entity/Coupon";

export default interface CouponRepository {
    findByCode(id: string): Promise<Coupon | undefined>;
}
