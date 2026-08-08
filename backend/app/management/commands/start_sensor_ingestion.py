from django.core.management.base import BaseCommand
from app.infra.mqtt.consumers import SensorIngestionConsumer

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        consumer = SensorIngestionConsumer()
        consumer.start()