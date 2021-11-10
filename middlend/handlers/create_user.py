
from http import HTTPStatus
from botocore.exceptions import ClientError
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
    passwd = body.get('pass')
    img = body.get('img') or ''
    is_admin = bool(body.get('is_admin')) or False
    print('admin:', is_admin)

    user_existing = dynamo_table.get_item(
        **{
            'Key': {
                'user_id': user_id,
            }
        }
    )

    user_existing = user_existing.get('Item', {})

    if user_existing:
        status_code = HTTPStatus.CONFLICT
        message = 'User already exists.'
        print(message)
    else:
        item = {
            'user_id': user_id,
            'pass': passwd,
            'img': img,
            'is_admin': is_admin
        }
        print('creating')

        try:
            res = dynamo_table.put_item(
                **{
                    'Item': item
                }
            )
        except ClientError as err:
            print('Client Error:', err)
            status_code = HTTPStatus.INTERNAL_SERVER_ERROR
            message = 'Create-User failed.'

    return {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': True,
        },
        'message': message,
        'statusCode': status_code,
        **item,
    }
