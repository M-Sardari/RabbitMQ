import { Injectable } from "@nestjs/common";
import { AmqpConnection, RequestOptions } from "@golevelup/nestjs-rabbitmq";

type MessageOptions = Pick<RequestOptions, | 'payload' | 'routingKey'> & { exchange?: string, timeout?: number, headers?: any };

@Injectable()
export class RmqService {
    constructor(private readonly rmq: AmqpConnection) { }

    async publish(options: MessageOptions) {
        const { exchange, routingKey, payload, ...otherOptions } = options;
        await this.rmq.publish(exchange || 'services', routingKey, payload, otherOptions);
    }

    async request<T>(options: MessageOptions) {
        const { exchange, timeout } = options;
        return await this.rmq.request<T>({
            ...options,
            exchange: exchange || 'services',
            timeout: timeout || 60000,
        });
    }
}
