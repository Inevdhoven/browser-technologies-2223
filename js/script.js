var tshirtOrder = {
    "id": '',
    "size": '',
    "gender": '',
    "color": '',
    "text": '',
    "image": '',
    "textColor": '',
}
window.localStorage.setItem("myObject", JSON.stringify(tshirtOrder));
var path = window.location.pathname;
var id = "id=" + Math.random().toString(36).substring(2, 8)
let orderId = '';
let orderExists = '';

console.log(tshirtOrder)
console.log(id)

switch (path) {
    case '/':
        
        break;
    case '/overview.html':

        orderId = window.location.hash.substring(1);
        orderExists = JSON.parse(localStorage.getItem(`order${orderId}`));

        console.log('tests' + orderId);
        console.log('jall' + orderExists);

        if(localStorage.getItem('size') === null || localStorage.getItem('gender') === null) {
            console.log('No size and gender selected');
        } else {
            const items = document.querySelector('.overview ul');
            const item = document.createElement('li');
            const size = localStorage.getItem('size');
            const gender = localStorage.getItem('gender');
            
            item.insertAdjacentHTML('beforeend', `
            <a href="design.html">
                <img src="" alt="designed t shirt">
                <p>Size: ${size}</p>
                <p>Gender: ${gender}</p>
                <p>Color: </p>
                <p>Text: </p>
            </a>
            `);

            items.appendChild(item);

            console.log(item)
        }
        break;
    case '/choose-size.html':
        const sizeForm = document.querySelector('.choose-size form');
        console.log(sizeForm);

        sizeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const size = document.querySelector('input[name="size"]:checked').value;
            const gender = document.querySelector('input[name="gender"]:checked').value;

            tshirtOrder.size = size;
            tshirtOrder.gender = gender;

            // localStorage.setItem('size', size);
            // localStorage.setItem('gender', gender);
            localStorage.setItem(`order${orderId}`, JSON.stringify(tshirtOrder));

            console.log(tshirtOrder);

            window.location.href = 'design.html';
        });
        break;
    case '/design.html':
        const button = document.querySelector('.design section nav button');
        const fileInput = document.querySelector('.design section nav input[type="file"]');
        const image = document.createElement('img');

        fileInput.addEventListener('change', (e) => {
            console.log('file input changed');
            const reader = new FileReader();
            
            reader.addEventListener('load', () => {
                console.log(reader.result);
                image.src = reader.result;
                image.alt = 'uploaded image';
                image.classList.add('uploaded-image');
                document.querySelector('.design section:nth-of-type(2)').appendChild(image);

                localStorage.setItem('image', reader.result);
            });

            if (e.target.files && e.target.files[0]) {
                reader.readAsDataURL(e.target.files[0]);
            }
        });

        const textInput = document.querySelector('.design section nav input[type="text"]');
        const textButton = document.querySelector('.design section nav label[for="text"] button[type="submit"]');
        const text = document.createElement('p');
        text.classList.add('uploaded-text');
        
        textButton.addEventListener('click', (e) => {
            e.preventDefault();
            textValue = textInput.value;
            text.textContent = textValue;
            document.querySelector('.design section:nth-of-type(2)').appendChild(text);

            textInput.addEventListener('input', (e) => {
                text.textContent = e.target.value;
                localStorage.setItem('text', textInput.value);
            });

            localStorage.setItem('text', textInput.value);
        });

        const colorInput = document.querySelector('.design section nav input[type="color"]');
        const tshirt = document.querySelector('.design section:nth-of-type(2) svg');

        colorInput.addEventListener('input', (e) => {
            const selectedColor = e.target.value;
            localStorage.setItem('color', selectedColor);
            tshirt.style.fill = selectedColor;
            tshirt.style.stroke = selectedColor;
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