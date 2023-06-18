import { NextApiRequest , NextApiResponse } from 'next'
import { without } from 'lodash'

import prismadb from  '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

export default async function handler(req: NextApiRequest, res: NextApiRequest) {
    try {
        if (req.method === 'POST'){
            const { currentUser } = await serverAuth(req, res);

            const { movieId } = req.body

            const existingMovie = await prismadb.movie.findUnique({
                where : {
                    id: movieId,
                }
            })

            if (!existingMovie) {
                throw new Error('Invalid ID')
            }

            // { currentUser = serverAuth , movieid = body }
            // เข้าไปที่ prismadb.movie หา id เอา movieId จาก body
            // ถ้า เลขไม่ตรงกัน ให้ error
 
            const user = await prismadb.user.update({
                where :{
                    email: currentUser.email || '',
                },
                data : {
                    favoriteIds : {
                        push : movieId,
                    }
                }
            })

            // เข้าไป user เงื่อนไขการอัปเดตผู้ใช้ที่ตรงกับอีเมลของผู้ใช้ปัจจุบันเซลชั่น (currentUser.email)
            // data update ฟิล favoriteId และเพิ่มรายการใหม่ด้วย push คือเพิ่ม movieId ที่รับจาก body
            return res.status(200).json(user)
        }
        if (req.method === 'DELETE') {
            const { currentUser } = await serverAuth(req, res)

            const { movieId } = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where : {
                    id : movieId,
                }
            })
            
            if(!existingMovie) {
                throw new Error('Invalid ID')
            }

            const updateFavoriteIds = without(currentUser.favoriteIds, movieId);
            // {ตัด movieIdออก เหลือ currentUser.favoriteIds ที่มี id จาก movie}
            const updatedUser = await prismadb.user.update({
                where: { 
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds : updateFavoriteIds,
                }
            });

            // {email user prismadb ต้องตรงกับ เซลชั่นผู้ใช้ปัจจุบัน ต้องมี email ตรงกัน}
            // {update data สร้าง favoriteIds ใช้ข้อมูล updateFavoriteIds คือ id ที่ได้มาจาก movieid จบ! }

            return res.status(200).json(updatedUser);
        }
    
        return res.status(405).end();
    } catch (error) {
        console.log(error)
        return res.status(500).end()
    }
}