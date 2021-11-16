
class Services {

  static BASE_URL = 'https://wgnmuf440l.execute-api.us-east-2.amazonaws.com/dev';

  static req = async ({ path, body, method = 'POST' })  => {
    return fetch(`${this.BASE_URL}/${path}`, {
      method,
      mode: 'cors',
      cache: 'force-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(body),
    })
        .then(r => r.json())
        .then(r => r);
  }


  static auth = async (body)  => {
    return this.req({
      path: 'auth',
      body,
      method: 'POST'
    });
  }

  static create_user = async (body) => {
    return this.req({
      path: 'create_user',
      body,
      method: 'POST',
    })
  }

  static create_post = async (body)  => {
    return this.req({
      path: 'create_post',
      body,
      method: 'POST'
    });
  }

  static create_comment = async (body)  => {
    return this.req({
      path: 'create_comment',
      body,
      method: 'POST'
    });
  }

  static send_dm = async (body)  => {
    return this.req({
      path: 'send_dm',
      body,
      method: 'POST'
    });
  }

  static list_users = async (body)  => {
    return this.req({
      path: 'list_users',
      body,
      method: 'POST'
    });
  }

  static list_posts = async (body)  => {
    return this.req({
      path: 'list_posts',
      body,
      method: 'POST'
    });
  }

  static list_comments = async (body)  => {
    return this.req({
      path: 'list_comments',
      body,
      method: 'POST'
    });
  }

  static list_dms = async (body)  => {
    return this.req({
      path: 'list_dms',
      body,
      method: 'POST'
    });
  }

  static block_post = async (body)  => {
    return this.req({
      path: 'block_post',
      body,
      method: 'POST'
    });
  }

  static create_uri = async (body)  => {
    return this.req({
      path: 'create_uri',
      body: body,
      method: 'POST'
    });
  }

}

export default Services;
