from app.domain.repositories import IDeviceRepository

from pydantic import BaseModel


class GetDeviceParams(BaseModel):
    devEui: str

class GetDevice:
    def __init__(
            self, 
            deviceRepository: IDeviceRepository,
        ):
        self.deviceRepository = deviceRepository

    def execute(self, params: GetDeviceParams):
        device = self.deviceRepository.getByDevEui(params.devEui)

        if device is None:
            Exception("Dispositivo não encontrado")


        return device