
import json
from uuid import uuid4
from http import HTTPStatus
import boto3
from boto3.dynamodb.conditions import *
from botocore.exceptions import ClientError
from common.util import (
    event_body, dynamo_table, table_name, dynamo_paginator
)
from lambda_decorators import (
    cors_headers, json_http_resp, load_json_body
)


"""
Author: Ron Nathaniel
Release: Candidate
Course: CS 490: 101
"""


@cors_headers
@load_json_body
@json_http_resp
def main(event, _):
    status_code = HTTPStatus.OK
    message = 'success'

    body = event_body(event)

    message_id = body.get('message_id')

    try:
        dynamo_table.update_item(
            **{
                'Key': {
                    'message_id': message_id,
                },
                'UpdateExpression': 'SET #is_hidden = :is_hidden',
                'ExpressionAttributeNames': {
                    '#is_hidden': 'is_hidden',
                },
                'ExpressionAttributeValues': {
                    ':is_hidden': True,
                },
            }
        )

    except ClientError as err:
        print('Client Error:', err)
        status_code = HTTPStatus.INTERNAL_SERVER_ERROR
        message = 'Failed. InternalServerError. Could not Update.'

    return {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': True,
        },

        'message': message,
        'statusCode': status_code,

        'message_id': message_id,
    }
