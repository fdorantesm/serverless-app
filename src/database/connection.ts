import { connectionString } from "@/utils/mongodb.util";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";

export class MongoDBConnection {
  private connectionString: string;
  private client: MongoClient | null = null;
  private connection: mongoose.Connection | null = null;
  private connected: boolean = false;
  private database: string;
  private options: mongoose.ConnectOptions;

  constructor(options: MongoDBConnectionOptions) {
    this.connectionString = connectionString({
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
    });

    this.database = options.database;
    this.options = options.options ?? {};

    mongoose.set("debug", true);
  }

  public async connect() {
    if (this.connection && this.connection.readyState === 1) {
      return;
    }

    try {
      await mongoose.connect(this.connectionString, {
        dbName: this.database,
        ...this.options,
      });
      this.connection = mongoose.connection;
    } catch (error) {
      throw error;
    }
  }

  public async disconnect() {
    if (!this.connection || this.connection.readyState === 0) {
      return;
    }

    try {
      await mongoose.disconnect();
    } catch (error) {
      throw error;
    }
  }

  public getClient(): MongoClient {
    return this.client!;
  }
}

interface MongoDBConnectionOptions {
  host: string;
  username: string;
  password: string;
  database: string;
  port?: number;
  options?: mongoose.ConnectOptions;
}

export type DatabaseClient = MongoClient;
