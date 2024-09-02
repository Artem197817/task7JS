/**Создайте массив clients для хранения информации о клиентах интернет-магазина:
 Первый объект в массиве содержит свойства:
 firstName - Александр, lastName - Иванчук, date - 11-29-1990, phone - 8 (929) 988-90-09, amounts - 2546, 2098, 764, 7266
 Второй объект в массиве содержит свойства:
 firstName - Анатолий, lastName - Стаценко, date - 02-12-1987, phone - null, amounts - 563, 8287, 889
 Третий объект в массиве содержит свойства:
 firstName - Марина, lastName - Петрова, date - 07-26-1997, phone - 8 (899) 546-09-08, amounts - 6525, 837, 1283, 392.
 Четвертый объект в массиве содержит свойства:
 firstName - Иван, lastName - Караванов, date - 09-12-1999, phone - null, amounts - 7634, 283, 9823, 3902.
 Пятый объект в массиве содержит свойства:
 firstName - Оксана, lastName - Абрамова, date - 01-24-2002, phone - 8 (952) 746-99-22, amounts - 342, 766, 362.*/

let clients = [
    {
        firstName: 'Александр',
        lastName: 'Иванчук',
        date: '11-29-1990',
        phone: '8 (929) 988-90-09',
        amounts: [2546, 2098, 764, 7266]
    },
    {
        firstName: "Анатолий",
        lastName: "Стаценко",
        date: "02-12-1987",
        phone: null,
        amounts: [563, 8287, 889]
    },
    {
        firstName: "Марина",
        lastName: "Петрова",
        date: "1997-08-07",
        phone: "8 (899) 546-09-08",
        amounts: [6525, 837, 1283, 392]
    },
    {
        firstName: "Иван",
        lastName: "Караванов",
        date: "09-02-1995",
        phone: null,
        amounts: [7634, 283, 9823, 3902]
    },
    {
        firstName: "Оксана",
        lastName: "Абрамова",
        date: "01-24-2002",
        phone: "8 (952) 746-99-22",
        amounts: [342, 766, 362]
    }
];
/** 1. Создайте пустой объект newClient.
 2. Запросите у пользователя по порядку все данные о клиенте - имя, фамилию, дату рождения, телефон.
 При запросе данных сохраняйте их в соответствующие свойства объекта newClient - firstName, lastName, date, phone.
 Дату запросите в формате мм-дд-гггг (месяц-день-год).
 3. В качестве свойства amounts для объекта newClient установите пустой массив.
 4. Затем создайте цикл while, который будет работать следующим образом:
 пока пользователь отвечает «ОК» на вопрос «Добавить покупку для клиента X?»
 (где X - имя клиента из объекта newClient), программа должна запрашивать сумму покупки и добавлять ее в
 массив amounts объекта newClient. Соответственно, если пользователь нажмет «Отмена»,
 программа должна прекратить выполнение цикла.
 5. Добавьте получившийся объект newClient в массив clients */

let newClient = {};
document.getElementById('clientForm').addEventListener('submit', function (event) {
    event.preventDefault();

    newClient.firstName = document.getElementById('name').value;
    newClient.lastName = document.getElementById('lastName').value;
    newClient.date = document.getElementById('birthday').value;
    newClient.phone = document.getElementById('phone').value;
    newClient.amounts = [];
    fillArrayAmounts(newClient);
    console.log(newClient)
    clients.push(newClient);
    showClientList(clients);
});

function fillArrayAmounts(client) {

    let isBuy = false;
    let sumAmount = 0;
    while (true) {
        isBuy = confirm('Добавить покупку для клиента ' + fullName(client) + '?');
        if (isBuy) {
            sumAmount = parseInt(prompt('Сумма покупки?'));
            if (!isNaN(sumAmount) && sumAmount > 0)
                client.amounts.push(sumAmount);
        } else {
            return;
        }

    }
}


/**1. Создайте функцию fullName, которая принимает объект и возвращает имя и фамилию в одной строке – «Иван Иванов». */
function fullName(client) {
    return client.firstName + ' ' + client.lastName;
}

function getBirthday(birthday) {

    let date = new Date(birthday);

    const options = {
        month: 'long',
        day: 'numeric'
    };
    let stringDate = date.toLocaleString('ru-RU', options);
    let currentDate = new Date();
    if (currentDate.getDate() === date.getDate() && currentDate.getMonth() === date.getMonth()) {
        return stringDate + ' (сегодня)';
    }
    return stringDate;
}

