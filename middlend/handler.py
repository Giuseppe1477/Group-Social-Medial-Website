
import json


def auth(event, context):

    status_code = 200

    return {
        'statusCode': status_code,
        'body': json.dumps({

        })
    }