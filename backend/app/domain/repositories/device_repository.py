from app.domain.entities import Device 
from abc import ABC, abstractmethod

class IDeviceRepository(ABC):
    @abstractmethod
    def getByDevEui(self, devEui: str) -> Device:
        pass

    @abstractmethod
    def list(
        self,
        page: int,
        pageSize: int,
        search: str,
        sortBy: str,
        sortOrder: str,
    ) -> tuple[list[Device], int]:
        pass

    @abstractmethod
    def save(self, device: Device):
        pass