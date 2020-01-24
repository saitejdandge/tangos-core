import {BaseModel} from "../src/models/base.model";

class Book extends BaseModel {
    collectionName: string = "books";
    schema: any = Book.getMongoSchema({name: String});


}

export default Book;
