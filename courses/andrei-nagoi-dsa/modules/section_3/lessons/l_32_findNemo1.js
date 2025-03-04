export const l_32_findNemo1 = () => {
  const nemo = ["nemo"]

  function findNemo(array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === "nemo") {
        console.log("Found Nemo!")
      }
    }
  }

  findNemo(nemo)
}
