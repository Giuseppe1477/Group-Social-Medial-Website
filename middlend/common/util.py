
import os
import uuid
import hashlib
import boto3
from typing import List


def event_body(event: dict) -> dict:
    body = event.get('body', {})
    if body:
        event = body
    return event


def create_conversation_id(users: List[str]) -> str:
    seed = ' '.join(sorted(users)).encode('utf-8')

    hasher = hashlib.sha256()
    hasher.update(seed)
    return str(uuid.UUID(hasher.hexdigest()))


table_name = os.environ.get('DYNAMO_TABLE')

dynamo_client = boto3.client('dynamodb', region_name='us-east-2')
dynamo_resource = boto3.resource('dynamodb', region_name='us-east-2')
dynamo_table = dynamo_resource.Table(table_name)
dynamo_paginator = dynamo_client.get_paginator('scan')
