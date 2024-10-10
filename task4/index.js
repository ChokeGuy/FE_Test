async function processData() {
  try {
    const response = await fetch(
      "https://test-share.shub.edu.vn/api/intern-test/input"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const { token, data: inputData, query } = data;

    const evenPosPrefixSums = [];
    const oddPosPrefixSums = [];
    let evenPosSum = 0;
    let oddPosSum = 0;

    for (let index in inputData) {
      if (index % 2 === 0) evenPosSum += inputData[index];
      else oddPosSum += inputData[index];
      evenPosPrefixSums.push(evenPosSum);
      oddPosPrefixSums.push(oddPosSum);
    }

    const results = query.map(({ type, range: [l, r] }) => {
      let totalEvenSum = evenPosPrefixSums[r];
      let totalOddSum = oddPosPrefixSums[r];
      if (l > 0) {
        totalEvenSum -= evenPosPrefixSums[l - 1];
        totalOddSum -= oddPosPrefixSums[l - 1];
      }

      if (type === "1") return totalEvenSum + totalOddSum;
      if (type === "2") {
        return l % 2 === 0
          ? totalEvenSum - totalOddSum
          : totalOddSum - totalEvenSum;
      }
    });

    const outputResponse = await fetch(
      "https://test-share.shub.edu.vn/api/intern-test/output",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(results),
      }
    );

    if (!outputResponse.ok) {
      throw new Error(`HTTP error! status: ${outputResponse.status}`);
    }

    const result = await outputResponse.json();
    console.log("Results sent successfully:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

processData();