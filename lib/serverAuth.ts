import { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';
import prismadb from '@/lib/prismadb';
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// NextApiRequest ใช้ getSession ดึงข้อมูลเซสชันของผู้ใช้งาน 
// โดยตัวแปร session จะมีค่าเป็น null หากไม่มีเซสชัน 
// และมีข้อมูลของเซสชันหากมีเซสชันของผู้ใช้งานอยู่ 

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    throw new Error('Not signed in');
  }

    // จาก req เรียกข้อมูล req session ถ้า session ไม่มี user , email ให้error
    // {แก้ไข error 
// getServerSession เป็นฟังก์ชันที่ใช้ใน Next.js ร่วมกับ NextAuth.js
//  เพื่อเรียกดูและตรวจสอบเซสชันของผู้ใช้ในส่วนของเซิร์ฟเวอร์ (server-side)
//  ฟังก์ชันนี้ใช้สำหรับการรับข้อมูลเซสชันผ่าน Next.js API routes หรือฟังก์ชันที่เกี่ยวข้อง

// authOptions เป็นตัวแปรที่ระบุตัวเลือกการกำหนดค่าของ NextAuth.js
//  ซึ่งใช้ในการกำหนดข้อมูลผู้ใช้งานและตัวเลือกอื่น ๆ สำหรับการรับรองตัวตน 
//  แต่ละ provider ที่ใช้ และการกำหนดค่าเพิ่มเติม เช่น secret key
//  , การกำหนดเวลาเซสชัน และอื่น ๆ}

    const currentUser = await prismadb.user.findUnique({
        where: {
          email: session.user.email,
        }
      });

    // existingUser ใช้ในการค้นหาผู้ใช้ด้วย email ที่ระบุเป็นค่าตัวแปร email ที่ส่งมา.
    // currentUser ใช้ในการค้นหาผู้ใช้ด้วย email ที่เก็บอยู่ใน session.user.email.

    if (!currentUser) {
        throw new Error('Not signed in');
      }
    
      return { currentUser };
    }

// จาก db ถ้าไม่มี email ใน session ให้ส่งค่ากลับ currentUser

export default serverAuth;