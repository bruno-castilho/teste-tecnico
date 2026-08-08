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

    def getLastBydDevEui(self, devEui: str) -> DeviceReading | None:
        model = (
            DeviceReadingModel.objects.filter(device_id=devEui)
            .order_by("-time")
            .first()
        )

        if model is None:
            return None

        return self.__to_entity(model)

    def __to_entity(self, model: DeviceReadingModel) -> DeviceReading:
        return DeviceReading(
            devEui=model.device_id,
            time=model.time,
            object=model.object,
        )
