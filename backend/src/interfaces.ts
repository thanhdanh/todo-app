

export interface IModel<T> {
    collectionName: string;
    findList(): Promise<T[]>;
    findById(id: string): Promise<T>;
    insert(data: T | T[]): Promise<T | T[]>;
    update(id: string, data: T): Promise<T>;
}