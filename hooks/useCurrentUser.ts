import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

// useSWR เพื่อเรียกข้อมูลผู้ใช้ปัจจุบัน

const useCurrentUser = () =>{
    const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher)

    return{
        data,
        error,
        isLoading,
        mutate
    }
}

export default useCurrentUser;

// data: ข้อมูลผู้ใช้ปัจจุบันที่ถูกดึงมาจาก /api/current
// error: ข้อผิดพลาดที่เกิดขึ้นในการดึงข้อมูล
// isLoading: สถานะการโหลดข้อมูล ถ้าเป็น true หมายความว่าข้อมูลกำลังโหลด
// mutate: ฟังก์ชันที่ใช้สำหรับการแก้ไขข้อมูลที่ถูกแคช