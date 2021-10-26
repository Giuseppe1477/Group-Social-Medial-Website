
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
      body,
    })
        .then(r => r.json())
        .then(r => r);
  }


  static auth = async (body)  => {
    return this.req({
      path: 'auth',
      body: JSON.stringify(body),
      method: 'POST'
    });
  }

  static create_post = async (body)  => {
    return this.req({
      path: 'create_post',
      body: JSON.stringify(body),
      method: 'POST'
    });
  }

  static list_users = async (body)  => {
    return this.req({
      path: 'list_users',
      body: JSON.stringify(body),
      method: 'POST'
    });
  }

  static list_posts = async (body)  => {
    return this.req({
      path: 'list_posts',
      body: JSON.stringify(body),
      method: 'POST'
    });
  }

  static list_comments = async (body)  => {
    return this.req({
      path: 'list_comments',
      body: JSON.stringify(body),
      method: 'POST'
    });
  }

}

export default Services;