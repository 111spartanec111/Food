const postData = async (url, data) => {   /* async Внутри функции будет асинхронный код */
    const res = await fetch(url, {       /* await ждёт результата запроса того что ниже */
        method:"POST",       /* Если проммис попадает на ошибку которая связана с http протоколом, то он не будет ошибочным(reject). */
        headers: {            /* reject будет возникать только при отсутствии сети Offline */
            'Content-type': 'application/json' 
        },
        body: data
    });
    return await res.json();  /* await ждёт выполнения функции */
};


/* Отправка данных из db.json на сайт  GET */
const getResource = async (url) => {   /* async Внутри функции будет асинхронный код */
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);  /* Создаём ошибку вручную, если запрос не выполнился */
    }
    return await res.json();  /* await ждёт выполнения функции */
};

export {postData};
export {getResource};