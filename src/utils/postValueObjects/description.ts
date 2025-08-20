export default class Description {
    public readonly value: string
    constructor(value: string) {
        this.isValid(value);
        this.value = value;
    }

    private isValid(value:string) {
        if (!value || value.length < 10) {
            throw new Error('Description must be at least 10 characters long');
        }
    }
}