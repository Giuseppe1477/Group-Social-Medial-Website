
from uuid import uuid4
from http import HTTPStatus
from botocore.exceptions import ClientError

from lambda_decorators import (
    cors_headers, json_http_resp, load_json_body
)

from common.util import (
    event_body, dynamo_table
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
    post_id = body.get('post_id')
    text = body.get('text')

    comment_id = str(uuid4())
    message_id = str(uuid4())

    item = {
        'type': 'comment',
        'message_id': message_id,
        'comment_id': comment_id,
        'post_id': post_id,
        'user_id': user_id,
        'text': text,
    }

    try:
        dynamo_table.put_item(
            **{
                'Item': item
            }
        )
    except ClientError as err:
        print('Client Error:', err)
        status_code = HTTPStatus.INTERNAL_SERVER_ERROR
        message = 'Create-Comment failed.'

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
            **item,
        },
    }
