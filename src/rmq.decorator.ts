import {
  RabbitRPC,
  RabbitSubscribe,
  MessageHandlerOptions,
  MessageHandlerErrorBehavior,
} from '@golevelup/nestjs-rabbitmq';
import {DEFAULT_EXCHANGE_NAME} from "./rmq.constant";

export const Rpc = (options: MessageHandlerOptions) =>
    RabbitRPC({
        ...options,
        exchange: options.exchange || DEFAULT_EXCHANGE_NAME,
        errorBehavior: MessageHandlerErrorBehavior.NACK,
    });

export const Subscribe = (options: MessageHandlerOptions) =>
    RabbitSubscribe({
        ...options,
        exchange: options.exchange || DEFAULT_EXCHANGE_NAME,
        errorBehavior: MessageHandlerErrorBehavior.NACK,
    });
