import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb'

// NextApiRequest นำเข้า
// NextApiRespone ส่งออก


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
    

    const { email, name, password } = req.body;
    console.log({email})
    const existingUser = await prismadb.user.findUnique({
      where: {
        email
      }
    })
    console.log({existingUser})

    if (existingUser) {
      return res.status(422).json({ error: 'Email taken' });
    }
    

      // รับ Email จากผู้ใช้ ค้นหาใน db email ถ้า email true db.user ให้แจ้งว่า email taken ซ้ำใช้แล้ว 

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image:'',
        emailVerified: new Date()}
    })
      // hash แปลง password,new 12 หลัก เข้าไป db  สร้าง data ส่งกลับ user
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}

