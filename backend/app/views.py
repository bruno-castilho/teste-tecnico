from dataclasses import asdict

from django.http import HttpRequest, JsonResponse
from django.views.decorators.http import require_GET

from app.infra.http.controllers import (
    GetCurrentReadingDeviceController,
    GetDeviceController,
    GetDeviceReadingHistoryController,
    ListDevicesController,
)

getDeviceController = GetDeviceController()
getCurrentReadingDeviceController = GetCurrentReadingDeviceController()
listDevicesController = ListDevicesController()
getDeviceReadingHistoryController = GetDeviceReadingHistoryController()


@require_GET
def list_devices(request: HttpRequest):
    params = {key: value for key, value in request.GET.items()}
    response = listDevicesController.execute(params)

    return JsonResponse(response)


@require_GET
def get_device(request: HttpRequest, devEui: str):
    response = getDeviceController.execute(devEui)

    return JsonResponse(response)


@require_GET
def get_current_reading(request: HttpRequest, devEui: str):
    response = getCurrentReadingDeviceController.execute(devEui)

    return JsonResponse(response)


@require_GET
def get_device_reading_history(request: HttpRequest, devEui: str):
    params = {key: value for key, value in request.GET.items()}
    response = getDeviceReadingHistoryController.execute(devEui, params)

    return JsonResponse(response)
