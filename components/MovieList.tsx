import React from 'react'

import { isEmpty  } from 'lodash';
import MovieCard from './MovieCard';

interface MovieListProps{
    data: Record<string, any>[];
    title: string;
}

// interface กำหนดโครงสร้างข้อมูล data type อะไรก็ได้ / title string 
 

const MovieList: React.FC<MovieListProps> = ({ data,title}) => {

    if (isEmpty(data)) {
        return null
    }
    console.log(MovieList)

  return (
    <div className='px-4 md:px-12 mt-4 space-y-8'>
      <div>
        <p className='text-white text-md md:text-xl lg:text-2xl font-semibold mb-4'>
            {title}
        </p>
        <div className='text-white grid grid-cols-4 gap-2'>
            {data.map((movie)=>(
                <MovieCard key={movie.id} data={movie}/>
            ))}
        </div>
      </div>
    </div>
  )
}

export default MovieList

// npm install lodash การจัดการอาร์เรย์ (arrays), อ็อบเจ็กต์ (objects),
//  สตริง (strings), การจัดการกับเวลา
//  (date and time), การทำงานกับฟังก์ชัน (functions),
//   และอื่น ๆ ซึ่งช่วยให้การเขียนและอ่านโค้ดเป็นไปได้อย่างสะดวกและเข้าใจง่ายขึ้น