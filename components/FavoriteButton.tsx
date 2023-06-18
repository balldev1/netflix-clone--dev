import React, {useCallback, useMemo} from 'react'
import axios from 'axios'
import { AiOutlinePlus,AiOutlineCheck } from 'react-icons/ai' 

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites'


// useMemoเก็บค่าผลลัพธ์การเปลี่ยนแปลง

interface FavoriteButtonProps{
    movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();

  const { data: currentUser, mutate } = useCurrentUser();

  // ดึงข้อมูล mutate จาก useFavorites
  // ดึงข้อมูล currentUser,mutate } = useCurrentUser

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    // {รับmovieid จากmovie card props ให้ cur.fav เป็น ของข้อมูลของ lish}

    return list.includes(movieId)
  },[currentUser, movieId ])

  // { cU ผู้ใช้ปัจบัน , movieid รายการที่จะเลือก ถ้า isFavorite เป็น true
  //  แสดงว่า movieId เป็นรายการโปรดของผู้ใช้งาน
  //   และถ้า isFavorite เป็น false 
  //   แสดงว่า movieId ไม่เป็นรายการโปรดของผู้ใช้งาน }
  // ฟังก์ชัน mutate ใช้ในการอัปเดตข้อมูลของ cache ใน SWR
  //  โดยอัปเดตข้อมูลใหม่หรือเพิ่มเติมข้อมูลที่มีอยู่ใน cache โดยไม่ต้องเรียก API ใหม่

  const toggleFavorites = useCallback(async () =>{
    let response;

    if (isFavorite) {
      response = await axios.delete('/api/favorite' , { data: { movieId } })
    } else {
      response = await axios.post('/api/favorite', { movieId })
    }

    

    const updatedFavoriteIds = response?.data?.favoriteIds;

    // {ถ้า isFavorite trueจะส่งคำขอไปลบ movieid }
    // {ถ้า flse จะเพิ่มรายการโปรด}

    // {เช็คว่า response.data ได้จาก api ด้านบนไม่เป็นnullหรือไม่มีข้อมูลก่อนจะเข้าถึง favoriteIds }


    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds
    });

    

    // {อัพเดทขอมูลcurrentUserโดยใช้ฟันชั่นmutate }
    // {updatedFavoriteIds เปลี่ยนค่า favoriteIds ใน  currentUser}
    
    mutateFavorites();
  },[movieId, isFavorite, currentUser, mutate, mutateFavorites])

  

  const Icon = isFavorite? AiOutlineCheck : AiOutlinePlus

  return (
    <div 
    onClick ={toggleFavorites}
    className='
    cursor-pointer
    group/item
    w-6
    h-6
    lg:w-10
    lg:h-10
    border-white
    border-2
    rounded-full
    flex
    justify-center
    items-center
    transition
    hover:border-netural-300
    '>
      <Icon  className='text-white group-hover/item:text-neutral-300 w-4 lg:w-6' size={25}/>
    </div>
  )
}

export default FavoriteButton
