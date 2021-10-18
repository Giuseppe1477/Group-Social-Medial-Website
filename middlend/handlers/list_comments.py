
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

    post_id = body.get('post_id')

    res = dynamo_paginator.paginate(
        **{
            'TableName': table_name,
            'FilterExpression': 'post_id = :post_id and type = :type)',
            'ExpressionAttributeValues': {
                ':post_id': {'S': post_id},
                ':type': {'S': 'comment'},
            }
        }
    )

    comments = []

    for comment in res:
        print(comment)
        for item in comment.get('Items'):
            comments.append({
                'user_id': item.get('user_id').get('S'),
                'post_id': item.get('post_id').get('S'),
                'comment_id': item.get('comment_id').get('S'),
                'img': item.get('img').get('S'),
                'type': item.get('type').get('S'),
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
