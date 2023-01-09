import { useState } from "react"
import { InfoButton } from "./infoButton"
import { motion as m } from 'framer-motion'

export const BoardEntry = ({ generate }) => {
    const [value, setValue] = useState('')
    const handleKeyUp = (key) => {
        if (key === 'Enter') generate(value)
    }
    return (
        <m.div transition={{ delay: 0.3, duration: 0.3, ease: 'easeInOut' }} exit={{ opacity: 0 }} className="px-5 mt-14 justify-center">
            <div className="input-group justify-center">
                <InfoButton title={'How do I use this?'} text={'If you have a board with 14 slots, 5 32amp circuits 3 20amp circuits and 2 6amp circuits you should enter: "14w 5x32 3x20 2x6" wihtout the speechmarks (sections don\'t have to be in order). That will then be used to generate a board below with a sensible set of gaps which you can then use to label each circuit and slot for your reference.'} />
                <input onKeyUp={(e) => handleKeyUp(e.key)} onChange={(e) => setValue(e.target.value)} type="text" placeholder="Enter board details (eg. 20w 3x32 2x6...)" className="input input-bordered w-full max-w-md text-neutral-content text-sm placeholder-gray-500" />
                <button onClick={() => generate(value)} className="btn">⏎</button>
            </div>
        </m.div>
    )
}