function getAllAmount(amounts) {
    if (amounts.length === 0) { return; }
    return amounts.reduce((sum, amount) => sum + amount);
}

function getAverageAmount(amounts) {
    if (amounts.length === 0) { return; }
    return (getAllAmount(amounts) / amounts.length).toFixed(2);
}

/** Создайте стрелочную функцию в новую переменную - showClients.
 *  Функция должна принимать один параметр - главный массив клиентов clients и для каждого клиента (в цикле)
 *  выводить сообщение “Клиент X имеет среднюю сумму чека Y. День рождения клиента: D”,
 * где X - значение результата функции fullName для текущего объекта клиента в цикле,
 *  Y - средний чек клиента на основе его покупок в массиве amounts из функции getAverageAmount,
 * а D - дата рождения клиента из функции getBirthday. Помните о том, что внутри функции вам надо р
 * аботать с переданным в неё массивом, а для каждого отдельного вызова других функций
 * в цикле передавать соответствующее значение, используя конкретный объект по индексу. */

let showClients = (clients) => clients.forEach(item => {
    console.log('Клиент ' + fullName(item) + ' имеет среднюю сумму чека ' + getAverageAmount(item.amounts) + '. День рождения клиента: ' + getBirthday(item.date));

});

showClients(clients);

try {
    showClients();
} catch (e) {
    console.log('Вызвана функция без параметров');
    console.log(e.message);
}

let bestClients = [
    {
        firstName: 'Иван',
        lastName: 'Федоров',
        date: '10-14-1997',
        phone: '8 (929) 978-97-09',
        amounts: [254, 2093, 7641, 266]
    },
    {
        firstName: "Федор",
        lastName: "Сидоров",
        date: "04-15-1977",
        phone: '8 (929) 978-95-05',
        amounts: [563, 827, 889]
    },
    {
        firstName: "Марина",
        lastName: "Третьякова",
        date: "04-22-1995",
        phone: "8 (899) 446-19-08",
        amounts: [6575, 835, 1383, 492]
    }
]

setTimeout(() => {
    showClients(bestClients);
}, 3000)

/** Создайте функцию whoSpentMore, которая определит, кто из переданных клиентов потратил больше всех.
 Описание функции: - Принимает массив объектов клиентов
 - Перебирает каждого клиента и проверяет, больше ли его сумма покупок (с помощью функции getAllAmount), чем у другого клиента.
 - В конце функция должна вывести в консоль строку: «Больше всех потратил N. Сумма покупок: X.»,
 где N - полное имя клиента (на основе функции fullName), а X - сумма покупок max.*/

function whoSpentMore(clients) {
    let sumMax = 0;
    let bestClient = {};
    let sum = 0;
    for (let item of clients) {
        sum = getAllAmount(item.amounts);
        if (sum > sumMax) {
            sumMax = sum;
            bestClient = item;
        }
    }
    let result = 'Больше всех потратил ' + fullName(bestClient) + '. Сумма покупок: ' + sumMax + '.'
    console.log(result);
    showBestClient(result)
}

whoSpentMore(clients);
whoSpentMore(bestClients);
showClientList(clients);
showClientList2(bestClients);

/** Дополнительная секция не относится к основному заданию*/
function clientsToString(clients) {
    let clientsString = [];
    clients.forEach(item => {
        clientsString.push('Клиент ' + fullName(item) + ' имеет среднюю сумму чека ' + getAverageAmount(item.amounts) + '. День рождения клиента: ' + getBirthday(item.date));
    });
    return clientsString;
}

function showClientList(clients) {
    let clientsString = clientsToString(clients);
    const clientList = document.getElementById('client-list');

    clientsString.forEach(client => {
        const listItem = document.createElement('li');
        listItem.textContent = client;
        clientList.appendChild(listItem);
    });
}

function showClientList2(clients) {
    let clientsString = clientsToString(clients);
    const clientList = document.getElementById('client-list2');

    clientsString.forEach(client => {
        const listItem = document.createElement('li');
        listItem.textContent = client;
        clientList.appendChild(listItem);
    });
}

function showBestClient(message) {
    const container = document.getElementById('best-client');
    const paragraph = document.createElement('p');
    paragraph.textContent = message;
    container.appendChild(paragraph);
}