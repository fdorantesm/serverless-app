import { config } from "@/config";
import { Container } from "@/core/injection";
import { MongoDBConnection } from "@/database/connection";

const container = new Container({ defaultScope: "Singleton" });

container
  .bind("DatabaseConnection")
  .toConstantValue(new MongoDBConnection(config.database));

export { container };
