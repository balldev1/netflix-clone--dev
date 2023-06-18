// {npm install zustand จัดการสถานะเปิดปิด state }
import {create} from 'zustand';


export interface ModalStoreInterface {
  movieId?: string;
  isOpen: boolean;
  openMoDal: (movieId: string) => void;
  closeModal: () => void;
}

// movieId?: string: เก็บ ID ของหนัง แต่มีค่าเป็นตัวเลขชนิดสตริงหรือ undefined (ไม่บังคับให้ระบุ)
// isOpen: boolean: สถานะของ Modal ว่าเปิดอยู่หรือปิดอยู่ (บังคับให้ระบุเป็นบูลีน)
// openModal: (movieId: string) => void: เมธอดที่รับพารามิเตอร์เป็น movieId (ชนิดสตริง) เพื่อเปิด Modal
// closeModal: () => void: เมธอดที่ใช้ปิด Modal

const useInfoModal = create<ModalStoreInterface>((set)=>({
  movieId: undefined ,
  isOpen: false,
  openModal: (movieId: string) => set ({ isOpen: true, movieId}),
  onClose: () => set ({ isOpen: false, movieId: undefined})
}))

// {mvid = underfined , isopen false => เปิดรับmvid set open true , mvid => ปิด set false,undefined}

export default useInfoModal;