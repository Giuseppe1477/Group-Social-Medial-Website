
from uuid import uuid4
from http import HTTPStatus
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

    user_id_sender = body.get('user_id')
    user_id_recipient = body.get('user_id_recipient')
    conversation_id = create_conversation_id([user_id_sender, user_id_recipient])
    text = body.get('message')

    dm_id = str(uuid4())

    item = {
        'type': 'dm',
        'conversation_id': conversation_id,
        'user_id': user_id_sender,
        'message': text,
    }

    res = dynamo_table.put_item(
        **{
            'Item': item
        }
    )

    if res.get('Attributes', {}) != item:
        print('Not the same Attrs. Failed.')
        print('item:')
        print(item)
        print('attrs:')
        print(res.get('Attributes'))

        status_code = HTTPStatus.INTERNAL_SERVER_ERROR
        message = 'Create-User failed.'

    return {
        'statusCode': status_code,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': True,
        },
        'body': {
            'message': message,
            'statusCode': status_code,
            'dm_id': dm_id,
        },
    }
