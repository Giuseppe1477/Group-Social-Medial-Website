
from http import HTTPStatus
from botocore.exceptions import ClientError
from lambda_decorators import (
    cors_headers, json_http_resp, load_json_body
)

from common.util import (
    event_body, dynamo_table
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
    playlistURI = body.get('playlistURI', '')
    artistURI = body.get('artistURI', '')
    trackURI = body.get('trackURI', '')
    passwd = body.get('pass')
    is_admin = False

    if not user_id or not passwd:
        status_code = HTTPStatus.BAD_REQUEST
        message = 'Bad Request. No User or Pass Specified'
    else:
        try:
            res = dynamo_table.get_item(
                Key={
                    'user_id': user_id,
                }
            )
        except ClientError as err:
            print('Client Error:', err)
            status_code = HTTPStatus.INTERNAL_SERVER_ERROR
            message = err.response.get('Error', {}).get('Message', '')
            res = {}
        else:
            res = res.get('Item', {})

        passwd_item = res.get('pass', '')
        is_admin = res.get('is_admin', False)
        playlistURI = res.get('playlistURI','')
        artistURI = res.get('artistURI','')
        trackURI = res.get('trackURI','')
        if passwd != passwd_item:
            status_code = HTTPStatus.UNAUTHORIZED
            message = 'Incorrect Credentials for User. Could not login.'

    return {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': True,
        },

        'message': message,
        'statusCode': status_code,
        'user_id': user_id,
        'is_admin': is_admin,
        'playlistURI': playlistURI,
        'artistURI': artistURI,
        'trackURI': trackURI,
        'logged_in': status_code == HTTPStatus.OK,

    }
