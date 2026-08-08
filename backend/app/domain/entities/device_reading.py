from dataclasses import dataclass
from datetime import datetime

@dataclass
class DeviceReading:
    devEui: str
    time: datetime
    object: dict