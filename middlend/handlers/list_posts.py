
from http import HTTPStatus
from json import dumps
from botocore.exceptions import ClientError

from common.util import (
    event_body, dynamo_paginator, table_name
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
    posts = []

    try:
        res = dynamo_paginator.paginate(
            **{
                'TableName': table_name,
                'FilterExpression': 'user_id = :user_id and #type = :type',
                'ExpressionAttributeNames': {
                    '#type': 'type',
                },
                'ExpressionAttributeValues': {
                    ':user_id': {'S': user_id},
                    ':type': {'S': 'post'},
                }
            }
        )

        for post in res:
            print(post)
            for item in post.get('Items'):
                if not item.get('is_hidden').get('BOOL'):
                    posts.append({
                        'user_id': item.get('user_id').get('S'),
                        'post_id': item.get('post_id').get('S'),
                        'img': item.get('img').get('S'),
                        'type': item.get('type').get('S'),
                    })
    except ClientError as err:
        print('Client Error:', err)
        status_code = HTTPStatus.INTERNAL_SERVER_ERROR
        message = 'Failed. InternalServerError.'

    return {
        'statusCode': status_code,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': True,
        },
        'body': dumps({
            'message': message,
            'statusCode': status_code,
            'posts': posts,
            'total': len(posts),
        }),
    }
