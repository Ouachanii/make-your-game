// Enhanced Level Design System
export const level = [
    {
        name: "Level 1 - Training Ground",
        description: "A simple maze to learn the basics",
        timeLimit: 180,
        unwalkableCellsPos: [
            // Border walls
            { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7 }, { x: 0, y: 8 }, { x: 0, y: 9 }, { x: 0, y: 10 }, { x: 0, y: 11 }, { x: 0, y: 12 }, { x: 0, y: 13 }, { x: 0, y: 14 },
            { x: 12, y: 0 }, { x: 12, y: 1 }, { x: 12, y: 2 }, { x: 12, y: 3 }, { x: 12, y: 4 }, { x: 12, y: 5 }, { x: 12, y: 6 }, { x: 12, y: 7 }, { x: 12, y: 8 }, { x: 12, y: 9 }, { x: 12, y: 10 }, { x: 12, y: 11 }, { x: 12, y: 12 }, { x: 12, y: 13 }, { x: 12, y: 14 },
            { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 }, { x: 9, y: 0 }, { x: 10, y: 0 }, { x: 11, y: 0 },
            { x: 1, y: 14 }, { x: 2, y: 14 }, { x: 3, y: 14 }, { x: 4, y: 14 }, { x: 5, y: 14 }, { x: 6, y: 14 }, { x: 7, y: 14 }, { x: 8, y: 14 }, { x: 9, y: 14 }, { x: 10, y: 14 }, { x: 11, y: 14 },
            
            // Simple internal walls - cross pattern
            { x: 6, y: 6 }, { x: 6, y: 7 }, { x: 6, y: 8 },
            { x: 5, y: 7 }, { x: 7, y: 7 },
        ],
        temporaryCells: [
            // Breakable blocks around the cross
            { x: 5, y: 6 }, { x: 7, y: 6 },
            { x: 5, y: 8 }, { x: 7, y: 8 },
            { x: 4, y: 7 }, { x: 8, y: 7 },
            
            // scattered blocks
            { x: 3, y: 3 }, { x: 9, y: 3 },
            { x: 3, y: 11 }, { x: 9, y: 11 },
        ],
        enmSpawnPos: [
            { x: 2, y: 2 },
            { x: 10, y: 12 },
        ],
        playerStartPos: { x: 1, y: 1 },
        endPos: { x: 11, y: 13 },
    },
    {
        name: "Level 2 - The Maze",
        description: "Navigate through a more complex maze",
        timeLimit: 150,
        unwalkableCellsPos: [
            // Border walls
            { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7 }, { x: 0, y: 8 }, { x: 0, y: 9 }, { x: 0, y: 10 }, { x: 0, y: 11 }, { x: 0, y: 12 }, { x: 0, y: 13 }, { x: 0, y: 14 },
            { x: 12, y: 0 }, { x: 12, y: 1 }, { x: 12, y: 2 }, { x: 12, y: 3 }, { x: 12, y: 4 }, { x: 12, y: 5 }, { x: 12, y: 6 }, { x: 12, y: 7 }, { x: 12, y: 8 }, { x: 12, y: 9 }, { x: 12, y: 10 }, { x: 12, y: 11 }, { x: 12, y: 12 }, { x: 12, y: 13 }, { x: 12, y: 14 },
            { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 }, { x: 9, y: 0 }, { x: 10, y: 0 }, { x: 11, y: 0 },
            { x: 1, y: 14 }, { x: 2, y: 14 }, { x: 3, y: 14 }, { x: 4, y: 14 }, { x: 5, y: 14 }, { x: 6, y: 14 }, { x: 7, y: 14 }, { x: 8, y: 14 }, { x: 9, y: 14 }, { x: 10, y: 14 }, { x: 11, y: 14 },
            
            // Maze-like pattern
            { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 }, { x: 2, y: 7 }, { x: 2, y: 8 }, { x: 2, y: 9 }, { x: 2, y: 10 }, { x: 2, y: 11 }, { x: 2, y: 12 },
            { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 }, { x: 4, y: 7 }, { x: 4, y: 8 }, { x: 4, y: 9 }, { x: 4, y: 10 }, { x: 4, y: 11 }, { x: 4, y: 12 },
            { x: 6, y: 2 }, { x: 6, y: 3 }, { x: 6, y: 4 }, { x: 6, y: 5 }, { x: 6, y: 6 }, { x: 6, y: 7 }, { x: 6, y: 8 }, { x: 6, y: 9 }, { x: 6, y: 10 }, { x: 6, y: 11 }, { x: 6, y: 12 },
            { x: 8, y: 2 }, { x: 8, y: 3 }, { x: 8, y: 4 }, { x: 8, y: 5 }, { x: 8, y: 6 }, { x: 8, y: 7 }, { x: 8, y: 8 }, { x: 8, y: 9 }, { x: 8, y: 10 }, { x: 8, y: 11 }, { x: 8, y: 12 },
            { x: 10, y: 2 }, { x: 10, y: 3 }, { x: 10, y: 4 }, { x: 10, y: 5 }, { x: 10, y: 6 }, { x: 10, y: 7 }, { x: 10, y: 8 }, { x: 10, y: 9 }, { x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 },
            
            // Horizontal connections
            { x: 3, y: 3 }, { x: 3, y: 5 }, { x: 3, y: 7 }, { x: 3, y: 9 }, { x: 3, y: 11 },
            { x: 5, y: 3 }, { x: 5, y: 5 }, { x: 5, y: 7 }, { x: 5, y: 9 }, { x: 5, y: 11 },
            { x: 7, y: 3 }, { x: 7, y: 5 }, { x: 7, y: 7 }, { x: 7, y: 9 }, { x: 7, y: 11 },
            { x: 9, y: 3 }, { x: 9, y: 5 }, { x: 9, y: 7 }, { x: 9, y: 9 }, { x: 9, y: 11 },
        ],
        temporaryCells: [
            // Breakable blocks creating paths
            { x: 3, y: 4 }, { x: 3, y: 6 }, { x: 3, y: 8 }, { x: 3, y: 10 },
            { x: 5, y: 4 }, { x: 5, y: 6 }, { x: 5, y: 8 }, { x: 5, y: 10 },
            { x: 7, y: 4 }, { x: 7, y: 6 }, { x: 7, y: 8 }, { x: 7, y: 10 },
            { x: 9, y: 4 }, { x: 9, y: 6 }, { x: 9, y: 8 }, { x: 9, y: 10 },
        ],
        enmSpawnPos: [
            { x: 3, y: 2 },
            { x: 9, y: 12 },
            { x: 6, y: 7 },
        ],
        playerStartPos: { x: 1, y: 1 },
        endPos: { x: 11, y: 13 },
    },
    {
        name: "Level 3 - The Fortress",
        description: "A fortress with multiple chambers",
        timeLimit: 120,
        unwalkableCellsPos: [
            // Border walls
            { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7 }, { x: 0, y: 8 }, { x: 0, y: 9 }, { x: 0, y: 10 }, { x: 0, y: 11 }, { x: 0, y: 12 }, { x: 0, y: 13 }, { x: 0, y: 14 },
            { x: 12, y: 0 }, { x: 12, y: 1 }, { x: 12, y: 2 }, { x: 12, y: 3 }, { x: 12, y: 4 }, { x: 12, y: 5 }, { x: 12, y: 6 }, { x: 12, y: 7 }, { x: 12, y: 8 }, { x: 12, y: 9 }, { x: 12, y: 10 }, { x: 12, y: 11 }, { x: 12, y: 12 }, { x: 12, y: 13 }, { x: 12, y: 14 },
            { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 }, { x: 9, y: 0 }, { x: 10, y: 0 }, { x: 11, y: 0 },
            { x: 1, y: 14 }, { x: 2, y: 14 }, { x: 3, y: 14 }, { x: 4, y: 14 }, { x: 5, y: 14 }, { x: 6, y: 14 }, { x: 7, y: 14 }, { x: 8, y: 14 }, { x: 9, y: 14 }, { x: 10, y: 14 }, { x: 11, y: 14 },
            
            // Fortress walls - creating chambers
            { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 3, y: 7 }, { x: 3, y: 8 }, { x: 3, y: 9 }, { x: 3, y: 10 }, { x: 3, y: 11 },
            { x: 9, y: 3 }, { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 }, { x: 9, y: 7 }, { x: 9, y: 8 }, { x: 9, y: 9 }, { x: 9, y: 10 }, { x: 9, y: 11 },
            { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }, { x: 8, y: 3 },
            { x: 4, y: 11 }, { x: 5, y: 11 }, { x: 6, y: 11 }, { x: 7, y: 11 }, { x: 8, y: 11 },
            
            // Inner walls
            { x: 6, y: 5 }, { x: 6, y: 6 }, { x: 6, y: 7 }, { x: 6, y: 8 }, { x: 6, y: 9 },
            { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 7, y: 7 }, { x: 8, y: 7 },
        ],
        temporaryCells: [
            // Breakable walls creating passages
            { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 7, y: 5 }, { x: 8, y: 5 },
            { x: 4, y: 9 }, { x: 5, y: 9 }, { x: 7, y: 9 }, { x: 8, y: 9 },
            { x: 5, y: 6 }, { x: 7, y: 6 },
            { x: 5, y: 8 }, { x: 7, y: 8 },
            
            // Additional breakable blocks
            { x: 2, y: 6 }, { x: 10, y: 6 },
            { x: 2, y: 8 }, { x: 10, y: 8 },
        ],
        enmSpawnPos: [
            { x: 2, y: 2 },
            { x: 10, y: 2 },
            { x: 2, y: 12 },
            { x: 10, y: 12 },
            { x: 6, y: 7 },
        ],
        playerStartPos: { x: 1, y: 1 },
        endPos: { x: 11, y: 13 },
    },
    {
        name: "Level 4 - The Labyrinth",
        description: "A complex labyrinth with multiple paths",
        timeLimit: 90,
        unwalkableCellsPos: [
            // Border walls
            { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7 }, { x: 0, y: 8 }, { x: 0, y: 9 }, { x: 0, y: 10 }, { x: 0, y: 11 }, { x: 0, y: 12 }, { x: 0, y: 13 }, { x: 0, y: 14 },
            { x: 12, y: 0 }, { x: 12, y: 1 }, { x: 12, y: 2 }, { x: 12, y: 3 }, { x: 12, y: 4 }, { x: 12, y: 5 }, { x: 12, y: 6 }, { x: 12, y: 7 }, { x: 12, y: 8 }, { x: 12, y: 9 }, { x: 12, y: 10 }, { x: 12, y: 11 }, { x: 12, y: 12 }, { x: 12, y: 13 }, { x: 12, y: 14 },
            { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 }, { x: 9, y: 0 }, { x: 10, y: 0 }, { x: 11, y: 0 },
            { x: 1, y: 14 }, { x: 2, y: 14 }, { x: 3, y: 14 }, { x: 4, y: 14 }, { x: 5, y: 14 }, { x: 6, y: 14 }, { x: 7, y: 14 }, { x: 8, y: 14 }, { x: 9, y: 14 }, { x: 10, y: 14 }, { x: 11, y: 14 },
            
            // Complex labyrinth pattern
            { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 }, { x: 2, y: 7 }, { x: 2, y: 8 }, { x: 2, y: 9 }, { x: 2, y: 10 }, { x: 2, y: 11 }, { x: 2, y: 12 },
            { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 }, { x: 4, y: 7 }, { x: 4, y: 8 }, { x: 4, y: 9 }, { x: 4, y: 10 }, { x: 4, y: 11 }, { x: 4, y: 12 },
            { x: 6, y: 2 }, { x: 6, y: 3 }, { x: 6, y: 4 }, { x: 6, y: 5 }, { x: 6, y: 6 }, { x: 6, y: 7 }, { x: 6, y: 8 }, { x: 6, y: 9 }, { x: 6, y: 10 }, { x: 6, y: 11 }, { x: 6, y: 12 },
            { x: 8, y: 2 }, { x: 8, y: 3 }, { x: 8, y: 4 }, { x: 8, y: 5 }, { x: 8, y: 6 }, { x: 8, y: 7 }, { x: 8, y: 8 }, { x: 8, y: 9 }, { x: 8, y: 10 }, { x: 8, y: 11 }, { x: 8, y: 12 },
            { x: 10, y: 2 }, { x: 10, y: 3 }, { x: 10, y: 4 }, { x: 10, y: 5 }, { x: 10, y: 6 }, { x: 10, y: 7 }, { x: 10, y: 8 }, { x: 10, y: 9 }, { x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 },
            
            // Horizontal connections creating maze
            { x: 3, y: 2 }, { x: 3, y: 4 }, { x: 3, y: 6 }, { x: 3, y: 8 }, { x: 3, y: 10 }, { x: 3, y: 12 },
            { x: 5, y: 2 }, { x: 5, y: 4 }, { x: 5, y: 6 }, { x: 5, y: 8 }, { x: 5, y: 10 }, { x: 5, y: 12 },
            { x: 7, y: 2 }, { x: 7, y: 4 }, { x: 7, y: 6 }, { x: 7, y: 8 }, { x: 7, y: 10 }, { x: 7, y: 12 },
            { x: 9, y: 2 }, { x: 9, y: 4 }, { x: 9, y: 6 }, { x: 9, y: 8 }, { x: 9, y: 10 }, { x: 9, y: 12 },
            { x: 11, y: 2 }, { x: 11, y: 4 }, { x: 11, y: 6 }, { x: 11, y: 8 }, { x: 11, y: 10 }, { x: 11, y: 12 },
        ],
        temporaryCells: [
            // Strategic breakable blocks
            { x: 3, y: 3 }, { x: 3, y: 5 }, { x: 3, y: 7 }, { x: 3, y: 9 }, { x: 3, y: 11 },
            { x: 5, y: 3 }, { x: 5, y: 5 }, { x: 5, y: 7 }, { x: 5, y: 9 }, { x: 5, y: 11 },
            { x: 7, y: 3 }, { x: 7, y: 5 }, { x: 7, y: 7 }, { x: 7, y: 9 }, { x: 7, y: 11 },
            { x: 9, y: 3 }, { x: 9, y: 5 }, { x: 9, y: 7 }, { x: 9, y: 9 }, { x: 9, y: 11 },
            { x: 11, y: 3 }, { x: 11, y: 5 }, { x: 11, y: 7 }, { x: 11, y: 9 }, { x: 11, y: 11 },
        ],
        enmSpawnPos: [
            { x: 3, y: 2 },
            { x: 9, y: 2 },
            { x: 3, y: 12 },
            { x: 9, y: 12 },
            { x: 6, y: 7 },
            { x: 6, y: 7 },
        ],
        playerStartPos: { x: 1, y: 1 },
        endPos: { x: 11, y: 13 },
    },
    {
        name: "Level 5 - The Gauntlet",
        description: "The ultimate challenge with maximum enemies",
        timeLimit: 60,
        unwalkableCellsPos: [
            // Border walls
            { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7 }, { x: 0, y: 8 }, { x: 0, y: 9 }, { x: 0, y: 10 }, { x: 0, y: 11 }, { x: 0, y: 12 }, { x: 0, y: 13 }, { x: 0, y: 14 },
            { x: 12, y: 0 }, { x: 12, y: 1 }, { x: 12, y: 2 }, { x: 12, y: 3 }, { x: 12, y: 4 }, { x: 12, y: 5 }, { x: 12, y: 6 }, { x: 12, y: 7 }, { x: 12, y: 8 }, { x: 12, y: 9 }, { x: 12, y: 10 }, { x: 12, y: 11 }, { x: 12, y: 12 }, { x: 12, y: 13 }, { x: 12, y: 14 },
            { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 }, { x: 9, y: 0 }, { x: 10, y: 0 }, { x: 11, y: 0 },
            { x: 1, y: 14 }, { x: 2, y: 14 }, { x: 3, y: 14 }, { x: 4, y: 14 }, { x: 5, y: 14 }, { x: 6, y: 14 }, { x: 7, y: 14 }, { x: 8, y: 14 }, { x: 9, y: 14 }, { x: 10, y: 14 }, { x: 11, y: 14 },
            
            // Minimal walls - mostly open space for maximum challenge
            { x: 6, y: 6 }, { x: 6, y: 7 }, { x: 6, y: 8 },
            { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 },
            { x: 9, y: 9 }, { x: 9, y: 10 }, { x: 9, y: 11 },
        ],
        temporaryCells: [
            // Strategic cover points
            { x: 2, y: 2 }, { x: 4, y: 2 }, { x: 8, y: 2 }, { x: 10, y: 2 },
            { x: 2, y: 12 }, { x: 4, y: 12 }, { x: 8, y: 12 }, { x: 10, y: 12 },
            { x: 5, y: 6 }, { x: 7, y: 6 },
            { x: 5, y: 8 }, { x: 7, y: 8 },
            { x: 2, y: 7 }, { x: 10, y: 7 },
        ],
        enmSpawnPos: [
            { x: 2, y: 2 },
            { x: 10, y: 2 },
            { x: 2, y: 12 },
            { x: 10, y: 12 },
            { x: 6, y: 7 },
            { x: 6, y: 7 },
            { x: 6, y: 7 },
        ],
        playerStartPos: { x: 1, y: 1 },
        endPos: { x: 11, y: 13 },
    },
];

// Level helper functions
export function getCurrentLevel(levelNumber) {
    return level[levelNumber - 1] || level[0];
}

export function getLevelCount() {
    return level.length;
}

export function isLastLevel() {
    return GAME_DATA.level >= level.length;
} 