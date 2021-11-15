
from http import HTTPStatus
from json import dumps
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import *
from common.util import (
    event_body, dynamo_paginator, dynamo_table, table_name
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

    post_id = body.get('post_id')

    comments = []
    comment_attr = (
        Attr('type').eq('comment')
        &
        Attr('post_id').eq(post_id)
    )

    try:
        res = dynamo_table.scan(
            **{
                'FilterExpression': comment_attr,
            }
        )

        for comment in res.get('Items', []):
            comment['created_at'] = int(comment.get('created_at', 0))
            comments.append(comment)
    except ClientError as err:
        print('Client Error:', err)
        status_code = HTTPStatus.INTERNAL_SERVER_ERROR
        message = 'Failed. InternalServerError.'

    comments = sorted(comments, key=lambda d: d['created_at'])
    print(comments)

    return {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': True,
        },

        'message': message,
        'statusCode': status_code,

        'post_id': post_id,

        'comments': comments,
        'total': len(comments),

    }
