from dataclasses import asdict

from app.domain.use_cases import GetDeviceReadingHistory, GetDeviceReadingHistoryParams
from app.infra.repositories import DeviceReadingRepository


class GetDeviceReadingHistoryController:
    def __init__(
            self,
            GetDeviceReadingHistoryUseCase: GetDeviceReadingHistory = GetDeviceReadingHistory(DeviceReadingRepository())
        ):
        self.__getDeviceReadingHistoryUseCase = GetDeviceReadingHistoryUseCase


    def execute(self, devEui: str, params: dict):
        getDeviceReadingHistoryParams = GetDeviceReadingHistoryParams.model_validate({
            "devEui": devEui,
            **params,
        })
        deviceReadings = self.__getDeviceReadingHistoryUseCase.execute(getDeviceReadingHistoryParams)

        return {
            "deviceReadings": [asdict(deviceReading) for deviceReading in deviceReadings]
        }
