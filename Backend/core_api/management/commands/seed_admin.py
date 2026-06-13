from django.core.management.base import BaseCommand

from core_api.auth import seed_hardcoded_admins


class Command(BaseCommand):
    help = "Seed hardcoded admin users into MongoDB."

    def handle(self, *args, **options):
        seed_hardcoded_admins()
        self.stdout.write(self.style.SUCCESS("Hardcoded admin users seeded."))
