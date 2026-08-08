from app.domain.use_cases import GetDevice, GetDeviceParams
from app.infra.repositories import DeviceRepository

from dataclasses import asdict

class GetDeviceController:
    def __init__(
            self,
            GetDeviceUseCase: GetDevice = GetDevice(DeviceRepository())
        ):
        self.__GetDeviceUseCase = GetDeviceUseCase


    def execute(self, devEui: str):
        getDeviceParams = GetDeviceParams.model_validate({
            "devEui": devEui
        })

        device = self.__GetDeviceUseCase.execute(getDeviceParams)

        return {
            "device": asdict(device)
        }