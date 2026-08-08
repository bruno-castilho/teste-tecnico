from dataclasses import asdict

from django.http import HttpRequest, JsonResponse
from django.views.decorators.http import require_GET

from app.infra.http.controllers import GetCurrentReadingController, GetDeviceController

getDeviceController = GetDeviceController()
getCurrentReadingController = GetCurrentReadingController()


@require_GET
def get_device(request: HttpRequest, devEui: str):
    response = getDeviceController.execute(devEui)

    return JsonResponse(response)


@require_GET
def get_current_reading(request: HttpRequest, devEui: str):
    response = getCurrentReadingController.execute(devEui)

    return JsonResponse(response)
