from dataclasses import dataclass
from typing import List, Literal
from app.domain.entities import Device
from app.domain.repositories import IDeviceRepository

from pydantic import BaseModel, Field

class ListDevicesParams(BaseModel):
    page: int = Field(default=1, ge=1)
    pageSize: int = Field(default=20, ge=1, le=100)
    search: str = ""
    sortBy: Literal["deviceName", "deviceProfileName"] = "deviceName"
    sortOrder: Literal["asc", "desc"] = "asc"


@dataclass
class ListDevicesResult:
    devices: List[Device]
    page: int
    pageSize: int
    total: int
    totalPages: int


class ListDevices:
    def __init__(
            self,
            deviceRepository: IDeviceRepository,
        ):
        self.deviceRepository = deviceRepository

    def execute(self, params: ListDevicesParams) -> ListDevicesResult:
        devices, total = self.deviceRepository.list(
            page=params.page,
            pageSize=params.pageSize,
            search=params.search,
            sortBy=params.sortBy,
            sortOrder=params.sortOrder,
        )

        totalPages = (total + params.pageSize - 1) // params.pageSize

        return ListDevicesResult(
            devices=devices,
            page=params.page,
            pageSize=params.pageSize,
            total=total,
            totalPages=totalPages,
        )
