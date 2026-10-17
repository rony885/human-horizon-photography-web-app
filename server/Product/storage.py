from django.conf import settings
from django.core.files.storage import FileSystemStorage


class PrivateMediaStorage(FileSystemStorage):
    def __init__(self, *args, **kwargs):
        kwargs["location"] = settings.BASE_DIR / "private_media"
        kwargs["base_url"] = None
        super().__init__(*args, **kwargs)

    def url(self, name):
        raise ValueError("Private files do not have public URLs.")


private_storage = PrivateMediaStorage()