export default class PersonException extends Error {
    message: string;

    constructor(message: string) {
        super();
        this.message = message;
    }
}