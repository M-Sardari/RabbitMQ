import { Module } from "@nestjs/common";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { RmqService } from "./rmq.service";

class RmqModuleDto {
    uri: string;
    wait?: boolean;
    timeout?: number;
    name?: string;
    type?: string;
    prefetchCount?: number
}

let config: {
    uri: string,
    wait: boolean,
    timeout: number,
    name: string,
    type: string,
    prefetchCount: number
} = {
    uri: "",
    wait: true,
    timeout: 0,
    name: "",
    type: "",
    prefetchCount: 10
};

@Module({
    imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
            useFactory: () => ({
                exchanges: [
                    {
                        name: config.name,
                        type: config.type,
                    },
                ],
                connectionInitOptions: { wait: config.wait, timeout: config.timeout },
                uri: `${config.uri}`,
                prefetchCount: config.prefetchCount,
            })
        }),],
    exports: []
})
export class RmqModule {
    static register(body: RmqModuleDto) {
        const { uri, wait = true , timeout = 20000, name = "services", type = 'topic', prefetchCount = 10 } = body;
        Object.assign(config, {
            uri,
            wait,
            timeout,
            name,
            type,
            prefetchCount
        });

        return {
            global: true,
            module: RmqModule,
            providers: [RmqService],
            exports: [RmqService, RabbitMQModule]
        }
    }
}
