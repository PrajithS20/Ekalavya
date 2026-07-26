import { Injectable, OnModuleInit, OnApplicationShutdown } from '@nitrostack/core';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import * as dotenv from 'dotenv';

dotenv.config();

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnApplicationShutdown {
  constructor() {
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onApplicationShutdown() {
    await this.$disconnect();
  }
}
