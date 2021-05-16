export class Message {
    channel: string;
    sender: string;
    receiver: string;
    content: string;
    timestamp?: Date;
    readDate?: Date;
}