export default class OrderCode {
    readonly value: string;
    constructor(date: Date, sequence: number) {
        this.value = date.getFullYear() + sequence.toString().padStart(8, "0");
    }
}
