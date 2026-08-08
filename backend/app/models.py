from django.db import models

class Device(models.Model):
    devEui = models.CharField(max_length=32, primary_key=True)
    deviceName = models.CharField(max_length=255)
    deviceProfileId = models.CharField(max_length=36)
    deviceProfileName = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.devEui},{self.deviceName},{self.deviceProfileId}"

class DeviceReading(models.Model):
    pk = models.CompositePrimaryKey("device", "time")

    device = models.ForeignKey(
        Device, on_delete=models.CASCADE, related_name="readings"
    )
    time = models.DateTimeField()

    object = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"{self.pk} {self.device} {self.time} {self.object}"