from datetime import timedelta

from django.utils import timezone
from pydantic import BaseModel, Field

from app.domain.entities import DeviceReading
from app.domain.repositories import IDeviceReadingRepository


class GetDeviceReadingHistoryParams(BaseModel):
    devEui: str
    hours: int = Field(default=1, ge=1, le=168)

class GetDeviceReadingHistory:
    def __init__(
            self,
            deviceReadingRepository: IDeviceReadingRepository,
        ):
        self.deviceReadingRepository = deviceReadingRepository

    def execute(self, params: GetDeviceReadingHistoryParams) -> list[DeviceReading]:
        since = timezone.now() - timedelta(hours=params.hours)

        deviceReading = self.deviceReadingRepository.listByDevEuiSince(params.devEui, since)

        return deviceReading
