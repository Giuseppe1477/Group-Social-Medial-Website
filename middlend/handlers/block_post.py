
from uuid import uuid4
from http import HTTPStatus
from botocore.exceptions import ClientError
from common.util import (
    event_body, dynamo_table, table_name, dynamo_paginator
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
    post_id = body.get('post_id')
    message_id = body.get('message_id', None)

    try:
        if not message_id:
            res = dynamo_paginator.paginate(
                **{
                    'TableName': table_name,
                    'FilterExpression': 'user_id = :user_id and '
                                        'post_id = :post_id and '
                                        '#type = :type',
                    'ExpressionAttributeNames': {
                        '#type': 'type',
                    },
                    'ExpressionAttributeValues': {
                        ':user_id': {'S': user_id},
                        ':post_id': {'S': post_id},
                        ':type': {'S': 'post'},
                    }
                }
            )
            for post in res:
                if post.get('message_id'):
                    message_id = post.get('message_id')
                    break

        if message_id:
            dynamo_table.update_item(
                **{
                    'Key': {
                        'message_id': message_id,
                        # 'user_id': user_id,
                        # 'post_id': post_id,
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
        print('ClientError:', err)
        status_code = HTTPStatus.INTERNAL_SERVER_ERROR
        message = 'Could not lookup message ID.'

    return {
        'statusCode': status_code,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': True,
        },
        'body': {
            'message': message,
            'statusCode': status_code
        },
    }
