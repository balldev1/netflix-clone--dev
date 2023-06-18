import { NextApiRequest , NextApiResponse } from 'next'

import prismadb from  '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET'){
        return res.status(405).end()
    }

    try {
        const { currentUser } = await serverAuth(req,res);

        const favoriteMovies = await prismadb.movie.findMany({
            where: {
                id : {
                    in : currentUser?.favoriteIds
                }
            }
        })
        // {id prismadb ตรงกับ favoriteId ที่อยู่ใน currentUser หรือไม่ถ้าตรง ก็ผ่าน  }

        return res.status(200).json(favoriteMovies)

    } catch (error) {
        console.log(error);
        return res.status(500).end()
    }
}