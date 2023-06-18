import useSWR from 'swr';
import fetcher from '@/lib/fetcher'
// {swr ใช้เรียก api โดยใช้ ft fetcher}
const useBillboard = () =>{
    const { data, error, isLoading} = useSWR('/api/random', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    // {revalidateIfStale: false: กำหนดให้ไม่มีการ revalidate (อัปเดตข้อมูล) เมื่อข้อมูลในแคชไม่เป็นเวอร์ชันล่าสุด (stale)
    //     revalidateOnFocus: false: กำหนดให้ไม่มีการ revalidate เมื่อหน้าต่างของเว็บไซต์ถูกเปิดหรือโฟกัส
    //     revalidateOnReconnect: false: กำหนดให้ไม่มีการ revalidate เมื่อเครื่องแม่ข่ายเชื่อมต่อใหม่หลังจากตกเชื่อม}

    return {
        data,
        error,
        isLoading
    }
}

export default useBillboard