
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
    status_code = 200
    message = 'success'

    body = event_body(event)

    user = body.get('user')
    passwd = body.get('pass')

    if not user:
        status_code = 400
        message = 'Bad Request. No User Specified'
    elif not passwd:
        status_code = 400
        message = 'Bad Request. No Password Specified'
    else:
        try:
            res = dynamo_table.get_item(
                Key={
                    'user': user,
                }
            )
        except ClientError as err:
            print('Client Error:', err)
            status_code = 500
            message = err.response.get('Error', {}).get('Message', '')
            res = {}
        else:
            res = res.get('Item', {})

        passwd_item = res.get('pass', '')
        if passwd != passwd_item:
            status_code = 403
            message = 'Incorrect Credentials for User. Could not login.'

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
            'admin': False,
            'logged_in': status_code == 200,
        },
    }
