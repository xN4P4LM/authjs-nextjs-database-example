import { Options, MariaDbDriver } from "@mikro-orm/mariadb";
import { ReflectMetadataProvider } from "@mikro-orm/mariadb";
import { defaultEntities } from "@auth/mikro-orm-adapter";


const config: Options = {
  driver: MariaDbDriver,
  host: process.env.AUTH_DATABASE_HOST,
  port: parseInt(process.env.AUTH_DATABASE_PORT || "3306"),
  user: process.env.AUTH_DATABASE_USER,
  password: process.env.AUTH_DATABASE_PASSWORD,
  dbName: process.env.AUTH_DATABASE_NAME,
  metadataProvider: ReflectMetadataProvider,
  debug: true,
  entitiesTs: [
    "./entities/*.entity.ts",
    defaultEntities.Session,
    defaultEntities.User,
    defaultEntities.VerificationToken,
  ],
  entities: ["./entities/*.entity.js"],
};

export default config;
