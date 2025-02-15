import { GalleryVerticalEnd } from 'lucide-react'
import React from 'react'

const Logo = () => {
    return (

        <div className="flex items-center justify-center
  sm:justify-start">

            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
            </div>

        </div>
    )
}

export default Logo