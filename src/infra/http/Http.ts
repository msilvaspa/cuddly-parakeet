export default interface Http {
    on(
        url: string,
        method: string,
        handler: (req: Request, res: Response) => void
    ): void;
    listen(port: number): void;
}
