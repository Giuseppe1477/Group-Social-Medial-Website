
from http import HTTPStatus
from lambda_decorators import (
    cors_headers, json_http_resp, load_json_body
)

from common.util import (
    event_body, dynamo_paginator, table_name
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

    res = dynamo_paginator.paginate(
        **{
            'TableName': table_name,
            'FilterExpression': 'contains(user_id, :containsUser)',
            'ExpressionAttributeValues': {
                ':containsUser': {'S': user_id}
            }
        }
    )

    user_ids = []

    for user in res:
        print(user)
        for item in user.get('Items'):
            user_ids.append({
                'user_id': item.get('user_id').get('S'),
                'img': item.get('img').get('S'),
            })




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
            'user_ids': user_ids,
            'total': len(user_ids),
        },
    }
