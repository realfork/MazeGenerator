let maze

export function generateMaze(size) {
    maze = Array(size).fill(0).map(a => Array(size).fill(0))

    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            if (x % 2 == 1 && y % 2 == 1) maze[x][y] = 0
            else maze[x][y] = 1
        }
    }

    breakWall(0, size / 2, 0, size / 2)

    // Makes nice border (Should probably make this better)
    for (let i = 0; i < size; i++) {
        maze[size - 1][i] = 1
        maze[i][size - 1] = 1
    }
    return maze
}

function breakWall(ra, rb, ca, cb) {
    if (cb - ca <= 1 && rb - ra <= 1) return
    if (rb - ra >= cb - ca) {
        let midR = (ra + rb) / 2
        let offC = parseInt(Math.random() * (cb - ca)) + ca
        maze[midR * 2][offC * 2 + 1] = 0
        breakWall(ra, midR, ca, cb)
        breakWall(midR, rb, ca, cb)
    } else {
        let midC = (ca + cb) / 2
        let offR = parseInt(Math.random() * (rb - ra)) + ra
        maze[offR * 2 + 1][midC * 2] = 0
        breakWall(ra, rb, ca, midC)
        breakWall(ra, rb, midC, cb)
    }
}