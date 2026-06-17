import uuid

import boto3
from django.conf import settings


ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png"}
MAX_FILE_SIZE = 5 * 1024 * 1024


def validate_image_file(uploaded_file):
    if uploaded_file.size > MAX_FILE_SIZE:
        raise ValueError("File size exceeds 5MB limit.")

    name = uploaded_file.name.lower()
    if not any(name.endswith(ext) for ext in ALLOWED_EXTENSIONS):
        raise ValueError("Only .jpg, .jpeg, and .png files are allowed.")


def upload_to_s3(uploaded_file, folder):
    validate_image_file(uploaded_file)

    extension = uploaded_file.name.rsplit(".", 1)[-1].lower()
    key = f"{folder}/{uuid.uuid4()}.{extension}"

    client = boto3.client(
        "s3",
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME,
    )

    client.upload_fileobj(
        uploaded_file,
        settings.AWS_STORAGE_BUCKET_NAME,
        key,
        ExtraArgs={"ContentType": uploaded_file.content_type},
    )

    return f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.{settings.AWS_S3_REGION_NAME}.amazonaws.com/{key}"

def delete_from_s3(photo_url):
    if not photo_url:
        return
    prefix = f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.{settings.AWS_S3_REGION_NAME}.amazonaws.com/"
    if photo_url.startswith(prefix):
        key = photo_url[len(prefix):]
        try:
            client = boto3.client(
                "s3",
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                region_name=settings.AWS_S3_REGION_NAME,
            )
            client.delete_object(
                Bucket=settings.AWS_STORAGE_BUCKET_NAME,
                Key=key
            )
        except Exception as e:
            print(f"Failed to delete {key} from S3: {e}")
