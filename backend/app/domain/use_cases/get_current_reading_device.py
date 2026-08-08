from app.domain.repositories import IDeviceReadingRepository
from pydantic import BaseModel


class GetCurrentReadingDeviceParams(BaseModel):
    devEui: str

class GetCurrentReadingDevice:
    def __init__(
            self, 
            readingRepository: IDeviceReadingRepository,
        ):
        self.readingRepository = readingRepository

    def execute(self, params: GetCurrentReadingDeviceParams):
        lastDeviceReading = self.readingRepository.getLastBydDevEui(params.devEui)

        if lastDeviceReading is None:
            Exception("Dispositivo não encontrado")


        return lastDeviceReading