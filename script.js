const logInput = document.getElementById("logInput");
const analyzeButton = document.getElementById("analyzeButton");

const totalLogs = document.getElementById("totalLogs");
const failedLogins = document.getElementById("failedLogins");
const successfulLogins = document.getElementById("successfulLogins");
const uniqueIPs = document.getElementById("uniqueIPs");
const alertMessage = document.getElementById("alertMessage");

const suspiciousIPs =
    document.getElementById("suspiciousIPs");
analyzeButton.addEventListener("click", function () {

    const logs = logInput.value
        .trim()
        .split("\n")
        .filter(line => line.trim() !== "");

    let failed = 0;
    let successful = 0;

    const ips = new Set();
    const failedByIP = {};

    logs.forEach(function (log) {
        const suspicious = Object.keys(failedByIP)
    .filter(ip => failedByIP[ip] >= 3);

if (suspicious.length > 0) {

    suspiciousIPs.textContent =
        `Suspicious IPs: ${suspicious.join(", ")}`;

} else {

    suspiciousIPs.textContent =
        "Suspicious IPs: None";
}

      if (log.includes("FAILED")) {

    failed++;

    const ipMatch = log.match(
        /\b(?:\d{1,3}\.){3}\d{1,3}\b/
    );

    if (ipMatch) {

        const ip = ipMatch[0];

        failedByIP[ip] =
            (failedByIP[ip] || 0) + 1;
    }
}

        if (log.includes("SUCCESS")) {
            successful++;
        }

        const ipMatch = log.match(
            /\b(?:\d{1,3}\.){3}\d{1,3}\b/
        );

        if (ipMatch) {
            ips.add(ipMatch[0]);
        }
    });

    totalLogs.textContent =
        `Total Events: ${logs.length}`;

    failedLogins.textContent =
        `Failed Logins: ${failed}`;

    successfulLogins.textContent =
        `Successful Logins: ${successful}`;

    uniqueIPs.textContent =
        `Unique IPs: ${ips.size}`;

    if (failed >= 5) {

    alertMessage.textContent =
        "🚨 CRITICAL: High number of failed login attempts!";

    alertMessage.className = "critical";

} else if (failed >= 3) {

    alertMessage.textContent =
        "⚠️ WARNING: Multiple failed login attempts detected.";

    alertMessage.className = "warning";

} else {

    alertMessage.textContent =
        "🟢 NORMAL: No suspicious login activity detected.";

    alertMessage.className = "normal";
}
});
