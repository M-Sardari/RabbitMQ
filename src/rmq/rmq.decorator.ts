import {
  RabbitRPC,
  RabbitSubscribe,
  MessageHandlerOptions,
  MessageHandlerErrorBehavior,
} from '@golevelup/nestjs-rabbitmq';

export const Rpc = (options: MessageHandlerOptions) =>
  RabbitRPC({
    ...options,
    exchange: options.exchange || 'services',
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  });

export const Subscribe = (options: MessageHandlerOptions) =>
  RabbitSubscribe({
    ...options,
    exchange: options.exchange || 'services',
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  });