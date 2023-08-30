const atomicMasses = {
    'H' : 1.008
};

document.getElementById('calculate').addEventListener('click', function () {
    console.log('Button clicked'); 
    const formula = document.getElementById('formula').value;
    const molarMass = calculateMolarMass(formula);

    document.getElementById('totalMolarMass').textContent = `${molarMass.toFixed(2)} g/mol`;

    const resultTableBody = document.getElementById('resultTableBody');
    resultTableBody.innerHTML = '';

    for (const elementSymbol in atomicMasses) {
        const elementMass = atomicMasses[elementSymbol];
        const row = resultTableBody.insertRow();
        const countCell = row.insertCell(0);
        const nameCell = row.insertCell(1);
        const massCell = row.insertCell(2);

        countCell.textContent = formula.split(elementSymbol).length - 1;
        nameCell.textContent = elementSymbol;
        massCell.textContent = elementMass.toFixed(2);
    }
});

function calculateMolarMass(formula) {
    let mass = 0;
    let currentElement = '';
    let count = '';

    // Calculate the molar mass based on atomic masses
    for (const char of formula) {
        if (char.match(/[A-Za-z]/)) {
            if (currentElement !== '') {
                mass += atomicMasses[currentElement] * (count === '' ? 1 : parseInt(count));
            }
            currentElement = char;
            count = '';
        } else if (char.match(/[a-z]/)) {
            currentElement += char;
        } else if (char.match(/[0-9]/)) {
            count += char;
        }
    }

    mass += atomicMasses[currentElement] * (count === '' ? 1 : parseInt(count));

    return mass;
}