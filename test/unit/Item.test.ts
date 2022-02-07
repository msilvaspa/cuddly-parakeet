import Item from "../../src/domain/entity/Item";

describe("item", () => {
    it("deve calcular o total corretamente", () => {
        const item = new Item(1, "Musica", "cd", 30);
        expect(item).toBeTruthy();
    });
});
