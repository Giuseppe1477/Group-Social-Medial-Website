
from uuid import uuid4
from http import HTTPStatus
from botocore.exceptions import ClientError

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
    user_id_recipient = body.get('user_id_recipient')
    conversation_id = create_conversation_id([user_id, user_id_recipient])
    # text = body.get('message')

    # dm_id = str(uuid4())

    # item = {
    #     'type': 'dm',
    #     'conversation_id': conversation_id,
    #     'user_id': user_id_sender,
    #     'message': text,
    # }

    dms = []

    try:
        res = dynamo_table.paginate(
            **{
                'TableName': table_name,
                'FilterExpression': 'user_id = :user_id and '
                                    'conversation_id = :conversation_id'
                                    '#type = :type',
                'ExpressionAttributeValues': {
                    ':user_id': {'S': user_id},
                    ':conversation_id': {'S': conversation_id},
                    ':type': {'S': 'post'},
                }
            }
        )

        for dm in res:
            print('dm:')
            print(dm)
            for item in dm.get('Items'):
                dms.append(item)
    except ClientError as err:
        print('Client Error: ', err)

        status_code = HTTPStatus.INTERNAL_SERVER_ERROR
        message = 'Create-User failed.'

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
        },
    }
