
import time
from http import HTTPStatus
import json
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import *

from common.util import (
    event_body, dynamo_table, dynamo_paginator, table_name
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

    posts = []
    post_attr = Attr('type').eq('post')

    # OPTIONAL
    user_id = body.get('user_id')
    if user_id:
        post_attr &= Attr('user_id').eq(user_id)

    # OPTIONAL
    post_id = body.get('post_id')
    if post_id:
        post_attr &= Attr('post_id').eq(post_id)

    # OPTIONAL
    tags = body.get('tags', [])
    if tags:
        for tag in tags:
            post_attr &= Attr('tags').contains(tag)


    try:
        res = dynamo_table.scan(
            **{
                'FilterExpression': post_attr,
            }
        )

        for post in res.get('Items', []):
            if isinstance(post.get('is_hidden'), bool) and post.get('is_hidden'):
                continue
            post['created_at'] = int(post.get('created_at', 0))
            post['tags'] = post.get('tags', '').split(',')
            posts.append(post)

    except ClientError as err:
        print('Client Error:', err)
        status_code = HTTPStatus.INTERNAL_SERVER_ERROR
        message = 'Failed. InternalServerError.'

    posts = sorted(posts, key=lambda d: d['created_at'], reverse=True)
    print(posts)

    return {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': True,
        },

        'message': message,
        'statusCode': status_code,

        'user_id': user_id,

        'posts': posts,
        'total': len(posts),

    }
