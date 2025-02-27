let tshirtOrder = {
    "id": '',
    "size": '',
    "gender": '',
    "color": '',
    "text": '',
    "image": '',
}

let userAccountObject = {
    orders: {}
}

let path = window.location.pathname;
let id = Math.random().toString(36).substring(2, 8)
let orderId = 'id=' + id;
let orderExists = '';
let userAccount;

console.log(tshirtOrder);
console.log(id);

const keyName = "shirtUserAccount";

function paths() {
    console.log('testtest');
    switch (path) {
        case '/':
            console.log('path: ' + path);
            break;
        case '/overview.html':
            console.log('path: ' + path);
            // let userAccount;
            if (localStorage.getItem(keyName)) {
                userAccount = JSON.parse(localStorage.getItem(keyName));

            } else {
                setInitialOrder();
                userAccount = userAccountObject;
            }

            const newDesignButton = document.querySelector('.overview a');
            newDesignButton.href = `choose-size.html#${orderId}`;
            const newDesignButton2 = document.querySelector('.overview section a');
            newDesignButton2.href = `choose-size.html#${orderId}`;
            console.log(newDesignButton.href);

            console.log('new generated id:', id);

            console.log('user orders:');
            console.log(userAccount);

            let orders = userAccount.orders;
            const items = document.querySelector('.overview ul');
            console.log(items);
            console.log(orders);

            for (let orderId in orders) {
                let order = orders[orderId];
                const item = document.createElement('li');

                item.insertAdjacentHTML('beforeend', `
                    <a href="choose-size.html#id=${orderId}">
                        <span>designed t-shirt with id ${orderId}</span>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="280" height="300" viewBox="0 0 24 24" stroke-width="1" stroke="${order.color}" fill="${order.color}" stroke-linecap="round" stroke-linejoin="round">
                                <title>Designed t-shirt</title>
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M15 4l6 2v5h-3v8a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-8h-3v-5l6 -2a3 3 0 0 0 6 0" />
                            </svg>
                            <p>${order.text}</p>
                            <img src="${order.image}" alt="uploaded image of ${orderId}">
                        </div>
                        <p>Size: ${order.size}</p>
                        <p>Gender: ${order.gender}</p>
                    </a>
                    `
                );

                console.log(item);

                items.appendChild(item);
            }

            const zeroState = document.querySelector('.overview section');
            if (Object.keys(userAccount.orders).length === 0) {
                console.log('No orders yet')
                zeroState.classList.remove('hide');
            } else {
                console.log('Orders exist')
                zeroState.classList.add('hide');
            }
            
            // if(localStorage.getItem('size') === null || localStorage.getItem('gender') === null) {
            //     console.log('No size and gender selected');
            // } else {
            //     const items = document.querySelector('.overview ul');
            //     const item = document.createElement('li');
            //     const size = localStorage.getItem('size');
            //     const gender = localStorage.getItem('gender');
                
            //     item.insertAdjacentHTML('beforeend', `
            //     <a href="design.html">
            //         <img src="" alt="designed t shirt">
            //         <p>Size: ${size}</p>
            //         <p>Gender: ${gender}</p>
            //         <p>Color: </p>
            //         <p>Text: </p>
            //     </a>
            //     `);

            //     items.appendChild(item);

            //     console.log(item)
            // }
            break;
        case '/choose-size.html':
            console.log('path: ' + path);
            const currentOrderId = window.location.hash.replace('#id=', '');
            console.log('editing order: ', currentOrderId);

            // Check if order id exists if not then back to overview
            if (!currentOrderId || currentOrderId === '') {
                window.location.href = 'overview.html';
                break;
            }

            // Get all user orders
            if (!localStorage.getItem(keyName)) {
                setInitialOrder();
            }

            userAccount = JSON.parse(localStorage.getItem(keyName));

            console.log(currentOrderId);

            // Check if order id exists -> aka order has been set before! 
            if (!userAccount.orders[currentOrderId]) {
                userAccount.orders[currentOrderId] = tshirtOrder;
                updateOrder(userAccount);
            } else {
                const sizeInputBtn = document.querySelector(`input[value="${userAccount.orders[currentOrderId].size}"]`);
                sizeInputBtn.checked = true;

                const genderInputBtn = document.querySelector(`input[value="${userAccount.orders[currentOrderId].gender}"]`);
                genderInputBtn.checked = true;
            }

            const sizeForm = document.querySelector('.choose-size form');
            console.log(sizeForm);

            sizeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('form submitted');

                // Get submitted form data
                const formData = new FormData(e.target);
                const formProps = Object.fromEntries(formData);

                // Get up-to-date user orders from localstorage
                const userOrders = getUserOrders();

                // Set values
                userOrders.orders[currentOrderId].size = formProps.size;
                userOrders.orders[currentOrderId].gender = formProps.gender;

                // Save updated object in localstorage
                updateOrder(userOrders);

                // Redirect to design page
                window.location.href = 'design.html#id=' + currentOrderId;
            });

            break;
        case '/design.html':
            const currentOrderIdDesgin = window.location.hash.replace('#id=', '');
            console.log('editing order: ', currentOrderIdDesgin);

            const fileInput = document.querySelector('.design section nav input[type="file"]');
            const image = document.createElement('img');

            userAccount = JSON.parse(localStorage.getItem(keyName));
        
            if (userAccount.orders[currentOrderIdDesgin].image) {
                image.src = userAccount.orders[currentOrderIdDesgin].image;
                image.alt = 'uploaded image';
                image.classList.add('uploaded-image');
                document.querySelector('.design section:nth-of-type(2)').appendChild(image);
            }

            fileInput.addEventListener('change', (e) => {
                console.log('file input changed');
                const reader = new FileReader();
                
                reader.addEventListener('load', () => {
                    console.log(reader.result);
                    image.src = reader.result;
                    image.alt = 'uploaded image';
                    image.classList.add('uploaded-image');
                    document.querySelector('.design section:nth-of-type(2)').appendChild(image);

                    // tshirtOrder.image = reader.result;
                    // localStorage.setItem(`order${orderId}`, JSON.stringify(tshirtOrder));

                    // Get up-to-date user orders from localstorage
                    const userOrders = getUserOrders();

                    // Set values
                    userOrders.orders[currentOrderIdDesgin].image = reader.result;

                    // Save updated object in localstorage
                    updateOrder(userOrders);

                });

                if (e.target.files && e.target.files[0]) {
                    reader.readAsDataURL(e.target.files[0]);
                }
            });

            const textInput = document.querySelector('.design section nav input[type="text"]');
            const textButton = document.querySelector('.design section nav label[for="text"] button[type="submit"]');
            const text = document.createElement('p');
            text.classList.add('uploaded-text');

            if (userAccount.orders[currentOrderIdDesgin].text) {
                textInput.value = userAccount.orders[currentOrderIdDesgin].text;
                text.textContent = userAccount.orders[currentOrderIdDesgin].text;
                document.querySelector('.design section:nth-of-type(2)').appendChild(text);
            }
            
            textButton.addEventListener('click', (e) => {
                e.preventDefault();
                textValue = textInput.value;
                text.textContent = textValue;
                document.querySelector('.design section:nth-of-type(2)').appendChild(text);

                textInput.addEventListener('input', (e) => {
                    text.textContent = e.target.value;
                    // localStorage.setItem('text', textInput.value);
                    tshirtOrder.text = textInput.value;
                    // localStorage.setItem(`order${orderId}`, JSON.stringify(tshirtOrder));

                    // Get up-to-date user orders from localstorage
                    const userOrders = getUserOrders();

                    // Set values
                    userOrders.orders[currentOrderIdDesgin].text = textInput.value;

                    // Save updated object in localstorage
                    updateOrder(userOrders);
                });

                // tshirtOrder.text = textInput.value;
                // localStorage.setItem(`order${orderId}`, JSON.stringify(tshirtOrder));
                // localStorage.setItem('text', textInput.value);

                // Get up-to-date user orders from localstorage
                const userOrders = getUserOrders();

                // Set values
                userOrders.orders[currentOrderIdDesgin].text = textInput.value;

                // Save updated object in localstorage
                updateOrder(userOrders);
            });

            const colorInput = document.querySelector('.design section nav input[type="color"]');
            const tshirt = document.querySelector('.design section:nth-of-type(2) svg');

            if (userAccount.orders[currentOrderIdDesgin].color) {
                colorInput.value = userAccount.orders[currentOrderIdDesgin].color;
                tshirt.style.fill = userAccount.orders[currentOrderIdDesgin].color;
                tshirt.style.stroke = userAccount.orders[currentOrderIdDesgin].color;
            }

            colorInput.addEventListener('input', (e) => {
                const selectedColor = e.target.value;
                // localStorage.setItem('color', selectedColor);

                // tshirtOrder.color = selectedColor;
                tshirt.style.fill = selectedColor;
                tshirt.style.stroke = selectedColor;

                // localStorage.setItem(`order${orderId}`, JSON.stringify(tshirtOrder));

                // Get up-to-date user orders from localstorage
                const userOrders = getUserOrders();

                // Set values
                userOrders.orders[currentOrderIdDesgin].color = selectedColor;

                // Save updated object in localstorage
                updateOrder(userOrders);
            });


            const desginButton = document.querySelector('.design section:first-of-type ul li:last-of-type button[type="submit"]');
            console.log(desginButton);

            desginButton.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('button clicked');

                // Get up-to-date user orders from localstorage
                const userOrders = getUserOrders();

                // Set values
                userOrders.orders[currentOrderIdDesgin].isComplete = true;

                // Save updated object in localstorage
                updateOrder(userOrders);

                // Redirect to design page
                window.location.href = 'winkelwagen.html';

                // // Get up-to-date user orders from localstorage
                // const userOrders = getUserOrders();

                // // Set values
                // userOrders.orders[currentOrderId].size = formProps.size;
                // userOrders.orders[currentOrderId].gender = formProps.gender;

                // // Save updated object in localstorage
                // updateOrder(userOrders);

                // window.location.href = 'winkelwagen.html;
            });
            

            break;
        case '/winkelwagen.html':
            userAccount = JSON.parse(localStorage.getItem(keyName));
            console.log(userAccount);
            const orderOverview = document.querySelector('.shoppingcart table tbody');
            const orderFilledList = document.querySelector('.shoppingcart table tbody tr');
            const filledTotalPrice = document.querySelector('.shoppingcart table + p span');
            // orderFilledList.innerHTML = '<tr>Er zijn nog geen producten toegevoegd</tr>';
            orderFilledList.remove();
            filledTotalPrice.textContent = '€ 0,00';

            let ordersCart = userAccount.orders;

            for (let orderID in ordersCart) {
                let order = ordersCart[orderID];
                const item = document.createElement('tr');
                const itemPrice = '€25,00';

                item.insertAdjacentHTML('beforeend', `
                    <td>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="280" height="300" viewBox="0 0 24 24" stroke-width="1" stroke="${order.color}" fill="${order.color}" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M15 4l6 2v5h-3v8a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-8h-3v-5l6 -2a3 3 0 0 0 6 0" />
                            </svg>
                            <img src="${order.image}" alt="uploaded image on T-shirt">
                            <p>${order.text}</p>
                        </div>
                    </td>
                    <td>
                        <p>Size: ${order.size}</p>
                        <p>Gender: ${order.gender}</p>
                        <p>${itemPrice}</p>
                    </td>
                    <td>
                        <button class="remove">
                            Remove
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <line x1="4" y1="7" x2="20" y2="7" />
                                <line x1="10" y1="11" x2="10" y2="17" />
                                <line x1="14" y1="11" x2="14" y2="17" />
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                        </button>
                    </td>
                `);

                orderOverview.appendChild(item);
            }

            const removeButtons = document.querySelectorAll('.remove');
            console.log(removeButtons);

            removeButtons.forEach((button) => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('button clicked');
                    const td = e.target.parentNode.parentNode;
                    const tr = td.parentNode;
                    console.log(tr);
                    tr.remove();

                    // const filledTotalPrice = document.querySelector('.shoppingcart table + p span');
                    // filledTotalPrice.textContent = '€ 0,00';

                    const filledTotalPrice = document.querySelector('.shoppingcart table + p span');
                    const items = document.querySelectorAll('.shoppingcart table tbody tr');

                    let totalPrice = 0;

                    items.forEach((item) => {
                        const quantity = 1;
                        const price = 25;
                        totalPrice += quantity * price;
                    });

                    filledTotalPrice.textContent = '€ ' + totalPrice.toFixed(2);
                });
            });

            if (orderOverview.children.length === 0) {
                const emptyCart = document.createElement('tr');
                emptyCart.insertAdjacentHTML('beforeend', '<td>Er zijn nog geen producten toegevoegd</td>');
                orderOverview.appendChild(emptyCart);
            } else {
                const filledTotalPrice = document.querySelector('.shoppingcart table + p span');
                const items = document.querySelectorAll('.shoppingcart table tbody tr');

                let totalPrice = 0;
                // filledTotalPrice.textContent = '€ 25,00';

                items.forEach((item) => {
                    const quantity = 1;
                    const price = 25;
                    totalPrice += quantity * price;
                });

                filledTotalPrice.textContent = '€ ' + totalPrice.toFixed(2);
            }
            break;
        case '/order.html':
            console.log('order page');
            // Of email correct is of niet
            // Source https://codepen.io/FlorinPop17/pen/OJJKQeK
            function isEmail(email) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
            }
            const form = document.querySelector('.order form');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            form.setAttribute('novalidate', true);

            form.addEventListener('submit', (e) => {
                let errors = 0;
            console.log('form submitted');
                // Check firstname field
                const firstNameInput = document.querySelector('#firstname');
                if (firstNameInput.value.trim().length === 0) {
                    errors++;
                    firstNameInput.classList.add('error');
                    firstNameInput.insertAdjacentHTML('afterend', '<p>Please enter a first name</p>');
                } else {
                    firstNameInput.classList.remove('error');
                }

                // Check lastname field
                const lastNameInput = document.querySelector('#lastname');
                if (lastNameInput.value.trim().length === 0) {
                    errors++;
                    lastNameInput.classList.add('error');
                    lastNameInput.insertAdjacentHTML('afterend', '<p>Please enter a last name</p>');
                } else {
                    lastNameInput.classList.remove('error');
                }

                // Check email field
                const emailInput = document.querySelector('#email');
                if (!emailRegex.test(emailInput.value) && emailInput.value.trim().length === 0) {
                    errors++;
                    emailInput.classList.add('error');
                    emailInput.insertAdjacentHTML('afterend', '<p>Please enter a valid email address</p>');
                } else {
                    emailInput.classList.remove('error');
                }

                // Check address field
                const addressInput = document.querySelector('#address');
                if (addressInput.value.trim().length === 0) {
                    errors++;
                    addressInput.classList.add('error');
                    addressInput.insertAdjacentHTML('afterend', '<p>Please enter an address</p>');
                } else {
                    addressInput.classList.remove('error');
                }

                // Check city field
                const cityInput = document.querySelector('#city');
                if (cityInput.value.trim().length === 0) {
                    errors++;
                    cityInput.classList.add('error');
                    cityInput.insertAdjacentHTML('afterend', '<p>Please enter a city</p>');
                } else {
                    cityInput.classList.remove('error');
                }

                // Check country field
                const countryInput = document.querySelector('#country');
                if (countryInput.value.trim().length === 0) {
                    errors++;
                    countryInput.classList.add('error');
                    countryInput.insertAdjacentHTML('afterend', '<p>Please enter a country</p>');
                } else {
                    countryInput.classList.remove('error');
                }

                // Check postalCode field
                const postalCodeInput = document.querySelector('#postalCode');
                if (postalCodeInput.value.trim().length !== 6) {
                    errors++;
                    postalCodeInput.classList.add('error');
                    postalCodeInput.insertAdjacentHTML('afterend', '<p>Please enter a postal code that is 6 characters long</p>');
                } else {
                    postalCodeInput.classList.remove('error');
                }

                // Check phone field
                const phoneInput = document.querySelector('#phone');
                if (phoneInput.value.trim().length === 0) {
                    errors++;
                    phoneInput.classList.add('error');
                    phoneInput.insertAdjacentHTML('afterend', '<p>Please enter a phone number</p>');
                } else {
                    phoneInput.classList.remove('error');
                }

                // Check payment field
                const paymentInput = document.querySelector('#payment');
                if (paymentInput.value.trim().length === 0) {
                    errors++;
                    paymentInput.classList.add('error');
                    paymentInput.insertAdjacentHTML('afterend', '<p>Please enter a payment method</p>');
                } else {
                    paymentInput.classList.remove('error');
                }

                // If there are errors, prevent form submission
                if (errors > 0) {
                    e.preventDefault();
                }
            });
            break;
        case '/order-confirmation.html':
            //Do something
            break;
        default:
            //Do something
            break;
    }

    function setInitialOrder() {
        localStorage.setItem(keyName, JSON.stringify(userAccountObject));
        return true;
    }

    function getUserOrders() {
        return JSON.parse(localStorage.getItem(keyName));
    }

    function updateOrder(newOrderObject) {
        localStorage.setItem(keyName, JSON.stringify(newOrderObject));
        return true;
    }
}

// SOURCE: https://stackoverflow.com/questions/32902659/detect-if-browser-allows-setting-localstorage-setitem
function supports_html5_storage() {
    try {
        if ('localStorage' in window && window['localStorage'] !== null) {
            console.log('localstorage is supported')
            paths();
            return true;
        }
    } catch (e) {
        console.log('localstorage is not supported')
        return false;
    }
}

if (path == '/design.html' || path == '/winkelwagen.html') {
    const a = document.querySelector('a.back');
    a.href = `javascript: history.go(-1)`;
}

supports_html5_storage()