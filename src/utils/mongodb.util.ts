export function connectionString(params: MongoDBConnectionOptions): string {
  const { host, username, password, port, options } = params;

  let connectionString: string;

  const optionsQueryString = options
    ? `&${new URLSearchParams(options).toString()}`
    : "";

  if (port === undefined) {
    // SRV connection string
    connectionString = `mongodb+srv://${username}:${password}@${host}/?${optionsQueryString}`;
  } else {
    // Standard connection string
    connectionString = `mongodb://${username}:${password}@${host}:${port}/?${optionsQueryString}`;
  }

  return connectionString;
}

export interface MongoDBConnectionOptions {
  host: string;
  username: string;
  password: string;
  port?: number;
  options?: Record<string, string>;
}
