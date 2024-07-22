export class Response {
  public static success(statusCode: number = 200, data: any): any {
    return {
      statusCode: statusCode,
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  public static error(statusCode: number = 500, message: string): any {
    return {
      statusCode: statusCode,
      body: JSON.stringify({ message }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  public static unauthorized(message: string = "Unauthorized"): any {
    return this.error(401, message);
  }

  public static notFound(message: string = "Not Found"): any {
    return this.error(404, message);
  }

  public static badRequest(message: string = "Bad Request"): any {
    return this.error(400, message);
  }

  public static noContent(): any {
    return this.success(204, null);
  }
}
