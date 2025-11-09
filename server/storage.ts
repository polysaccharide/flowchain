import { type User, type InsertUser, type BusinessUnit, type InsertBusinessUnit } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllBusinessUnits(): Promise<BusinessUnit[]>;
  getBusinessUnit(id: string): Promise<BusinessUnit | undefined>;
  createBusinessUnit(businessUnit: InsertBusinessUnit): Promise<BusinessUnit>;
  updateBusinessUnit(id: string, businessUnit: Partial<InsertBusinessUnit>): Promise<BusinessUnit | undefined>;
  deleteBusinessUnit(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private businessUnits: Map<string, BusinessUnit>;

  constructor() {
    this.users = new Map();
    this.businessUnits = new Map();
    
    // TODO: remove mock data - Add sample business units
    const sampleUnits: BusinessUnit[] = [
      {
        id: randomUUID(),
        businessUnitCode: "ANC",
        dc: "ALL NOW COMPLEX",
        customerSapCode: "SAP001",
        vehicleGroup: "Lotus",
        productType: "Type A",
        remark: "Sample remark",
        orderTemplate: "Template 1",
        newJob: true,
        hubAvailable: false,
        firstShipment: true,
        subContractors: ["Sub 1", "Sub 2"],
      },
      {
        id: randomUUID(),
        businessUnitCode: "ANC",
        dc: "ALL Complex",
        customerSapCode: "SAP002",
        vehicleGroup: "Honda",
        productType: "Type B",
        remark: "",
        orderTemplate: "Template 2",
        newJob: false,
        hubAvailable: true,
        firstShipment: false,
        subContractors: [],
      },
    ];
    
    sampleUnits.forEach(unit => {
      this.businessUnits.set(unit.id, unit);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllBusinessUnits(): Promise<BusinessUnit[]> {
    return Array.from(this.businessUnits.values());
  }

  async getBusinessUnit(id: string): Promise<BusinessUnit | undefined> {
    return this.businessUnits.get(id);
  }

  async createBusinessUnit(insertBusinessUnit: InsertBusinessUnit): Promise<BusinessUnit> {
    const id = randomUUID();
    const businessUnit: BusinessUnit = { 
      id,
      businessUnitCode: insertBusinessUnit.businessUnitCode,
      dc: insertBusinessUnit.dc,
      customerSapCode: insertBusinessUnit.customerSapCode ?? null,
      vehicleGroup: insertBusinessUnit.vehicleGroup ?? null,
      productType: insertBusinessUnit.productType ?? null,
      remark: insertBusinessUnit.remark ?? null,
      orderTemplate: insertBusinessUnit.orderTemplate ?? null,
      newJob: insertBusinessUnit.newJob ?? null,
      hubAvailable: insertBusinessUnit.hubAvailable ?? null,
      firstShipment: insertBusinessUnit.firstShipment ?? null,
      subContractors: insertBusinessUnit.subContractors ?? null,
    };
    this.businessUnits.set(id, businessUnit);
    return businessUnit;
  }

  async updateBusinessUnit(id: string, updates: Partial<InsertBusinessUnit>): Promise<BusinessUnit | undefined> {
    const existing = this.businessUnits.get(id);
    if (!existing) return undefined;
    
    const updated: BusinessUnit = { ...existing, ...updates };
    this.businessUnits.set(id, updated);
    return updated;
  }

  async deleteBusinessUnit(id: string): Promise<boolean> {
    return this.businessUnits.delete(id);
  }
}

export const storage = new MemStorage();
