## Description

RabbitMQ is a messaging broker - an intermediary for messaging. It gives your applications a common platform to send and receive messages, and your messages a safe place to live until received.

You can to use gadin-rabbit package easily and setup it.

## Usage

### Step 1: Installation

```sh
npm install gadin-rabbit
```

wait for the installation to finish.

### Step 2: Module initialization

You've added below code in your root module:
```ts
@Module({
    imports: [
        RmqModule.register({
            uri: 'amqp://guest:guest@localhost:5672',
            name : "services",
            wait : true ,
            timeout : 20000,
            type : 'topic',
            prefetchCount : 10
        }),    
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
```

### Notice
    1. The name, wait, timeout, type and prefetchCount are optional.
    2. Default value of type is topic.

### Step 3: Use in Services

You've to add these decorators above the functions:

#### Subscribe
If the return value of your function is void, then you have to use this method:

```ts
@Subscribe({
    routingKey: 'user.add',
    queue: 'user-add',
})
addUser(objUser:any) : void
{
    // add user...
}
```

#### Rpc
If the return value of your function is not void, then you have to use this method:

```ts
@Rpc({
    routingKey: 'user.get',
    queue: 'user-get',
})
getUser(id:number) : User
{
    // get user...
}
```


### Notice
You've to inject RmqService in your service and use rabbit methods like below:
```ts
@Injectable()
export class AppService {
    constructor(private broker: RmqService) {
    }
}
```

If you want consume your messages should be use these decorators: 

#### publish
If you want to call void message, then you've to use this way:

```ts
await this.broker.publish('user.add', payload);
```


#### request
If you want to call don't void message, then you've to use this way:

```ts
return await this.broker.request<any>({ routingKey, payload, timeout });
```


### Hint
    Import RmqModule, RmqService, Rpc and Subscribe from the gadin-rabbit


## Author
[Mohammad Sardari](mailto:m.sardari@live.com)

## License

[MIT License](./LICENCE)
