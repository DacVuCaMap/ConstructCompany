import React from 'react'
import { MoonLoader } from 'react-spinners'

export default function LoadingScene() {
  return (
    <div className="flex justify-center items-center">
        <MoonLoader color="rgba(0, 0, 0, 1)" />
      </div>
  )
}
