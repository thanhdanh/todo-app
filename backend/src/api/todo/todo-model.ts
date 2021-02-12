import { Collection, Db, ObjectId } from "mongodb";
import { IModel } from "../../interfaces";

export enum TodoPriority {
    Low = 'Low',
    Normal = 'Normal',
    High = 'High',
    Immediate = 'Immediate',
}

export interface ITodo {
    id: number;
    title: string;
    priority: TodoPriority;
    completed: boolean;
    deleted: boolean;
    createdDate: Date;
    updateAt: Date;
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

    findById(id: string) {
        return this.todoCollection.findOne({
            _id: new ObjectId(id),
        })
    }

    async insert(doc: ITodo) {
        doc.createdDate = new Date();
        doc.updateAt = doc.createdDate;
        doc.deleted = false;
        doc.completed = false;
        
        return this.todoCollection.insertOne(doc)
            .then(data => ({
                ...doc,
                _id: data.insertedId,
            }));
    }

    async update(id: string, doc: ITodo) {
        doc.updateAt = new Date();
        
        const result = await this.todoCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: doc },
        );
        if (result.matchedCount) {
            return this.findById(id);
        }
        return null;
    }
}