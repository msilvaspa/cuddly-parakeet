import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";
import Connection from "../../database/Connection";

export default class CouponRepositoryDatabase implements CouponRepository {
    constructor(readonly connection: Connection) {}
    async findByCode(id: string): Promise<Coupon | undefined> {
        const [coupon] = await this.connection.query(
            "select * from ccca.coupon where code = $1",
            [id]
        );
        if (!coupon) return;
        return new Coupon(coupon.code, coupon.percentage, coupon.expire_date);
    }
}
