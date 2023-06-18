import { PrismaClient } from '@prisma/client'

const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV === 'production') global.prismadb = client

export default client

// นำเข้า PrismaClient จากโมดูล '@prisma/client' โดยใช้วิธีการ import:

// สร้างตัวแปร client เพื่อเก็บ PrismaClient ซึ่งจะเป็นการเชื่อมต่อกับฐานข้อมูล โดยใช้คำสั่ง new PrismaClient():

// client เป็น global.prismadb หากมีค่าอยู่แล้ว (มีการเชื่อมต่อฐานข้อมูลอยู่ก่อนหน้า) ถ้าไม่มีค่าอยู่แล้ว 
// จะสร้าง PrismaClient ใหม่และกำหนดให้ client เป็นตัวนั้น

// เพื่อให้ client นี้ถูกใช้งานเป็น global ในกรณีที่ NODE_ENV เป็น 'production' จะกำหนด global.prismadb 
// เป็น client เพื่อให้สามารถใช้งานร่วมกับฐานข้อมูลได้ในระหว่างทุกๆรอบการรันของแอปพลิเคชัน:

// สุดท้าย ใช้ export default เพื่อส่งออก client เพื่อให้สามารถนำไปใช้ในโมดูลอื่นได้:

