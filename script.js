const calculateBtn = document.getElementById('calculate');
const income = document.getElementById('income');
const food = document.getElementById('food');
const rent = document.getElementById('rent');
const clothes = document.getElementById('clothes');

// Result section
const expense = document.getElementById('total-expenses');
const balance = document.getElementById('balance');
const save = document.getElementById('save');
const saveBtn = document.getElementById('save-btn');
const savingAccount = document.getElementById('saving-account');
const ReBalance = document.getElementById('remaining-balance');



// Common function to get input value by id
const getInputValueById = (elementId) => {
    const input = document.getElementById(elementId);
    const inputValueString = input.value;
    const inputValueNumber = parseInt(inputValueString);
    return isNaN(inputValueNumber) ? 0 : inputValueNumber;
};


// Calculate event listeners 
calculateBtn.addEventListener('click', function (e) {
    // Hide results
    document.getElementById('results').style.display = 'none';
    // Show loader
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});



// calculate function 
const calculateResults = () => {
    if (income.value === '' || food.value === '' || rent.value === '' || clothes.value === '') {
        // Show results
        document.getElementById('results').style.display = 'none';
        // Hide loader
        document.getElementById('loading').style.display = 'block';
        showAlert('Please check the number')

    } else {
        const income = getInputValueById('income');
        const food = getInputValueById('food');
        const rent = getInputValueById('rent');
        const clothes = getInputValueById('clothes');

        // Total expense
        const totalExpense = (food + rent + clothes);
        expense.value = totalExpense;

        // Balance
        const balanceAmount = income - totalExpense;
        balance.value = balanceAmount;
        if (totalExpense > income) {
            showAlert(`Total expenses exceed the income`)
        }
        // Show results
        document.getElementById('results').style.display = 'block';
        // Hide loader
        document.getElementById('loading').style.display = 'none';
    }
};



saveBtn.addEventListener('click', (e) => {

    const saving = getInputValueById('save');
    const income = getInputValueById('income');
    const currentBalance = parseInt(balance.value);
    const totalExpense = parseInt(expense.value);

    if (totalExpense > income) {
        showAlert('You can not save money, Expense exceed the income')
        return;
    } else {
        const savingAmount = (income * saving) / 100;
             
        if (savingAmount > currentBalance) {
            showAlert(`Savings amount cannot exceed the current balance of ${currentBalance}`);
        } else {
            savingAccount.value = savingAmount;
            const remainingBalance = currentBalance - savingAmount;
            ReBalance.value = remainingBalance;
        }
    }

    e.preventDefault();
});




// Show alert function 
const showAlert = (error) => {
    // Hide results
    document.getElementById('results').style.display = 'none';
    // Hide loader
    document.getElementById('loading').style.display = 'none';

    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    // create Div
    const div = document.createElement('div');
    // Add className
    div.className = 'alert alert-danger';
    // AppendChild 
    div.appendChild(document.createTextNode(error));
    // Get parent 
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    card.insertBefore(div, heading);


    setTimeout(() => {
        if (div) {
            div.remove();
        }
    }, 3000);

};