// Function derives an n-parasitic number, where k is greater than or equal to n
function findNParasiticNumber(n, k) {
    let newK = k;
    while(true){     
        let temp = n * newK;

        // Ensure we only shift if temp is a BigInt with two digits or more
        if(temp.toString().length > 1){
            let derived = discardMsd(temp);
            let shift = derived * 10n + k
            
            // Error Handle issue when the derived number equals the derivation source
            if(newK == shift){
                newK = temp * 10n + k;
            }
            else{
                newK = shift;
            }
        }
        // If temp only has one digit, do not shift
        else{
            newK = temp * 10n + k;
        }

        // Check if function has found the parasitic number
        let arranged = convertLsdToMsd(newK);
        if(n * newK == arranged){
            return newK;
        }
    }
}

// Function discards the most significant digit of a BigInt
function discardMsd(number) {
    const numberString = number.toString();
    const result = BigInt(numberString.substring(1));
    return result;
}

// Function moves the least significant digit to become the most significant digit of a BigInt
function convertLsdToMsd(original) {
    let temp = original.toString();
    let lsdOg = temp[temp.length - 1];

    return BigInt(lsdOg + temp.substring(0, temp.length - 1));
}

//Calling findNParasiticNumber(2n, 2n) derives the smallest positive integer that: 
//When we move least significant digit to become the most significant digit, the new integer is exactly double the original integer
let test = findNParasiticNumber(2n, 2n); 
console.log(test.toString());