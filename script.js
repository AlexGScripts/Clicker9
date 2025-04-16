document.addEventListener("DOMContentLoaded", () => {
    let clicks = 0;
    let clickPower = 1;
    let cps = 0;
    let upgradesPurchased = 0;
    let megaBoostActive = false;

    // DOM elements
    const clickCountEl = document.getElementById("click-count");
    const clickPowerEl = document.getElementById("click-power");
    const cpsEl = document.getElementById("cps");
    const upgradesEl = document.getElementById("upgrades");
    const bonusMessageEl = document.getElementById("bonus-message");

    // Upgrade costs
    let upgradeCosts = {
        upgrade1: 10,
        upgrade2: 50,
        upgrade3: 100,
        upgrade4: 250,
        upgrade5: 500,
        upgrade6: 1000
    };

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

    // Click handler
    document.getElementById("click-button").addEventListener("click", () => {
        clicks += clickPower;
        updateUI();
    });

    // Upgrade logic
    document.getElementById("upgrade1").addEventListener("click", () => {
        if (clicks >= upgradeCosts.upgrade1) {
            clicks -= upgradeCosts.upgrade1;
            clickPower += 1;
            upgradeCosts.upgrade1 = Math.floor(upgradeCosts.upgrade1 * 1.5);
            upgradesPurchased++;
            updateUI();
        }
    });

    document.getElementById("upgrade2").addEventListener("click", () => {
        if (clicks >= upgradeCosts.upgrade2) {
            clicks -= upgradeCosts.upgrade2;
            clickPower += 5;
            upgradeCosts.upgrade2 = Math.floor(upgradeCosts.upgrade2 * 1.6);
            upgradesPurchased++;
            updateUI();
        }
    });

    document.getElementById("upgrade3").addEventListener("click", () => {
        if (clicks >= upgradeCosts.upgrade3) {
            clicks -= upgradeCosts.upgrade3;
            cps += 1;
            upgradeCosts.upgrade3 = Math.floor(upgradeCosts.upgrade3 * 2);
            upgradesPurchased++;
            updateUI();
        }
    });

    document.getElementById("upgrade4").addEventListener("click", () => {
        if (clicks >= upgradeCosts.upgrade4) {
            clicks -= upgradeCosts.upgrade4;
            clickPower *= 2;
            upgradeCosts.upgrade4 = Math.floor(upgradeCosts.upgrade4 * 3);
            upgradesPurchased++;
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
                updateUI();
            }, 30000);
            upgradeCosts.upgrade5 = Math.floor(upgradeCosts.upgrade5 * 2);
            upgradesPurchased++;
            updateUI();
        }
    });

    document.getElementById("upgrade6").addEventListener("click", () => {
        if (clicks >= upgradeCosts.upgrade6) {
            clicks -= upgradeCosts.upgrade6;
            let reward = Math.floor(Math.random() * 200) + 100;
            clicks += reward;
            bonusMessageEl.textContent = `🎁 Bonus Chest Opened! You got ${reward} clicks!`;
            upgradeCosts.upgrade6 = Math.floor(upgradeCosts.upgrade6 * 2.5);
            upgradesPurchased++;
            updateUI();
        }
    });

    // Auto clicker tick
    setInterval(() => {
        clicks += cps;
        updateUI();
    }, 1000);

    // Initial UI
    updateUI();
});
