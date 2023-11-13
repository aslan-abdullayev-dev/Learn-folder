const getRandomElement2 = <T,> /*trailing coma*/(list: T[]): T => {
    const randomIdx = Math.floor(Math.random() * list.length);
    return list[randomIdx];
}