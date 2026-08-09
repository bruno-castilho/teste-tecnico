from app.domain.use_cases import ListDevices, ListDevicesParams
from app.infra.repositories import DeviceRepository

from dataclasses import asdict

class ListDevicesController:
    def __init__(
            self,
            ListDevicesUseCase: ListDevices = ListDevices(DeviceRepository())
        ):
        self.__ListDevicesUseCase = ListDevicesUseCase


    def execute(self, params: dict):
        listDevicesParams = ListDevicesParams.model_validate(params)

        result = self.__ListDevicesUseCase.execute(listDevicesParams)

        return {
            "devices": [asdict(device) for device in result.devices],
            "pagination": {
                "page": result.page,
                "pageSize": result.pageSize,
                "total": result.total,
                "totalPages": result.totalPages,
            },
        }
