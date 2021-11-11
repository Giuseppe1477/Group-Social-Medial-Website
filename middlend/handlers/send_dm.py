
import time
from uuid import uuid4
from http import HTTPStatus
from botocore.exceptions import ClientError
from lambda_decorators import (
    cors_headers, json_http_resp, load_json_body
)

from common.util import (
    event_body, dynamo_table, create_conversation_id
)

"""
Author: Ron Nathaniel
Release: Beta
Course: CS 490: 101
"""


@cors_headers
@load_json_body
@json_http_resp
def main(event, _):
    status_code = HTTPStatus.OK
    message = 'success'

    body = event_body(event)

    user_sender_id = body.get('user_id')
    user_recipient_id = body.get('user_recipient_id')
    conversation_id = create_conversation_id([user_sender_id, user_recipient_id])
    text = body.get('text')
    created_at = int(time.time())

    message_id = str(uuid4())

    item = {
        'type': 'dm',
        'conversation_id': conversation_id,
        'dm_id': user_recipient_id,
        'message_id': message_id,
        'user_id': user_sender_id,
        'text': text,
        'created_at': created_at,
    }
    print(item)

    try:

        dynamo_table.put_item(
            **{
                'Item': item
            }
        )

    except ClientError as err:

        status_code = HTTPStatus.INTERNAL_SERVER_ERROR
        message = 'Send-DM failed. ' + err

    return {
        'statusCode': status_code,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': True,
        },
        'message': message,
        'statusCode': status_code,
        **item,
    }
