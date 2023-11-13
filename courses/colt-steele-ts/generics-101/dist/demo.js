"use strict";
const getRandomElement2 = (list) => {
    const randomIdx = Math.floor(Math.random() * list.length);
    return list[randomIdx];
};
