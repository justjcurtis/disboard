import { useState } from "react";
import { motion as m } from 'framer-motion'
import { ReactSortable } from "react-sortablejs";

export const BoardBox = ({ board, updateBoard }) => {
    const [dragIndex, setDragIndex] = useState();

    const handleDrag = (ev) => {
        const i = parseInt(ev.target.id.slice(4))
        setDragIndex(i);
    }
    const handleDrop = (ev) => {
        const dropIndex = parseInt(ev.target.id.slice(4))
        if (dragIndex === dropIndex) return
        let currentSlots = board.slots
        const dragSlot = currentSlots.splice(dragIndex, 1)[0]
        currentSlots = [...board.slots.slice(0, dropIndex), dragSlot, ...board.slots.slice(dropIndex)]
        board.slots = currentSlots
        updateBoard(board)
    };
    const clearBoard = () => {
        updateBoard(null)
    }
    const setBoard = slots => {
        updateBoard({ ...board, slots })
    }
    return (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.3, ease: 'easeInOut' }} className="h-[80%] w-full max-w-3xl mx-auto mt-10 px-5">
            <button onClick={clearBoard} className="btn btn-circle absolute top-[3.1rem] right-10">X</button>
            <div className="bg-neutral-focus w-full h-full rounded-lg overflow-y-scroll p-2">
                <ReactSortable
                    list={board.slots}
                    setList={setBoard}
                    animation={200}
                    handle='.dragHandle'
                    delayOnTouchStart={true}
                    delay={5}>
                    {board && board.slots.map((slot, i) => {
                        return (
                            <div key={slot.id} className="flex flex-col" id={`slot${i}`}>
                                <label id={`grid${i}`} className={`input-group ${i > 0 ? 'mt-1' : 'mt-0'}`}>
                                    <span id={`numb${i}`} className="min-w-[48px] bg-neutral-focus">{i + 1}.</span>
                                    <input id={`text${i}`} type="text" placeholder={`${slot.amps === 0 ? 'Auto generated gap' : ''}`} className="input input-bordered w-full text-neutral-content text-sm placeholder-gray-500 " />
                                    <span id={`amps${i}`} className="min-w-[48px] bg-neutral-focus">{slot.amps > 0 ? slot.amps : ''}</span>
                                    <button id={`drag${i}`} className="dragHandle min-w-[48px] bg-neutral-focus cursor-grab touch-none">???</button>
                                </label>
                            </div>
                        )
                    })}
                </ReactSortable>
            </div>
        </m.div>
    )
}