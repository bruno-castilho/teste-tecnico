from app.domain.entities import DeviceReading
from app.domain.repositories import IDeviceReadingRepository

from app.models import DeviceReading as DeviceReadingModel


class DeviceReadingRepository(IDeviceReadingRepository):

    def save(self, deviceReading: DeviceReading):
        DeviceReadingModel.objects.create(
            device_id=deviceReading.devEui,
            time=deviceReading.time,
            object=deviceReading.object,
        )


