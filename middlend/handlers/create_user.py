
from http import HTTPStatus
from lambda_decorators import (
    cors_headers, json_http_resp, load_json_body
)

from common.util import (
    event_body, dynamo_client, dynamo_table
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
    status_code = HTTPStatus.CREATED
    message = 'success'

    body = event_body(event)

    user_id = body.get('user_id')
    img = body.get('img') or ''
    admin = bool(body.get('admin')) or False

    user_existing = dynamo_table.get_item(
        **{
            'Key': {
                'user_id': user_id,
            }
        }
    ).get('Item', {})

    if user_existing:
        status_code = HTTPStatus.CONFLICT
        message = 'User already exists.'
    else:
        item = {
            'type': 'user',
            'user_id': user_id,
            'img': img,
            'admin': admin
        }

        res = dynamo_table.put_item(
            **{
                'Item': item
            }
        )

        if res.get('Attributes') != item:
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
            'admin': False,
        },
    }
