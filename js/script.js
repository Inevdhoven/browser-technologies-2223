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

// console.log(tshirtOrder);
// console.log(id);

const keyName = "shirtUserAccount";

switch (path) {
    case '/':
        
        break;
    case '/overview.html':
        
        // let userAccount;
        if (localStorage.getItem(keyName)) {
            userAccount = JSON.parse(localStorage.getItem(keyName));

        } else {
            setInitialOrder();
            userAccount = userAccountObject;
        }

        const newDesignButton = document.querySelector('.overview a');
        newDesignButton.href = `choose-size.html#${orderId}`;
        console.log(newDesignButton.href);

        console.log('new generated id:', id);

        console.log('user orders:');
        console.log(userAccount);

        // console.log('order exists: ' + orderExists);

        // TODO: loop through orders
        // userAccount.orders ={}
        console.log('LOOP THRU ORDERS!!!');

        let orders = userAccount.orders;
        const items = document.querySelector('.overview ul');
        console.log(items);
        console.log(orders);
        for (let orderId in orders) {
            let order = orders[orderId];
            const item = document.createElement('li');

            item.insertAdjacentHTML('beforeend', `
                <a href="design.html#${orderId}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="280" height="300" viewBox="0 0 24 24" stroke-width="1" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M15 4l6 2v5h-3v8a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-8h-3v-5l6 -2a3 3 0 0 0 6 0" />
                    </svg>
                    <img src="${order.image}" alt="designed t shirt">
                    <p>Size: ${order.size}</p>
                    <p>Gender: ${order.gender}</p>
                    <p>Color: ${order.color}</p>
                    <p>Text: ${order.text}</p>
                </a>
                `
            );

            console.log(item);

            
            items.appendChild(item);
            // console.log(`Order ID: ${orderId}`);
            // console.log(`Color: ${order.color}`);
            // console.log(`Gender: ${order.gender}`);
            // console.log(`Image: ${order.image}`);
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

        const button = document.querySelector('.design section nav button');
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
        //Do something
        break;
    case '/order.html':
            //Do something
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