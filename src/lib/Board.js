const VALID_CIRCUITS = [6, 16, 20, 32, 40, 50]
export class BoardService {
    _countChar(str, c) {
        return str.split('').filter(v => v === c).length
    }

    _parseStr(str) {
        const result = {}
        str = str.toLowerCase()
        if (str.length < 1) return
        if (this._countChar(str, 'w') !== 1) return
        const arr = str.split(' ')
        for (let i = 0; i < arr.length; i++) {
            const chunk = arr[i]
            if (!chunk.includes('w')) continue
            let w
            try {
                w = parseInt(chunk.split('').filter(c => c !== 'w').join(''))
                if (isNaN(w)) return
                arr.splice(i, 1)
                result.slotCount = w
                result.slots = new Array(w).fill().map((_, i) => ({ label: '', amps: -1, i }))
            }
            catch { return }
        }
        const circuitMap = {}
        let t = 0
        for (let i = 0; i < arr.length; i++) {
            try {
                const [n, a] = arr[i].split('x').map(v => parseInt(v))
                if (isNaN(n) || isNaN(a)) return
                if (!VALID_CIRCUITS.includes(a)) return
                if (circuitMap[a] === undefined) circuitMap[a] = 0
                circuitMap[a] += n
                t += n
            } catch { return }
        }
        if (t > result.slotCount) return
        result.circuits = Object.entries(circuitMap).map(([a, n]) => ({ a: parseInt(a), n }))
        result.circuits.reverse()
        result.circuitCount = t
        result.gapCount = result.slotCount - result.circuitCount
        return result
    }

    _layoutSlots(board) {
        let gaps = board.gapCount
        let i = 0
        for (let { a, n } of board.circuits) {
            while (n > 0) {
                board.slots[i].amps = a
                n--
                i++
                board.slots[i].amps = 0
            }
            if (gaps > 0) {
                i++
                gaps--
            }
        }
        return board
    }

    fromString(str) {
        const board = this._parseStr(str)
        if (!board) return null
        return this._layoutSlots(board)
    }
}