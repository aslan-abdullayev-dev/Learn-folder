var myEnum;
(function (myEnum) {
    myEnum["aslan"] = "1";
    myEnum[myEnum["cavidan"] = 0] = "cavidan";
    myEnum[myEnum["etibar"] = 1] = "etibar";
})(myEnum || (myEnum = {}));
console.log(myEnum[0]);
