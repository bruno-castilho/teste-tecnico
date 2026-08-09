from app.domain.entities import Device
from app.domain.repositories import IDeviceRepository
from app.models import Device as DeviceModel
from django.db.models import Q
from typing import Literal


class DeviceRepository(IDeviceRepository):
    def getByDevEui(self, devEui: str) -> Device | None:
        model = DeviceModel.objects.filter(pk=devEui).first()

        if model is None:
            return None

        return self.__to_entity(model)

    def list(
        self,
        page: int,
        pageSize: int,
        search: str,
        sortBy: Literal['deviceName', 'deviceProfileName'],
        sortOrder: str,
    ) -> tuple[list[Device], int]:
        queryset = DeviceModel.objects.all()

        if search:
            queryset = queryset.filter(
                Q(deviceName__icontains=search)
                | Q(deviceProfileName__icontains=search)
                | Q(devEui__icontains=search)
            )

        prefix = "-" if sortOrder == "desc" else ""
        queryset = queryset.order_by(f"{prefix}{sortBy}")

        total = queryset.count()

        offset = (page - 1) * pageSize
        pageQueryset = queryset[offset:offset + pageSize]

        return [self.__to_entity(model) for model in pageQueryset], total

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
