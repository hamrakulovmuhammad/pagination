let body = document.body
let container = document.querySelector('.container')
let todos = []

let paginations = document.querySelector(".pagination")
let currentPage = 1; // Текущая страница
const itemsPerPage = 12; // Количество элементов на странице
let data = []; // Массив для хранения всех данных

// fetch("https://jsonplaceholder.typicode.com/todos")
//     .then(res => res.json())
//     .then(res => reload(res))

fetch("https://jsonplaceholder.typicode.com/todos")
    .then(res => res.json())
    .then(res => {
        data = res;
        reload();
    });

function reload() {
    console.log(data)

    container.innerHTML = ""



    const startIndex = currentPage * itemsPerPage - itemsPerPage
    const endIndex = startIndex + itemsPerPage


    const coundItems = data.slice(startIndex, endIndex)
    // console.log(coundItems);


    for (let item of coundItems) {
        let box = document.createElement('div')
        let p = document.createElement('p')
        let span = document.createElement('span')
        let changeButton = document.createElement('button')
        let change = document.createElement("button")

        box.classList.add('box')
        p.classList.add('text')
        span.classList.add('op')
        change.classList.add("change")
        changeButton.classList.add("cancel")
        changeButton.innerHTML = "x"
        change.innerHTML = "✍️"


        let short = item.title.slice(0, 30) + "...";

        span.innerHTML = item.id
        p.innerHTML = short
        box.setAttribute('data-id', item.id)

        container.append(box)
        box.append(p, span, changeButton, change)

        changeButton.onclick = () => {
            todos = todos.filter(el => el.id !== item.id)
            box.classList.add('delete-anim')
            setTimeout(() => {
                box.remove()
            }, 500)
        }

        p.onclick = () => {
            p.classList.toggle('kool')
            item.isDone = p.classList.contains('kool')
        }

        if (item.isDone) {
            p.classList.add('kool')
        }

        change.onclick = () => {
            let modalBG = document.createElement("div")
            modalBG.classList.add("modal")

            let modalContent = document.createElement("div")
            modalContent.classList.add("modal-content")

            let label = document.createElement("label")
            label.innerHTML = "Изменить на: "

            let input = document.createElement("input")
            input.type = "text"
            input.id = "Input"
            input.value = item.title

            let buttonsContainer = document.createElement("div")
            buttonsContainer.classList.add("modal-buttons")

            let saveButton = document.createElement("button")
            saveButton.innerHTML = "сохранить"
            saveButton.classList.add("save")
            saveButton.onclick = () => saveItem(item)

            let cancelButton = document.createElement("button")
            cancelButton.innerHTML = "отменить"
            cancelButton.classList.add("mod")
            cancelButton.onclick = closeModal

            buttonsContainer.append(saveButton)
            buttonsContainer.append(cancelButton)

            modalContent.append(label)
            modalContent.append(input)
            modalContent.append(buttonsContainer)

            modalBG.append(modalContent)
            body.append(modalBG)

            openModal()

            function openModal() {
                modalBG.style.display = "block"
            }

            function closeModal() {
                modalBG.style.display = "none"
            }

            function saveItem(todo) {
                let taskInput = document.querySelector("#taskInput")
                let value = taskInput.value
                todo.task = value

                p.innerHTML = value

                console.log("Saved: " + value)
                closeModal()
            }
        }
    }
    pagination()
}
pagination
function pagination() {

    paginations.innerHTML = ""

    const Pagenat = Math.ceil(data.length / itemsPerPage);

    for (let item = 1; item <= Pagenat; item++) {
        let box_a = document.createElement('div')
        box_a.classList.add('link')
        let link = document.createElement("a");
        link.href = "#";
        link.innerText = item;

        if (item === currentPage) {
            link.classList.add("active");
        }

        link.onclick = () => {
            currentPage = item
            reload()
        }

        paginations.append(box_a)
        box_a.append(link)
    }
}

