function updateLocalStorage(checkbox) {
    if (checkbox.checked) {
        localStorage.setItem(checkbox.id, 'true');
    } else {
        localStorage.removeItem(checkbox.id);
    }
}
function loadCheckboxState(checkboxes) {
    checkboxes.forEach(checkbox => {
        if (localStorage.getItem(checkbox.id) === 'true') {
            checkbox.checked = true;
        }
    });
}

function updateCounter() {
    document.querySelector('span#span1').innerHTML = document.querySelectorAll('input[type="checkbox"]:checked').length;
}

document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector("#mainTable");
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const counter = document.querySelector('span#span1');
    const total = document.querySelector('span#span2');
    
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            updateCounter();
            updateLocalStorage(this);
        });
    });
    
    table.addEventListener('click', function(e) {
        let tr = e.target.closest('tr')
        if (!e.target.matches('input[type="checkbox"]')) { // only <td> (not checkbox element) 
            const c = e.target.querySelector('input[type="checkbox"]')
            if (c === null) {
                return;
            }
            c.click()
            updateLocalStorage(c)
        }
    })
    loadCheckboxState(checkboxes);
    
    counter.innerHTML = document.querySelectorAll('input[type="checkbox"]:checked').length;
    total.innerHTML = checkboxes.length;
});
