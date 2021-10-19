
# models

### User

    {
        "type":     "user", 
        "user_id":  <STRING>,
        "img"       <STRING: base64>
    }


### Post

    {
        "type":     "post",
        "post_id":  <UUID>,
        "user_id":  <STRING>,
        "caption":  <STRING>,
        "img":      <STRING: base64>
    }

### Comment 

    {
        "type":         "comment",
        "comment_id":   <UUID>,
        "post_id":      <UUID>,
        "user_id":      <STRING>,
        "text":         <STRING>
    }

### DM

    {
        "type":                 "dm",
        "dm_id":                <UUID>,
        "conversation_id":      <UUID>,
        "user_id":              <STRING>,
        "message":              <STRING>
    }