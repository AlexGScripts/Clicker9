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
        upgrade6: parseInt(localStorage.getItem("upgrade6Cost")) || 1000
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
        localStorage.setItem("upgrade1Cost", upgradeCosts.upgrade1);
        localStorage.setItem("upgrade2Cost", upgradeCosts.upgrade2);
        localStorage.setItem("upgrade3Cost", upgradeCosts.upgrade3);
        localStorage.setItem("upgrade4Cost", upgradeCosts.upgrade4);
        localStorage.setItem("upgrade5Cost", upgradeCosts.upgrade5);
        localStorage.setItem("upgrade6Cost", upgradeCosts.upgrade6);
    }

    // Click handler
    document.getElementById("click-button").addEventListener("click", () => {
        clicks += clickPower;
        saveData();
        updateUI();
    });

    // Upgrade logic
    document.getElementById("upgrade1").addEventListener("click", () => {
        if (clicks >= upgradeCosts.upgrade1) {
            clicks -= upgradeCosts.upgrade1;
            clickPower += 1;
            upgradeCosts.upgrade1 = Math.floor(upgradeCosts.upgrade1 * 1.5); // Exponential growth
            upgradesPurchased++;
            saveData();
            updateUI();
        }
    });

    document.getElementById("upgrade2").addEventListener("click", () => {
        if (clicks >= upgradeCosts.upgrade2) {
            clicks -= upgradeCosts.upgrade2;
            clickPower += 5;
            upgradeCosts.upgrade2 = Math.floor(upgradeCosts.upgrade2 * 1.6); // Exponential growth
            upgradesPurchased++;
            saveData();
            updateUI();
        }
    });

    document.getElementById("upgrade3").addEventListener("click", () => {
        if (clicks >= upgradeCosts.upgrade3) {
            clicks -= upgradeCosts.upgrade3;
            cps += 1;
            upgradeCosts.upgrade3 = Math.floor(upgradeCosts.upgrade3 * 2); // Exponential growth
            upgradesPurchased++;
            saveData();
            updateUI();
        }
    });

    document.getElementById("upgrade4").addEventListener("click", () => {
        if (clicks >= upgradeCosts.upgrade4) {
            clicks -= upgradeCosts.upgrade4;
            clickPower *= 2;
            upgradeCosts.upgrade4 = Math.floor(upgradeCosts.upgrade4 * 3); // Exponential growth
            upgradesPurchased++;
            saveData();
            updateUI();
        }
    });

    document.getElementById("upgrade5").addEventListener("click", () => {
        if (clicks >= upgradeCosts.upgrade5 && !megaBoostActive) {
            clicks -= upgradeCosts.upgrade5;
            const originalPower = clickPower;
            clickPower *= 10;
            megaBoostActive = true;
            bonusMessageEl.textContent = "🔥 Mega Boost Active (30s)!";
            setTimeout(() => {
                clickPower = originalPower;
                bonusMessageEl.textContent = "No bonus active.";
                megaBoostActive = false;
                saveData();
                updateUI();
            }, 30000);
            upgradeCosts.upgrade5 = Math.floor(upgradeCosts.upgrade5 * 2); // Exponential growth
            upgradesPurchased++;
            saveData();
            updateUI();
        }
    });

    document.getElementById("upgrade6").addEventListener("click", () => {
        if (clicks >= upgradeCosts.upgrade6) {
            clicks -= upgradeCosts.upgrade6;
            let reward = Math.floor(Math.random() * 200) + 100;
            clicks += reward;
            bonusMessageEl.textContent = `🎁 Bonus Chest Opened! You got ${reward} clicks!`;
            upgradeCosts.upgrade6 = Math.floor(upgradeCosts.upgrade6 * 2.5); // Exponential growth
            upgradesPurchased++;
            saveData();
            updateUI();
        }
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
