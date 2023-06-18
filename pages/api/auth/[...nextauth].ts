import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import prismadb from '@/lib/prismadb';

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'passord'
        }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

                // if email || password ไม่ครบ ส่ง error
        
                const user = await prismadb.user.findUnique({ where: {
                  email: credentials.email
                }});
        
                if (!user || !user.hashedPassword) {
                  throw new Error('Email does not exist');
                }
                
                // if user ไม่มีค่าส่งคืน

                const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

                if (!isCorrectPassword) {
                  throw new Error('Incorrect password');
                }
        
                return user;
                // เปรียบเทียบ password  กับฐานข้อมูล ถ้าตรงกัน เก็บ แล้ว return
            }
        })
    ],
    pages: {
      signIn: '/auth'
    },
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prismadb),
    session: { strategy: 'jwt' },
    jwt: {
      secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET
  };
  
  export default NextAuth(authOptions);



        
// signIn: '/auth' คือหน้าที่จะนำทางผู้ใช้ไปยังเมื่อต้องการเข้าสู่ระบบ ในที่นี้คือหน้า '/auth'
// debug: process.env.NODE_ENV === 'development' คือการเปิดโหมด debug ในระหว่างการพัฒนา
//  โดยการตรวจสอบว่าตัวแปรแวดล้อม NODE_ENV เท่ากับ 'development'
//  ถ้าใช่ก็จะเปิดโหมด debug
// adapter: PrismaAdapter(prismadb) คือการกำหนด adapter ที่ใช้ในการเชื่อมต่อกับฐานข้อมูล 
// Prisma โดยในที่นี้ใช้ PrismaAdapter และ prismadb เป็นตัวแปรที่เก็บ PrismaClient
// session: { strategy: 'jwt' } คือการกำหนดวิธีการเก็บ session ในรูปแบบ JWT
// jwt: { secret: process.env.NEXTAUTH_JWT_SECRET } คือการกำหนดคีย์ลับ (secret) สำหรับการเข้ารหัสและถอดรหัส JWT
// secret: process.env.NEXTAUTH_SECRET คือคีย์ลับ (secret) สำหรับการเซ็นต์และตรวจสอบลายเซ็นต์ของ token
// โดยสรุปการตั้งค่าดังกล่าวเป็นการกำหนดค่าที่จำเป็นสำหรับการใช้งาน NextAuth โดยใช้ PrismaAdapter 
// เพื่อเชื่อมต่อกับฐานข้อมูล Prisma และกำหนดค่าอื่น ๆ เช่นหน้าเข้าสู่ระบบ (signIn) และคีย์ลับต่าง ๆ 
// ที่ใช้ในการเข้ารหัสและถอดรหัส token และ session ที่ใช้ในรูปแบบ JWT