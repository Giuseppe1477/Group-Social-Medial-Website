
from http import HTTPStatus
from json import dumps
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import *

from common.util import (
    event_body, dynamo_paginator, table_name, dynamo_table,
)
from lambda_decorators import (
    cors_headers, json_http_resp, load_json_body
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

    user_id = body.get('user_id')
    user_ids = []

    user_attr = Attr('user_id').contains(user_id)

    try:
        res = dynamo_table.scan(
            **{
                'FilterExpression': user_attr,
            }
        )
        for user in res.get('Items', []):
            user_ids.append(user)

    except ClientError as err:
        print('Client Error:', err)
        status_code = HTTPStatus.INTERNAL_SERVER_ERROR
        message = 'Failed. InternalServerError.'

    return {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': True,
        },

        'statusCode': status_code,
        'message': message,
        'user_ids': user_ids,
        'total': len(user_ids),
    }
