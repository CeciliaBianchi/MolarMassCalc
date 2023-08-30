document.getElementById('calculate').addEventListener('click', function () {
    const formula = document.getElementById('formula').value;
    const molarMass = calculateMolarMass(formula);
    document.getElementById('result').textContent = 'Molar Mass: ${molarMass.toFixed(2)} g/mol';
})

// Atomic masses of elements
const elements = require('periodic-table');

function calculateMolarMass(formula) {
    const atomicMasses = {};

    // Loop through each element
    for (const char of formula){
        if (char.match(/[A-Za-z]/)) {
            // Uppercase to ensure consistent in the elements
            const element = elements[char.toUpperCase()];
            if (element) {
                atomicMasses[char] = element.atomicMass;
            }
        }
    }

    let mass = 0;
    let currentElement = '';
    let count = '';
}