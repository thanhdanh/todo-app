import { Collection, Db, ObjectId } from "mongodb";
import { IModel } from "../../interfaces";

export enum TodoPriority {
    Low = 'Low',
    Normal = 'Normal',
    High = 'High',
}

export interface ITodo {
    _id?: string | ObjectId | undefined;
    title: string;
    description?: string;
    priority: TodoPriority;
    completed: boolean;
    deleted: boolean;
    dueDate: string;
    createdAt: Date;
    updatedAt: Date;
}

export default class TodoModel implements IModel<ITodo> {
    collectionName: string = 'todos';
    private readonly todoCollection: Collection<ITodo>;

    constructor(db: Db) {
        this.todoCollection = db.collection(this.collectionName);
    }

    findList() {
        const cursor = this.todoCollection.find({
            deleted: false,
        }).sort({
            priority: -1
        });

        return cursor.toArray();
    }

    async findById(id: string) {
        try {
            const result = await this.todoCollection.findOne({
                _id: new ObjectId(id),
            })
            return result;
        } catch (error) {
            console.log("error", error);
            throw error;
        }
        
    }

    async insert(doc: Omit<ITodo, '_id'>) {
        doc.createdAt = new Date();
        doc.updatedAt = doc.createdAt;
        
        return this.todoCollection.insertOne(doc)
            .then(data => ({
                ...doc,
                _id: data.insertedId,
            }));
    }

    async update(id: string, doc: ITodo): Promise<ITodo| null> {
        doc.updatedAt = new Date();
        const result = await this.todoCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: doc },
        );
        if (result.matchedCount) {
            return await this.findById(id);
        }
        return null;
    }
}