import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const businessUnits = pgTable("business_units", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  businessUnitCode: text("business_unit_code").notNull(),
  dc: text("dc").notNull(),
  customerSapCode: text("customer_sap_code"),
  vehicleGroup: text("vehicle_group"),
  productType: text("product_type"),
  remark: text("remark"),
  orderTemplate: text("order_template"),
  newJob: boolean("new_job").default(false),
  hubAvailable: boolean("hub_available").default(false),
  firstShipment: boolean("first_shipment").default(false),
  subContractors: text("sub_contractors").array(),
});

export const insertBusinessUnitSchema = createInsertSchema(businessUnits).omit({
  id: true,
});

export type InsertBusinessUnit = z.infer<typeof insertBusinessUnitSchema>;
export type BusinessUnit = typeof businessUnits.$inferSelect;
