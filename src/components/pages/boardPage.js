import { AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { BoardService } from "../../lib/Board"
import { BoardBox } from "../boardBox"
import { BoardEntry } from "../boardEntry"

export const BoardPage = () => {
    const [board, setBoard] = useState(null)
    const boardService = useRef(new BoardService())
    const generateBoard = (str) => {
        const b = boardService.current.fromString(str)
        setBoard(b)
    }
    const updateBoard = (newBoard) => {
        setBoard(() => JSON.parse(JSON.stringify(newBoard)))
    }
    return (
        <div className="text-center h-full">
            <h1 className="font-bold text-4xl mt-10 text-primary bg-neutral-focus rounded-md w-fit mx-auto py-3 px-4">Disboard</h1>
            <AnimatePresence key={board == null}>
                {board === null && <BoardEntry generate={generateBoard} />}
                {board && <BoardBox board={board} updateBoard={updateBoard} />}
            </AnimatePresence>
        </div>
    )
}