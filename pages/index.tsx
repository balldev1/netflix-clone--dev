import { getSession} from 'next-auth/react'
import { NextPageContext } from 'next'


// import useCurrentUser from '@/hooks/useCurrentUser'
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import InfoModal from '@/components/InfoModal';
import useInfoModal from '@/hooks/useInfoModal';

// getSession: เป็นฟังก์ชันที่ใช้ในการดึงข้อมูลเซสชันของผู้ใช้
// signOut เป็นฟังก์ชันที่ใช้ในการออกจากระบบ โดยจะทำการล้างเซสชัน

export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);

  if (!session){
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  // ถ้าไม่มีsession ให้กลับไปหน้าauth

  return {
    props : {}
  }
}

export default function Home() {

  const { data: movies= [] } =useMovieList();
  const { data: favorites = [] } =useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={()=>{closeModal}}  />
      {/* InfoModal โดยมีการส่ง prop visible และ onClose เข้าไปใน InfoModal 
      โดย visible จะเป็นค่า boolean ที่บอกว่าโมดอลควรแสดงหรือไม่ และ onClose
       เป็นฟังก์ชันที่จะเรียกเมื่อต้องการปิดโมดอล โดย isOpen ในที่นี้เป็นตัวแปรสถานะที่บอกว่าโมดอลควรแสดงหรือไม่ 
       และ closeModal เป็นฟังก์ชันที่จะถูกเรียกเมื่อต้องการปิดโมดอล */}

      <Navbar/>
      <Billboard/>
      
      <div className='pb-40'>
        <MovieList title='Treanding Now' data={movies}/>
        <MovieList title='My List' data={favorites}  />
      </div>
    </>
  )
}


// Pinned by Code With Antonio
// Code With Antonio
// 2 months ago (edited)
// If you are having problems with "Favorite"  functionality throwing "Not Signed In" error, It is because you have a newer version of Next & NextAuth, a small modification is needed (you can find it in the github repostory). Here are the steps:

// 1. Your [...nextauth].ts file should export authOptions separately
// 2. Your serverAuth.ts file should use getServerSession(req, res, authOptions) instead of getSession({req})
// 3. Modify serverAuth(req) to serverAuth(req, res) everytwhere in your code.
// 4. Logout, shutdown the app, login again, everything should work ❤