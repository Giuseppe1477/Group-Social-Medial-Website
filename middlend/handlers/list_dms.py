
from uuid import uuid4
import json
from decimal import Decimal
from http import HTTPStatus
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import *

from lambda_decorators import (
    cors_headers, json_http_resp, load_json_body
)

from common.util import (
    event_body, dynamo_table, table_name, create_conversation_id
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
    user_recipient_id = body.get('user_recipient_id')
    conversation_id = create_conversation_id([user_id, user_recipient_id])
    print(conversation_id)

    dms = []
    dm_attr = (
        Attr('type').eq('dm')
        &
        Attr('user_id').eq(user_id)
        &
        Attr('conversation_id').eq(conversation_id)
    )

    try:
        res = dynamo_table.scan(
            **{
                'FilterExpression': dm_attr
            }
        )
        print(res)

        for dm in res.get('Items', []):
            dm['created_at'] = int(dm.get('created_at', 0))
            dms.append(dm)
    except ClientError as err:
        print('Client Error: ', err)

        status_code = HTTPStatus.INTERNAL_SERVER_ERROR
        message = 'Create-User failed.'

    dms = sorted(dms, key=lambda d: d.get('created_at', 0))

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
            'dms': dms,
            'total': len(dms),
            'user_id': user_id,
            'user_recipient_id': user_recipient_id,
        },
    }
