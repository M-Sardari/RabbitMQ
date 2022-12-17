import {DynamicModule, Module} from "@nestjs/common";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {RmqDto} from "./rmq.dto";
import {RmqService} from "./rmq.service";
import {
    DEFAULT_EXCHANGE_NAME,
    DEFAULT_EXCHANGE_TYPE,
    DEFAULT_PREFETCH_COUNT,
    DEFAULT_TIMEOUT,
    DEFAULT_WAIT
} from "./rmq.constant";

@Module({
    providers: [RmqService],
    exports: [RmqService]
})
export class RmqModule extends RabbitMQModule {
    static register(options: RmqDto): DynamicModule {
        return {
            ...super.forRootAsync(RabbitMQModule, {
                useFactory: () => ({
                    exchanges: [
                        {
                            name: options.name || DEFAULT_EXCHANGE_NAME,
                            type: options.type || DEFAULT_EXCHANGE_TYPE,
                        },
                    ],
                    connectionInitOptions: {
                        wait: options.wait || DEFAULT_WAIT,
                        timeout: options.timeout || DEFAULT_TIMEOUT,
                    },
                    uri: options.uri,
                    prefetchCount: options.prefetchCount || DEFAULT_PREFETCH_COUNT,
                }),
            }),
        };
    }
}
