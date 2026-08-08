from app.domain.use_cases import IngestSensorDataParams, IngestSensorData
from app.infra.repositories import DeviceRepository, DeviceReadingRepository

import json

import paho.mqtt.client as mqtt


class SensorIngestionConsumer:
    def __init__(
            self,
            topic: str = "application/+/device/+/event/up",
            mqttClient = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2),
            ingestSensorDataUseCase: IngestSensorData = IngestSensorData(DeviceRepository(), DeviceReadingRepository())
    ):
        self.__topic = topic
        self.__mqttClient = mqttClient
        self.__ingestSensorDataUseCase = ingestSensorDataUseCase

    def start(self):
        self.__mqttClient.on_message = self.__on_message
        self.__mqttClient.on_connect = self.__on_connect

        self.__mqttClient.connect("localhost", 1883)

        self.__mqttClient.loop_forever()


    def __on_message(self, client, userdata, msg):
        payload = json.loads(msg.payload)

        ingestSensorDataParams = IngestSensorDataParams.model_validate({
                "devEui": payload["deviceInfo"]["devEui"],
                "deviceName": payload["deviceInfo"]["deviceName"],
                "deviceProfileId": payload["deviceInfo"]["deviceProfileId"],
                "deviceProfileName": payload["deviceInfo"]["deviceProfileName"],  
                "time": payload["time"],
                "object": payload["object"],
        })
        self.__ingestSensorDataUseCase.execute(ingestSensorDataParams)


    def __on_connect(self, client, userdata, flags, reason_code, properties):
        client.subscribe(self.__topic)
        print(f"Subscribed to {self.__topic}")