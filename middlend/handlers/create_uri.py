
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
    img_url = body.get('img_url')
    bio = body.get('bio')
    playlist_uri = body.get('playlist_uri')
    artist_uri = body.get('artist_uri')
    track_uri = body.get('track_uri')
    passwd = body.get('pass')
    is_admin = body.get('is_admin')

    item = {
        'user_id': user_id,
        'playlistURI': playlist_uri,
        'artistURI': artist_uri,
        'trackURI': track_uri,
        'pass': passwd,
        'is_admin': is_admin,
        'img_url': img_url,
        'bio': bio
    }
    try:
        dynamo_table.update_item(
            **{
                'Key': {
                    'user_id': user_id,
                },
                'UpdateExpression': 'SET #trackURI = :track_uri, #artistURI = :artist_uri, #playlistURI = :playlist_uri ',
                'ExpressionAttributeNames': {
                    '#playlistURI': 'playlistURI',
                    '#trackURI': 'trackURI',
                    '#artistURI': 'artistURI',
                },
                'ExpressionAttributeValues': {
                    ':track_uri': track_uri,
                    ':artist_uri': artist_uri,
                    ':playlist_uri': playlist_uri,
                },
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
        'message': message,
        'statusCode': status_code,
        **item,

    }
