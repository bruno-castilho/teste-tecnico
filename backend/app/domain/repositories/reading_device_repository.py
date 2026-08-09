from app.domain.entities import DeviceReading
from abc import ABC, abstractmethod
from datetime import datetime

class IDeviceReadingRepository(ABC):

    @abstractmethod
    def save(self, reading: DeviceReading):
        pass

    @abstractmethod
    def getLastBydDevEui(self, devEui: str) -> DeviceReading:
        pass

    @abstractmethod
    def listByDevEuiSince(self, devEui: str, since: datetime) -> list[DeviceReading]:
        pass