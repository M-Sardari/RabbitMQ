export class RmqDto {
    uri: string;
    wait?: boolean;
    timeout?: number;
    name?: string;
    type?: string;
    prefetchCount?: number
}
