const params = process.argv.slice(2);

const rule = params[0];
const initial = params[1];

const ruleBinary = parseInt(rule).toString(2).padStart(8,'0');
// console.log(ruleBinary);

let row = [];
for(let i=0;i<initial.length;i++)
{
    if(initial.charAt(i) === '.' || initial.charAt(i) === '0')
    {
        row.push(false);
    }
    else if(initial.charAt(i) === 'o' || initial.charAt(i) === '1')
    {
        row.push(true);
    }
}

function neighborState(row, index)
{
    if(index === 0)
    {
        return row[index] * 2 + row[index + 1] * 1;
    }
    else if(index === row.length - 1)
    {
        return row[index - 1] * 4 + row[index] * 2;
    }
    else
    {
        return row[index - 1] * 4 + row[index] * 2 + row[index + 1] * 1;
    }
}

setInterval(() => {
    let nextRow = [];
    display(row);

    for(let i=0;i<row.length;i++)
    {
        let nbstate = neighborState(row,i);
        let newCellState = ruleBinary.charAt(7 - nbstate);
        // console.log(nbstate, newCellState, !!parseInt(newCellState));
        nextRow.push(!!parseInt(newCellState));
    }
    
    row = [...nextRow];
}, 250)


const liveCell = '█'
const liveCell2 = 'o'
function display(row)
{
    let out = '';
    for(let i=0;i<row.length;i++)
    {
        out += row[i] ? liveCell : ' ';
    }

    console.log(out);    
}