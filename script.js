document.addEventListener("DOMContentLoaded", () => {
    // Load data from localStorage
    let clicks = parseInt(localStorage.getItem("clicks")) || 0;
    let clickPower = parseInt(localStorage.getItem("clickPower")) || 1;
    let cps = parseInt(localStorage.getItem("cps")) || 0;
    let upgradesPurchased = parseInt(localStorage.getItem("upgradesPurchased")) || 0;
    let megaBoostActive = false;

    // Load upgrade costs from localStorage (or default to initial values)
    let upgradeCosts = {
        upgrade1: parseInt(localStorage.getItem("upgrade1Cost")) || 10,
        upgrade2: parseInt(localStorage.getItem("upgrade2Cost")) || 50,
        upgrade3: parseInt(localStorage.getItem("upgrade3Cost")) || 100,
        upgrade4: parseInt(localStorage.getItem("upgrade4Cost")) || 250,
        upgrade5: parseInt(localStorage.getItem("upgrade5Cost")) || 500,
        upgrade6: parseInt(localStorage.getItem("upgrade6Cost")) || 1000,
        upgrade7: parseInt(localStorage.getItem("upgrade7Cost")) || 1500,
        upgrade8: parseInt(localStorage.getItem("upgrade8Cost")) || 2500,
        upgrade9: parseInt(localStorage.getItem("upgrade9Cost")) || 5000,
        upgrade10: parseInt(localStorage.getItem("upgrade10Cost")) || 10000
    };

    // DOM elements
    const clickCountEl = document.getElementById("click-count");
    const clickPowerEl = document.getElementById("click-power");
    const cpsEl = document.getElementById("cps");
    const upgradesEl = document.getElementById("upgrades");
    const bonusMessageEl = document.getElementById("bonus-message");

    // Update UI
    function updateUI() {
        clickCountEl.textContent = Math.floor(clicks);
        clickPowerEl.textContent = clickPower;
        cpsEl.textContent = cps;
        upgradesEl.textContent = upgradesPurchased;

        for (let id in upgradeCosts) {
            const costEl = document.getElementById(`${id}-cost`);
            if (costEl) costEl.textContent = upgradeCosts[id];
        }
    }

    // Save data to localStorage
    function saveData() {
        localStorage.setItem("clicks", clicks);
        localStorage.setItem("clickPower", clickPower);
        localStorage.setItem("cps", cps);
        localStorage.setItem("upgradesPurchased", upgradesPurchased);
        for (let id in upgradeCosts) {
            localStorage.setItem(`${id}Cost`, upgradeCosts[id]);
        }
    }

    // Click handler
    document.getElementById("click-button").addEventListener("click", () => {
        clicks += clickPower;
        saveData();
        updateUI();
    });

    // Upgrade logic
    function purchaseUpgrade(upgradeKey, powerIncrease, costMultiplier) {
        if (clicks >= upgradeCosts[upgradeKey]) {
            clicks -= upgradeCosts[upgradeKey];
            clickPower += powerIncrease;
            upgradeCosts[upgradeKey] = Math.floor(upgradeCosts[upgradeKey] * costMultiplier); // Exponential growth
            upgradesPurchased++;
            saveData();
            updateUI();
        }
    }

    // Each upgrade button click event
    document.getElementById("upgrade1").addEventListener("click", () => {
        purchaseUpgrade('upgrade1', 1, 1.5);
    });

    document.getElementById("upgrade2").addEventListener("click", () => {
        purchaseUpgrade('upgrade2', 5, 1.6);
    });

    document.getElementById("upgrade3").addEventListener("click", () => {
        purchaseUpgrade('upgrade3', 10, 1.8);
    });

    document.getElementById("upgrade4").addEventListener("click", () => {
        purchaseUpgrade('upgrade4', 15, 2);
    });

    document.getElementById("upgrade5").addEventListener("click", () => {
        purchaseUpgrade('upgrade5', 25, 2.5);
    });

    document.getElementById("upgrade6").addEventListener("click", () => {
        purchaseUpgrade('upgrade6', 50, 3);
    });

    document.getElementById("upgrade7").addEventListener("click", () => {
        purchaseUpgrade('upgrade7', 100, 3.5);
    });

    document.getElementById("upgrade8").addEventListener("click", () => {
        purchaseUpgrade('upgrade8', 200, 4);
    });

    document.getElementById("upgrade9").addEventListener("click", () => {
        purchaseUpgrade('upgrade9', 500, 5);
    });

    document.getElementById("upgrade10").addEventListener("click", () => {
        purchaseUpgrade('upgrade10', 1000, 6);
    });

    // Auto clicker tick
    setInterval(() => {
        clicks += cps;
        saveData();
        updateUI();
    }, 1000);

    // Initial UI
    updateUI();
});
