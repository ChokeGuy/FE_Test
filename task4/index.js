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

    const evenPrefixSums = [];
    const oddPrefixSums = [];
    let evenSum = 0;
    let oddSum = 0;

    for (let value of inputData) {
      if (value % 2 === 0) evenSum += value;
      else oddSum += value;
      evenPrefixSums.push(evenSum);
      oddPrefixSums.push(oddSum);
    }

    const results = query.map(({ type, range: [l, r] }) => {
      let totalEvenSum = evenPrefixSums[r];
      let totalOddSum = oddPrefixSums[r];
      if (l > 0) {
        totalEvenSum -= evenPrefixSums[l - 1];
        totalOddSum -= oddPrefixSums[l - 1];
      }

      if (type === "1") return totalEvenSum + totalOddSum;
      if (type === "2") return totalEvenSum - totalOddSum;
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
