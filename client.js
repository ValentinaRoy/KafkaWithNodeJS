const {Kafka} = require("kafkajs");

exports.kafka = new Kafka({
    clientId:"my-first-app",
    brokers : ['192.168.0.104:9092'],
    connectionTimeout: 5000
});