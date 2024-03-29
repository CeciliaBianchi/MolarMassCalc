const atomicMasses = {
    'H': 1.008,
    'He': 4.0026,
    'Li': 6.94,
    'Be': 9.0122,
    'B': 10.81,
    'C': 12.011,
    'N': 14.007,
    'O': 15.999,
    'F': 18.998,
    'Ne': 20.180,
    'Na': 22.990,
    'Mg': 24.305,
    'Al': 26.982,
    'Si': 28.085,
    'P': 30.974,
    'S': 32.06,
    'Cl': 35.45,
    'K': 39.098,
    'Ar': 39.948,
    'Ca': 40.078,
    'Sc': 44.956,
    'Ti': 47.867,
    'V': 50.942,
    'Cr': 52.00,
    'Mn': 54.938,
    'Fe': 55.845,
    'Ni': 58.693,
    'Co': 58.933,
    'Cu': 63.546,
    'Zn': 65.38,
    'Ga': 69.723,
    'Ge': 72.63,
    'As': 74.922,
    'Se': 78.971,
    'Br': 79.904,
    'Kr': 83.798,
    'Rb': 85.468,
    'Sr': 87.62,
    'Y': 88.906,
    'Zr': 91.224,
    'Nb': 92.906,
    'Mo': 95.95,
    'Tc': 98,
    'Ru': 101.07,
    'Rh': 102.91,
    'Pd': 106.42,
    'Ag': 107.87,
    'Cd': 112.41,
    'In': 114.82,
    'Sn': 118.71,
    'Sb': 121.76,
    'Te': 127.60,
    'I': 126.90,
    'Xe': 131.29,
    'Cs': 132.91,
    'Ba': 137.33,
    'La': 138.91,
    'Ce': 140.12,
    'Pr': 140.91,
    'Nd': 144.24,
    'Pm': 145,
    'Sm': 150.36,
    'Eu': 152.00,
    'Gd': 157.25,
    'Tb': 158.93,
    'Dy': 162.50,
    'Ho': 164.93,
    'Er': 167.26,
    'Tm': 168.93,
    'Yb': 173.05,
    'Lu': 175.00,
    'Hf': 178.49,
    'Ta': 180.95,
    'W': 183.84,
    'Re': 186.21,
    'Os': 190.23,
    'Ir': 192.22,
    'Pt': 195.08,
    'Au': 196.97,
    'Hg': 200.59,
    'Tl': 204.38,
    'Pb': 207.2,
    'Bi': 208.98,
    'Th': 232.04,
    'Pa': 231.04,
    'U': 238.03,
    'Np': 237,
    'Pu': 244,
    'Am': 243,
    'Cm': 247,
    'Bk': 247,
    'Cf': 251,
    'Es': 252,
    'Fm': 257,
    'Md': 258,
    'No': 259,
    'Lr': 262,
    'Rf': 267,
    'Db': 270,
    'Sg': 271,
    'Bh': 270,
    'Hs': 277,
    'Mt': 276,
    'Ds': 281,
    'Rg': 280,
    'Cn': 285,
    'Nh': 284,
    'Fl': 289,
    'Mc': 288,
    'Lv': 293,
    'Ts': 294,
    'Og': 294,
};

document.getElementById('calculate').addEventListener('click', function () {
    console.log('Button clicked'); 
    const formula = document.getElementById('formula').value;
    const molarMass = calculateMolarMass(formula);

    const totalMolarMassElement = document.getElementById('totalMolarMass');
    totalMolarMassElement.textContent = `Total Molecular Weight: ${molarMass.toFixed(2)} g/mol`;


    const resultTableBody = document.getElementById('resultTableBody');
    resultTableBody.innerHTML = '';

    // Track used elements
    const usedElements = {};

    let elementSymbol = '';
    for (const char of formula) {
        if (char.match(/[A-Z]/)){
            if (elementSymbol !== '') {
                usedElements[elementSymbol] = true;
            }
            elementSymbol = char;
        } else if (char.match(/[a-z]/)) {
            elementSymbol += char;
        } else if (char.match(/[0-9]/)) {
            if (elementSymbol !== '') {
                usedElements[elementSymbol] = true;
            }
            elementSymbol = '';
        }
    }
    if (elementSymbol !== '') {
        usedElements[elementSymbol] = true;
    }

    for (const elementSymbol in usedElements) {
        if (atomicMasses.hasOwnProperty(elementSymbol)){
            const elementMass = atomicMasses[elementSymbol];
            const row = resultTableBody.insertRow();
            const countCell = row.insertCell(0);
            const nameCell = row.insertCell(1);
            const massCell = row.insertCell(2);

            countCell.textContent = formula.split(elementSymbol).length - 1;
            nameCell.textContent = elementSymbol;
            massCell.textContent = elementMass.toFixed(2);
        }
    }
});

function calculateMolarMass(formula) {
    let mass = 0;
    let currentElement = '';
    let count = '';

    // Calculate the molar mass based on atomic masses
    for (const char of formula) {
        if (char.match(/[A-Z]/)) {
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
        console.log(`char: ${char}, currentElement: ${currentElement}, count: ${count}, mass: ${mass}`);
    }

    mass += atomicMasses[currentElement] * (count === '' ? 1 : parseInt(count));

    return mass;
}