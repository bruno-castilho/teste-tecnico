from app.domain.entities import Device, DeviceReading
from app.domain.repositories import IDeviceRepository, IDeviceReadingRepository

from datetime import datetime
from typing import Any
from pydantic import BaseModel


class IngestSensorDataParams(BaseModel):
    devEui: str
    deviceName: str
    deviceProfileId: str
    deviceProfileName: str
    time: datetime
    object: dict[str, Any]
    
class IngestSensorData:
    def __init__(
            self, 
            deviceRepository: IDeviceRepository,
            readingRepository: IDeviceReadingRepository,
        ):
        self.deviceRepository = deviceRepository
        self.readingRepository = readingRepository

    def execute(self, params: IngestSensorDataParams):
        device = self.deviceRepository.getByDevEui(params.devEui)

        if device is None:
            device = Device(
                devEui=params.devEui,
                deviceName=params.deviceName,
                deviceProfileId=params.deviceProfileId,
                deviceProfileName=params.deviceProfileName
            )
            self.deviceRepository.save(device)

        deviceReading = DeviceReading(
            devEui=params.devEui,
            time=params.time,
            object=params.object
        )

        self.readingRepository.save(deviceReading)