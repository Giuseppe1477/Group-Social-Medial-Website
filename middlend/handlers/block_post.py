
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
    message_ids = [body.get('message_id', None)]
    message_ids = message_ids if any(message_ids) else []
    posts = []

    lambda_client = boto3.client('lambda')

    try:

        res = lambda_client.invoke(
            **{
                'FunctionName': 'middlend-dev-list_posts',
                'InvocationType': 'RequestResponse',
                'LogType': 'None',
                'Payload': json.dumps({
                    'user_id': user_id,
                    'post_id': post_id,
                }),
            }
        )

        data = res['Payload'].read().decode()
        data = json.loads(data)
        print(data)

        body = data.get('body')
        body = json.loads(body)
        print(body)

        posts = body.get('posts', [])
        posts_t = body.get('total', 0)

        if not data.get('statusCode') < 400 or not posts_t:
            status_code = HTTPStatus.INTERNAL_SERVER_ERROR
            message = 'Could not lookup message ID.'
        else:
            print(posts)
            print('posts_t:', posts_t)

            # for post in posts:
            message_ids = [
                post.get('message_id') for post in posts
            ]
    except Exception as err:
        print('Invoke Error:', err)
        status_code = HTTPStatus.INTERNAL_SERVER_ERROR
        message = 'Failed. InternalServerError. Could not List Posts'

    for message_id_p in message_ids:
        try:
            dynamo_table.update_item(
                **{
                    'Key': {
                        'message_id': message_id_p,
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
            print('updated:')
            print(post)
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

        'user_id': user_id,
        'post_id': post_id,
        'message_ids': message_ids,

        'posts': posts,
    }
