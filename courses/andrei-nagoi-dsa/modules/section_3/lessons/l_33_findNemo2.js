export const l_33_findNemo2 = () => {
  const nemo = ["nemo"]
  const everyone = ['dory', 'bruce', 'marlin', 'nemo', 'gill', 'bloat', 'nigel', 'squirt', 'darla', 'hank'];
  const large = new Array(100_000).fill('nemo');

  function findNemo(array) {
    let t0 = performance.now()
    for (let i = 0; i < array.length; i++) {
      if (array[i] === "nemo") {
        console.log("Found Nemo!")
      }
    }
    let t1 = performance.now()
    console.log(`Call to find Nemo took ${t1 - t0} milliseconds`)
  }

  findNemo(large) //* O(n) --> Linear Time
}
