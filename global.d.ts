import { PrismaClient } from '@prisma/client'
// import type { MongoClient } from 'mongodb';

declare global{
    namespace globalThis{
        var prismadb : PrismaClient
    }
}



// ใช้คำสั่ง declare global เพื่อประกาศให้ตัวแปรหรือชื่อในส่วน global สามารถเข้าถึงได้ในทุกส่วนของโค้ด TypeScript:

// ต่อมา เราสามารถใช้ตัวแปร prismadb ใน globalThis เพื่อเก็บ PrismaClient ได้
