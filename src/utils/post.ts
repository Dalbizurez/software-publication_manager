import Title from "./postValueObjects/title";
import Description from "./postValueObjects/description";
import Author from "./postValueObjects/author";

export default class Post {
    constructor(
        public title: Title,
        public description: Description,
        public author: Author
    ) {}

    public static create(
        title: string,
        description: string,
        author: string
    ): Post {
        return new Post(
            new Title(title),
            new Description(description),
            new Author(author)
        );
    }
}