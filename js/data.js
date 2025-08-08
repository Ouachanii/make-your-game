export let GAME_DATA = {

    cellSize: 60,

    isStarted: false,
    isPaused: false,
    isDead: false,
    bombThrowed: false,


    score: 0,
    lives: 3,
    level: 1,

    enemiesCount: 0,

    totalSeconds: 180,
    timerInterval: null,

    lastTime: Date.now(),
    lastMovementTime: Date.now(),
    idleDelay: 500,
    startTime: null,

    cells: [],
    wallCells: new Set(),
    bombPos: {},
    bombedCells: [],
    groundCells: [],
    enemies: [],
    enmSpawnCell: [],
    temporaryCells: [],

    rowsLen: 0,
    colsLen: 0,

    lastBomb: 0,
    animationId: null,


    endPose: { x: 11, y: 13 },
}

export const level = [
    {
        timeLimit: 180,
        unwalkableCellsPos: [
            { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7 }, { x: 0, y: 8 }, { x: 0, y: 9 }, { x: 0, y: 10 }, { x: 0, y: 11 }, { x: 0, y: 12 }, { x: 0, y: 13 }, { x: 0, y: 14 },
            { x: 12, y: 0 }, { x: 12, y: 1 }, { x: 12, y: 2 }, { x: 12, y: 3 }, { x: 12, y: 4 }, { x: 12, y: 5 }, { x: 12, y: 6 }, { x: 12, y: 7 }, { x: 12, y: 8 }, { x: 12, y: 9 }, { x: 12, y: 10 }, { x: 12, y: 11 }, { x: 12, y: 12 }, { x: 12, y: 13 }, { x: 12, y: 14 },
            { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 }, { x: 9, y: 0 }, { x: 10, y: 0 }, { x: 11, y: 0 },
            { x: 1, y: 14 }, { x: 2, y: 14 }, { x: 3, y: 14 }, { x: 4, y: 14 }, { x: 5, y: 14 }, { x: 6, y: 14 }, { x: 7, y: 14 }, { x: 8, y: 14 }, { x: 9, y: 14 }, { x: 10, y: 14 }, { x: 11, y: 14 },

            { x: 6, y: 6 }, { x: 6, y: 7 }, { x: 6, y: 8 },
            { x: 5, y: 7 }, { x: 7, y: 7 },
        ],
        temporaryCells: [
            { x: 5, y: 6 }, { x: 7, y: 6 },
            { x: 5, y: 8 }, { x: 7, y: 8 },
            { x: 4, y: 7 }, { x: 8, y: 7 },

            { x: 3, y: 3 }, { x: 9, y: 3 },
            { x: 3, y: 11 }, { x: 9, y: 11 },
        ],
        enmSpawnPos: [
            { x: 7, y: 2 },
            { x: 10, y: 12 },
        ],
        playerStartPos: { x: 1, y: 1 },
        endPos: (function () {
            const tempCells = [
                { x: 5, y: 6 }, { x: 7, y: 6 },
                { x: 5, y: 8 }, { x: 7, y: 8 },
                { x: 4, y: 7 }, { x: 8, y: 7 },
                { x: 3, y: 3 }, { x: 9, y: 3 },
                { x: 3, y: 11 }, { x: 9, y: 11 }
            ];
            return tempCells[Math.floor(Math.random() * tempCells.length)];
        })(),
    },
    {
        timeLimit: 170,
        unwalkableCellsPos: [
            { x: 6, y: 6 }, { x: 6, y: 7 }, { x: 6, y: 8 },
            { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 9 }, { x: 3, y: 10 }, { x: 3, y: 11 },
            { x: 9, y: 9 }, { x: 9, y: 10 }, { x: 9, y: 11 }, { x: 9, y: 3 }, { x: 9, y: 4 }, { x: 9, y: 5 },
        ],
        temporaryCells: [
            { x: 2, y: 2 }, { x: 4, y: 2 }, { x: 8, y: 2 }, { x: 10, y: 2 },
            { x: 2, y: 12 }, { x: 4, y: 12 }, { x: 8, y: 12 }, { x: 10, y: 12 },
            { x: 5, y: 6 }, { x: 7, y: 6 }, { x: 5, y: 3 }, { x: 5, y: 11 },
            { x: 5, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 4 }, { x: 6, y: 10 },
            { x: 2, y: 7 }, { x: 10, y: 7 }, { x: 7, y: 3 }, { x: 7, y: 11 },
        ],
        enmSpawnPos: [
            { x: 9, y: 2 },
            { x: 10, y: 12 },
            { x: 2, y: 12 },
        ],
        playerStartPos: { x: 1, y: 1 },
        endPos: (function () {
            const tempCells = [
                { x: 2, y: 2 }, { x: 4, y: 2 }, { x: 8, y: 2 }, { x: 10, y: 2 },
                { x: 2, y: 12 }, { x: 4, y: 12 }, { x: 8, y: 12 }, { x: 10, y: 12 },
                { x: 5, y: 6 }, { x: 7, y: 6 }, { x: 5, y: 3 }, { x: 5, y: 11 },
                { x: 5, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 4 }, { x: 6, y: 10 },
                { x: 2, y: 7 }, { x: 10, y: 7 }, { x: 7, y: 3 }, { x: 7, y: 11 }
            ];
            return tempCells[Math.floor(Math.random() * tempCells.length)];
        })(),
    },
    {
        timeLimit: 160,
        unwalkableCellsPos: [
            { x: 6, y: 6 }, { x: 6, y: 7 }, { x: 6, y: 8 },
            { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 9 }, { x: 3, y: 10 }, { x: 3, y: 11 },
            { x: 9, y: 9 }, { x: 9, y: 10 }, { x: 9, y: 11 }, { x: 9, y: 3 }, { x: 9, y: 4 }, { x: 9, y: 5 },
        ],
        temporaryCells: [
            { x: 2, y: 2 }, { x: 4, y: 2 }, { x: 8, y: 2 }, { x: 10, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 7, y: 2 },
            { x: 2, y: 12 }, { x: 4, y: 12 }, { x: 8, y: 12 }, { x: 10, y: 12 }, { x: 5, y: 12 }, { x: 6, y: 12 }, { x: 7, y: 12 },
            { x: 5, y: 6 }, { x: 7, y: 6 }, { x: 5, y: 3 }, { x: 5, y: 11 },
            { x: 5, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 4 }, { x: 6, y: 10 },
            { x: 2, y: 7 }, { x: 10, y: 7 }, { x: 7, y: 3 }, { x: 7, y: 11 },
            { x: 2, y: 6 }, { x: 2, y: 8 }, { x: 3, y: 6 }, { x: 3, y: 7 }, { x: 3, y: 8 },
            { x: 9, y: 6 }, { x: 9, y: 8 }, { x: 10, y: 6 }, { x: 9, y: 7 }, { x: 10, y: 8 },
        ],
        enmSpawnPos: [
            { x: 8, y: 2 }, 
            { x: 9, y: 12 },
            { x: 6, y: 7 },
            { x: 6, y: 7 },
        ],
        playerStartPos: { x: 1, y: 1 },
        endPos: (function () {
            const tempCells = [
                { x: 2, y: 2 }, { x: 2, y: 12 }, { x: 4, y: 2 }, { x: 4, y: 12 },
                { x: 6, y: 2 }, { x: 6, y: 12 }, { x: 8, y: 2 }, { x: 8, y: 12 },
                { x: 10, y: 2 }, { x: 10, y: 12 }, { x: 3, y: 3 }, { x: 3, y: 11 },
                { x: 5, y: 3 }, { x: 5, y: 11 }, { x: 7, y: 3 }, { x: 7, y: 11 },
                { x: 9, y: 3 }, { x: 9, y: 11 }
            ];
            return tempCells[Math.floor(Math.random() * tempCells.length)];
        })(),
    },
    {
        timeLimit: 140,
        temporaryCells: [
            { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 3, y: 7 }, { x: 3, y: 8 }, { x: 3, y: 9 }, { x: 3, y: 10 }, { x: 3, y: 11 },
            { x: 9, y: 3 }, { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 }, { x: 9, y: 7 }, { x: 9, y: 8 }, { x: 9, y: 9 }, { x: 9, y: 10 }, { x: 9, y: 11 },
            { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }, { x: 8, y: 3 },
            { x: 4, y: 11 }, { x: 5, y: 11 }, { x: 6, y: 11 }, { x: 7, y: 11 }, { x: 8, y: 11 },

            { x: 6, y: 5 }, { x: 6, y: 6 }, { x: 6, y: 7 }, { x: 6, y: 8 }, { x: 6, y: 9 },
            { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 7, y: 7 }, { x: 8, y: 7 },
        ],
        unwalkableCellsPos: [
            { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 7, y: 5 }, { x: 8, y: 5 },
            { x: 4, y: 9 }, { x: 5, y: 9 }, { x: 7, y: 9 }, { x: 8, y: 9 },
            { x: 5, y: 6 }, { x: 7, y: 6 },
            { x: 5, y: 8 }, { x: 7, y: 8 },

            { x: 2, y: 6 }, { x: 10, y: 6 },
            { x: 2, y: 8 }, { x: 10, y: 8 },
        ],
        enmSpawnPos: [
            { x: 9, y: 1 },
            { x: 10, y: 2 },
            { x: 2, y: 12 },
            { x: 10, y: 12 },
            { x: 2, y: 7 },
        ],
        playerStartPos: { x: 1, y: 1 },
        endPos: (function () {
            const tempCells = [
                { x: 3, y: 3 }, { x: 9, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 },
                { x: 6, y: 3 }, { x: 7, y: 3 }, { x: 8, y: 3 }, { x: 4, y: 11 },
                { x: 5, y: 11 }, { x: 6, y: 11 }, { x: 7, y: 11 }, { x: 8, y: 11 },
                { x: 6, y: 5 }, { x: 6, y: 6 }, { x: 6, y: 8 }, { x: 6, y: 9 },
                { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 7, y: 7 }, { x: 8, y: 7 }
            ];
            return tempCells[Math.floor(Math.random() * tempCells.length)];
        })(),
    },
    {
        timeLimit: 120,
        temporaryCells: [
            { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 3, y: 7 }, { x: 3, y: 8 }, { x: 3, y: 9 }, { x: 3, y: 10 }, { x: 3, y: 11 },
            { x: 9, y: 3 }, { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 }, { x: 9, y: 7 }, { x: 9, y: 8 }, { x: 9, y: 9 }, { x: 9, y: 10 }, { x: 9, y: 11 },
            { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }, { x: 8, y: 3 },
            { x: 4, y: 11 }, { x: 5, y: 11 }, { x: 6, y: 11 }, { x: 7, y: 11 }, { x: 8, y: 11 },

            { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 6, y: 4 }, { x: 6, y: 10 }, { x: 6, y: 12 }, { x: 6, y: 13 },         
            { x: 6, y: 5 }, { x: 6, y: 6 }, { x: 6, y: 7 }, { x: 6, y: 8 }, { x: 6, y: 9 },
            { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 7, y: 7 }, { x: 8, y: 7 },
        ],
        unwalkableCellsPos: [
            { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 7, y: 5 }, { x: 8, y: 5 },
            { x: 4, y: 9 }, { x: 5, y: 9 }, { x: 7, y: 9 }, { x: 8, y: 9 },
            { x: 5, y: 6 }, { x: 7, y: 6 },
            { x: 5, y: 8 }, { x: 7, y: 8 },

            { x: 2, y: 6 }, { x: 10, y: 6 },
            { x: 2, y: 8 }, { x: 10, y: 8 },
        ],
        enmSpawnPos: [
            { x: 2, y: 10 },
            { x: 10, y: 2 },
            { x: 2, y: 12 },
            { x: 10, y: 12 },
            { x: 2, y: 12 },
            { x: 10, y: 12 },
        ],
        playerStartPos: { x: 1, y: 1 },
        endPos: { x: 11, y: 13 },
    },
]