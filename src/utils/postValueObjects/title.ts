export default class Title {
    public readonly value: string
    constructor(value: string) {
        this.isValid(value);
        this.value = value;
    }

    private isValid(value:string) {
        if (!value || value.length < 2) {
            throw new Error('Title must be at least 2 characters long');
        }
    }
}