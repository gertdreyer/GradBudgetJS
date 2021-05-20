let data = {};

const sendHTTP = async (url, methodType, data) => {
    if (!!url && (!!data || methodType == "GET")) {
        return await fetch(url, {
            method: methodType,
            body: methodType != "GET" ? JSON.stringify(data) : undefined,
            headers: { "Content-Type": "application/json" },
        });
    }
    return false;
};

sendHTTP("/budgetChartData", "GET", true).then((res) => {
    res.json().then((res1) => {
        console.log(res1);
        data = res1;
        const config = {
            type: "line",
            data,
            option: {},
        };
        // eslint-disable-next-line
        const budgetchart = new Chart(
            document.getElementById("budgetchart"),
            config
        );
    });
});
