
import time
from uuid import uuid4
from http import HTTPStatus
from botocore.exceptions import ClientError

from lambda_decorators import (
    cors_headers, json_http_resp, load_json_body
)

from common.util import (
    event_body, dynamo_table
)

@cors_headers
@load_json_body
@json_http_resp
def main(event, _):
    status_code = HTTPStatus.CREATED
    message = 'success'

    body = event_body(event)

    user_id = body.get('user_id')
    img = body.get('img')
    bio = body.get('bio')
    playlistURI = body.get('playlistURI')
    artistURI = body.get('artistURI')
    trackURI = body.get('trackURI')
    passwd = body.get('pass')
    is_admin = body.get('is_admin')

    item = {
        'user_id': user_id,
        'playlistURI': playlistURI,
        'artistURI': artistURI,
        'trackURI': trackURI,
        'pass': passwd,
        'is_admin': is_admin,
        'img': img,
        'bio': bio
    }

    try:
        dynamo_table.update_item(
            **{
                'Item': item
            }
        )
    except ClientError as err:
        print('Client Error:', err)
        status_code = HTTPStatus.INTERNAL_SERVER_ERROR
        message = 'Create-Post failed.'

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
            **item,
        },
    }
