const { kafka } = require('./client');
const readline = require('readline');
 // to take input from user in cli 
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});


async function init(){
    const producer = kafka.producer();

    console.log("connecting producer");
    await producer.connect();
    console.log("producer connected");

    rl.setPrompt('>');
    rl.prompt();

    rl.on('line',async function (line){
        const [riderName,location] = line.split(" ");
        await producer.send({
            topic: "rider-status",
            messages: [
                {   
                    partition: location.toLowerCase() === 'north' ? 0 : 1,
                    key: 'location-updates', 
                    value: JSON.stringify({ name:riderName, location}),
                },
            ],
        });

    }).on("close", async ()=>{
        await producer.disconnect();
    })
    

   
}

init();