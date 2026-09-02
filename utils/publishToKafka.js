import pkg from "kafkajs";
const { Kafka } = pkg;
import dotenv from "dotenv";
dotenv.config();

const kafka = new Kafka({
  clientId: "condense-pipeline-service-" + Date.now(), // Append Current Epoch milliseconds for Random Id
  brokers: [
    process.env.KAFKA_BOOTSTRAP_SERVER_URL ||
      "my-cluster-kafka-bootstrap.kafka:9092",
  ],
  sasl: {
    mechanism: "scram-sha-512",
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
});

// Producer
const producer = kafka.producer();

export async function publishKafka(obj, key) {
  try {
    await producer.connect();
    // Sample publish
    await producer.send({
      topic: process.env.PUBLISH_TOPIC,
      messages: [{ key: key, value: obj }],
    });
    console.info("publishKafka: Message published successfully!");
    return true;
  } catch (err) {
    console.error(
      "publishKafka: Error while publishing to Kafka: ",
      err.toString(),
    );
    return false;
  }
}
