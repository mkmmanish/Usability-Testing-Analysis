let results = [];

function showRating() {
    let rating = document.getElementById("rating").value;
    document.getElementById("ratingValue").textContent = rating;
}

function addResult() {

    const name = document.getElementById("name").value;
    const scenario = document.getElementById("scenario").value;
    const completion = document.getElementById("completion").value;
    const time = Number(document.getElementById("time").value);
    const rating = Number(document.getElementById("rating").value);
    const feedback = document.getElementById("feedback").value;

    if (!name || !scenario || !time || !feedback) {
        alert("Please fill in all fields.");
        return;
    }

    const result = {
        name: name,
        scenario: scenario,
        completion: completion,
        time: time,
        rating: rating,
        feedback: feedback
    };

    results.push(result);

    displayResults();
    updateMetrics();
    updateSuggestions();

    document.getElementById("name").value = "";
    document.getElementById("scenario").value = "";
    document.getElementById("time").value = "";
    document.getElementById("feedback").value = "";
}

function displayResults() {

    const table = document.getElementById("resultsTable");

    table.innerHTML = "";

    results.forEach(result => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${result.name}</td>
            <td>${result.scenario}</td>
            <td>${result.completion == 1 ? "Yes" : "No"}</td>
            <td>${result.time} sec</td>
            <td>${result.rating}/5</td>
            <td>${result.feedback}</td>
        `;

        table.appendChild(row);
    });
}

function updateMetrics() {

    const total = results.length;

    if (total === 0) {
        return;
    }

    const completed = results.filter(
        result => result.completion == 1
    ).length;

    const successRate = (completed / total) * 100;

    const totalTime = results.reduce(
        (sum, result) => sum + result.time, 0
    );

    const averageTime = totalTime / total;

    const totalRating = results.reduce(
        (sum, result) => sum + result.rating, 0
    );

    const averageRating = totalRating / total;

    document.getElementById("participants").textContent = total;

    document.getElementById("successRate").textContent =
        successRate.toFixed(1) + "%";

    document.getElementById("averageTime").textContent =
        averageTime.toFixed(1) + " sec";

    document.getElementById("averageRating").textContent =
        averageRating.toFixed(1) + "/5";
}

function updateSuggestions() {

    const suggestions = document.getElementById("suggestions");

    suggestions.innerHTML = "";

    if (results.length === 0) {
        suggestions.innerHTML =
            "<li>Add usability test results to generate suggestions.</li>";
        return;
    }

    const completed = results.filter(
        result => result.completion == 1
    ).length;

    const successRate = (completed / results.length) * 100;

    const averageRating =
        results.reduce((sum, result) => sum + result.rating, 0)
        / results.length;

    if (successRate < 80) {
        suggestions.innerHTML +=
            "<li>Improve navigation and make important actions easier to find.</li>";
    }

    if (averageRating < 3.5) {
        suggestions.innerHTML +=
            "<li>Simplify the interface and improve visual clarity.</li>";
    }

    const averageTime =
        results.reduce((sum, result) => sum + result.time, 0)
        / results.length;

    if (averageTime > 60) {
        suggestions.innerHTML +=
            "<li>Reduce the number of steps required to complete tasks.</li>";
    }

    suggestions.innerHTML +=
        "<li>Continue testing with additional users to validate improvements.</li>";
}

function generateReport() {

    if (results.length === 0) {
        alert("Please add at least one test result.");
        return;
    }

    const completed = results.filter(
        result => result.completion == 1
    ).length;

    const successRate =
        (completed / results.length) * 100;

    const averageTime =
        results.reduce((sum, result) => sum + result.time, 0)
        / results.length;

    const averageRating =
        results.reduce((sum, result) => sum + result.rating, 0)
        / results.length;

    document.getElementById("report").innerHTML = `
        <h3>Usability Analysis Report</h3>
        <p><strong>Total Participants:</strong> ${results.length}</p>
        <p><strong>Task Success Rate:</strong> ${successRate.toFixed(1)}%</p>
        <p><strong>Average Task Time:</strong> ${averageTime.toFixed(1)} seconds</p>
        <p><strong>Average Ease-of-Use Rating:</strong> ${averageRating.toFixed(1)}/5</p>
        <p><strong>Recommendation:</strong>
        Use the collected feedback to simplify navigation,
        reduce task completion time, and improve the overall
        user experience.</p>
    `;
}