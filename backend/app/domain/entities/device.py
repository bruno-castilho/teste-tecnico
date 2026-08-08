from dataclasses import dataclass

@dataclass
class Device:
    devEui: str
    deviceName: str
    deviceProfileId: str
    deviceProfileName: str