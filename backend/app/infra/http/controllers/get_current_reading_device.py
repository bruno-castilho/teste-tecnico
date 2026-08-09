from app.domain.use_cases import GetCurrentReadingDevice, GetCurrentReadingDeviceParams
from app.infra.repositories import DeviceReadingRepository

from dataclasses import asdict

class GetCurrentReadingDeviceController:
    def __init__(
            self,
            getCurrentReadingDeviceUseCase: GetCurrentReadingDevice = GetCurrentReadingDevice(DeviceReadingRepository())
        ):
        self.__getCurrentReadingDeviceUseCase = getCurrentReadingDeviceUseCase


    def execute(self, devEui: str):
        getCurrentReadingParams = GetCurrentReadingDeviceParams.model_validate({
            "devEui": devEui
        })
        deviceReading = self.__getCurrentReadingDeviceUseCase.execute(getCurrentReadingParams)

        return {
            "deviceReading": asdict(deviceReading)
        }