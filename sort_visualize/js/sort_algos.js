async function selsort(randoms) {
    number = randoms.length;
    for (i = 0; i < number-1; i++)
    {  
        // Find the minimum element in unsorted array  
        min_idx = i;  
        for (j = i+1; j < number; j++)  {
            await sleep(50);
            paint(randoms,i,j);
            if (randoms[j] < randoms[min_idx])  
                min_idx = j;  
        }

        // Swap the found minimum element with the first element  
        var temp = randoms[min_idx];
        randoms[min_idx] = randoms[i];
        randoms[i] = temp;
        await sleep(50);
        paint(randoms,i,min_idx);
    }
    await sleep(500);
    paint(randoms);
}


async function bubble(randoms) {
    number = randoms.length;
    var i, j, temp;
    for (i = 0; i < number-1; i++) {
        for (j = 0; j < number-i-1; j++) {
            await sleep(100);
            paint(randoms,i,j);
            if (randoms[j] > randoms[j+1]) {
                temp = randoms[j];
                randoms[j] = randoms[j+1];
                randoms[j+1] = temp;
                await sleep(100);
                paint(randoms,j,j+1);
            }
        }
    }
    await sleep(500);
    paint(randoms);
}