'use client'

import { PickerOverlay } from "filestack-react"
import { useState } from "react"


export default function Home() {
  const [showPicker, setShowPicker] = useState(false)

  return (
    <main className='h-full flex flex-col pt-[8rem] items-center'>
      <h1 className='text-4xl font-bold mb-2'>
        Turn your photos into polaroids
      </h1>
      <p className='text-xl mb-8'>
        Simply upload your photo and get a cool porraid in return
      </p>

      {
        showPicker && (
          <PickerOverlay
            apiKey={process.env.FILESTACK_API_KEY}
            onClose={() => setShowPicker(false)}
            
        )
      }

      <button className="bg-blue-500 hover:bg-blue-700
      text-white font-bold py-2 px-4r rounded"
      onClick={() => setShowPicker(true)}
      >
        Upload file
      </button>

      <section className="flex gap-x-[2rem] mt-20">
        <div>
          <h2>Uploaded image</h2>
        </div>

        <div>
          <h2>Transformed Image</h2>
        </div>
      </section>

    </main>
  )
}
