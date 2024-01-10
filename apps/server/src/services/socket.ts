import { Server } from "socket.io";
import { Redis } from "ioredis";

const pub = new Redis({
    host: 'redis-358001c4-saquib-df30.a.aivencloud.com',
    port: 10677,
    username: 'default',
    password: 'AVNS_VvJ7lvt8rYzZTKlFBa1',
});
const sub = new Redis({
    host: 'redis-358001c4-saquib-df30.a.aivencloud.com',
    port: 10677,
    username: 'default',
    password: 'AVNS_VvJ7lvt8rYzZTKlFBa1',
});

class SocketService {
    private _io: Server;

    constructor() {
        console.log("Init Socket Service...");
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            }
        });
        sub.subscribe("MESSAGES");
    }

    public initListeners() {
        console.log("Init Socket Listeners...");
        
        const io = this._io;
        io.on('connect', socket => {
            console.log("New Socket Connected", socket.id);

            socket.on('event:message',async ({message}:{message:string}) => {
                console.log('New message received: ', message);
                //publish this message to redis
                await pub.publish("MESSAGES", JSON.stringify({message}));
                
            })
            
        })

        sub.on("message", (channel, message) => {
            if(channel === "MESSAGES") {
                io.emit("message", message);
            }
        })
    }

    get io() {
        return this._io;
    }
}

export default SocketService;