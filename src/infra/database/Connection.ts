export default interface Connection {
    // isConnected(): boolean;
    query(statement: string, params: any[]): Promise<any>;
}
