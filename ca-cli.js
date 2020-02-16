const params = process.argv.slice(2);

const rulestring = params[0];
const b = rulestring.substring(1, rulestring.indexOf('s')).split('').map(n => parseInt(n));
const s = rulestring.substring(rulestring.indexOf('s')+1).split('').map(n => parseInt(n));

const neighborhood = params[1];
const gridfile = params[2];

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(gridfile)
});

let gridWidth;
let curRow = 0;
let grid = [];
lineReader.on('line', function (line) {
    if(curRow === 0)
    {
        gridWidth = line.length;
    }

    if(gridWidth !== line.length)
    {
        throw new Error("Invalid grid.")
    }
    
    let gridRow = line.split('').map(i => i !== '.');

    grid.push(gridRow)
    curRow++;
});

lineReader.on('close', () => {
    setInterval(() => {
        let nextGen = [];
        console.clear();
        display(grid);
        for(let i=0;i<grid.length;i++)
        {
            let row = grid[i];
            let newRow = [];
            for(let j=0;j<row.length;j++)
            {
                let cell = [i,j];
                if(row[j])
                {
                    switch(countAliveNeighbors(grid, neighborhood, cell))
                    {
                        case 2:
                        case 3:
                            newRow.push(true);
                            break;
                        default:
                            newRow.push(false);
                    }
                }
                else
                {
                    if(countAliveNeighbors(grid, neighborhood, cell) === 3)
                    {
                        newRow.push(true);
                    }
                    else
                    {
                        newRow.push(false);
                    }
                }
            }
            nextGen.push(newRow);
        }

        grid = [...nextGen];
    },500)
})

function getNeighbors(neighborhood, cell)
{
    let relative;
    switch(neighborhood)
    {
        case 'm': // Moore
            relative = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
            break;
        case 'v': // von Neumann
            relative = [[-1,0], [0,-1], [0,1], [1,0]];
            break;
        case 'h': // hexagonal
            relative = [[-1,-1], [-1,0], [0,-1], [0,1], [1,0], [1,1]];
            break;
    }

    let neighbors = [];
    for(let i=0;i<relative.length;i++)
    {
        let nb = [ cell[0]+relative[i][0] , cell[1]+relative[i][1] ];
        neighbors.push(nb);
    }

    return neighbors;
}

function countAliveNeighbors(grid, neighborhood, cell)
{
    const neighbors = getNeighbors(neighborhood, cell);
    const gridHeight = grid.length;
    const gridWidth = grid[0].length;
    let count = 0;
    for(let i=0;i<neighbors.length;i++)
    {
        let nb = neighbors[i];
        if(nb[0] < 0 || nb[1] < 0 || nb[0] >= gridHeight  || nb[1] >= gridWidth)
        {
            // out of bounds -> dead cell
        }
        else
        {
            count += grid[ nb[0] ][ nb[1] ] ? 1 : 0;
        }
    }
    
    return count;
}

function display(grid)
{
    for(let i=0;i<grid.length;i++)
    {
        let gridRow = grid[i];
        let displayRow = '';
        for(let j=0;j<gridRow.length;j++)
        {
            displayRow += gridRow[j] ? 'o' : '.';
        }
        console.log(displayRow);
        
    }
}