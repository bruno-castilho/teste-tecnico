from app.domain.entities import DeviceReading
from abc import ABC, abstractmethod

class IDeviceReadingRepository(ABC):

    @abstractmethod
    def save(self, reading: DeviceReading):
        pass

    @abstractmethod
    def getLastBydDevEui(self, devEui: str) -> DeviceReading:
        pass