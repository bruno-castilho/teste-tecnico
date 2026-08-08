from app.domain.entities import Device 
from abc import ABC, abstractmethod

class IDeviceRepository(ABC):
    @abstractmethod
    def getByDevEui(self, devEui: str) -> Device:
        pass

    @abstractmethod
    def save(self, device: Device):
        pass