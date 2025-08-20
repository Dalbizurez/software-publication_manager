export default class Author {
    public readonly value: string
    constructor(value: string) {
        this.isValid(value);
        this.value = value;
    }

    private isValid(value:string) {
        if (!value || value.length < 3) {
            throw new Error('Author must be at least 3 characters long');
        }
    }
}
