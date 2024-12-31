import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { defaultEntities } from "@auth/mikro-orm-adapter";
import { AdapterAccount } from "@auth/core/adapters";

@Entity()
export class Account implements defaultEntities.Account {
  @PrimaryKey()
  @Property({ type: "string" })
  id: string = crypto.randomUUID();

  @ManyToOne({
    entity: "User",
    hidden: true,
    deleteRule: "cascade",
  })
  user!: defaultEntities.User;

  @Property({ type: "string", persist: false })
  userId!: string;

  @Property({ type: "string" })
  type!: AdapterAccount["type"];

  @Property({ type: "string" })
  provider!: string;

  @Property({ type: "string" })
  providerAccountId!: string;

  @Property({ type: "string", nullable: true })
  refresh_token?: string;

  @Property({ type: "text", nullable: true })
  access_token?: string;

  @Property({ type: "int", nullable: true })
  expires_at?: number;

  @Property({ type: "string", nullable: true })
  token_type?: Lowercase<string>;

  @Property({ type: "string", nullable: true })
  scope?: string;

  @Property({ type: "text", nullable: true })
  id_token?: string;

  @Property({ type: "string", nullable: true })
  session_state?: string;
}
