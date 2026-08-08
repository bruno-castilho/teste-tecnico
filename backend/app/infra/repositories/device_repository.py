from app.domain.entities import Device
from app.domain.repositories import IDeviceRepository

from app.models import Device as DeviceModel


class DeviceRepository(IDeviceRepository):
    def getByDevEui(self, devEui: str) -> Device | None:
        model = DeviceModel.objects.filter(pk=devEui).first()

        if model is None:
            return None

        return self.__to_entity(model)

    def save(self, device: Device):
        DeviceModel.objects.create(
            devEui=device.devEui,
            deviceName=device.deviceName,
            deviceProfileId=device.deviceProfileId,
            deviceProfileName=device.deviceProfileName,
        )

    def __to_entity(self, model: DeviceModel) -> Device:
        return Device(
            devEui=model.devEui,
            deviceName=model.deviceName,
            deviceProfileId=model.deviceProfileId,
            deviceProfileName=model.deviceProfileName,
        )
