# middlend api




### /auth

Request 

    curl -X ANY
    {
        "user_id": <STRING>,
        "pass": <STRING>
    }

Response

    {
        "user_id":      <STRING>,
        "admin":        <BOOL>,
        "logged_in":    <BOOL>,
        "message":      <STRING>,
        "statusCode":   <INT>,
    }

### /create_user

> can only be called by an Administrator.

Request 
    
    {
        "user_id":  <STIRNG>,
        "admin":    <BOOL>,
        "img":      <STRING: base64>
    }

Response

    {
        "user_id":      <STRING>,
        "admin":        <BOOL>,
        "message":      <STRING>,
        "statusCode":   <INT>
    }

### /create_post

Request

    curl -X ANY
    {
        "type":         "post",
        "user_id":      <STRING>,
        "caption":      <STRING>,
        "img":          <STRING>,
        "message":      <STRING>,
        "statusCode":   <INT>
    }

Response

    {
        "post_id":      <STRING>,
        "message":      <STRING>,
        "statusCode":   <INT>
    }

### /create_comment

Request 

    {
        "user_id":  <STRING>,
        "post_id":  <STRING>,
        "text:      <STRING>,
    }

Response

    {
        "comment_id":      <STRING>,
        "message":      <STRING>,
        "statusCode":   <INT>
    }

