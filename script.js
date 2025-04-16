document.addEventListener("DOMContentLoaded", () => {
    let clicks = parseInt(localStorage.getItem("clicks")) || 0;
    let clickPower = parseInt(localStorage.getItem("clickPower")) || 1;
    let cps = parseInt(localStorage.getItem("cps")) || 0;
    let upgradesPurchased = parseInt(localStorage.getItem("upgradesPurchased")) || 0;
    let lootboxCost = parseInt(localStorage.getItem("lootboxCost")) || 750;

    const clickCountEl = document.getElementById("click-count");
    const clickPowerEl = document.getElementById("click-power");
    const cpsEl = document.getElementById("cps");
    const upgradesEl = document.getElementById("upgrades");
    const lootboxCostEl = document.getElementById("lootbox-cost");
    const lootboxResultEl = document.getElementById("lootbox-result");

    const upgradeCosts = {
        upgrade1: parseInt(localStorage.getItem("upgrade1Cost")) || 10,
        upgrade2: parseInt(localStorage.getItem("upgrade2Cost")) || 50,
        upgrade3: parseInt(localStorage.getItem("upgrade3Cost")) || 150,
        upgrade4: parseInt(localStorage.getItem("upgrade4Cost")) || 500,
        upgrade5: parseInt(localStorage.getItem("upgrade5Cost")) || 1200,
        autoclick1: parseInt(localStorage.getItem("autoclick1Cost")) || 100,
        autoclick2: parseInt(localStorage.getItem("autoclick2Cost")) || 300,
        autoclick3: parseInt(localStorage.getItem("autoclick3Cost")) || 1000,
        autoclick4: parseInt(localStorage.getItem("autoclick4Cost")) || 2500,
        autoclick5: parseInt(localStorage.getItem("autoclick5Cost")) || 6000,
    };

    function updateUI() {
        clickCountEl.textContent = Math.floor(clicks);
        clickPowerEl.textContent = clickPower;
        cpsEl.textContent = cps;
        upgradesEl.textContent = upgradesPurchased;

        for (let id in upgradeCosts) {
            const el = document.getElementById(`${id}-cost`);
            if (el) el.textContent = upgradeCosts[id];
        }

        lootboxCostEl.textContent = lootboxCost;
    }

    function save() {
        localStorage.setItem("clicks", clicks);
        localStorage.setItem("clickPower", clickPower);
        localStorage.setItem("cps", cps);
        localStorage.setItem("upgradesPurchased", upgradesPurchased);
        localStorage.setItem("lootboxCost", lootboxCost);

        for (let id in upgradeCosts) {
            localStorage.setItem(`${id}Cost`, upgradeCosts[id]);
        }
    }

    document.getElementById("click-button").addEventListener("click", () => {
        clicks += clickPower;
        save();
        updateUI();
    });

    function purchaseUpgrade(id, value, type, multiplier = 1.5) {
        if (clicks >= upgradeCosts[id]) {
            clicks -= upgradeCosts[id];
            if (type === "clickPower") clickPower += value;
            else if (type === "cps") cps += value;
            upgradeCosts[id] = Math.floor(upgradeCosts[id] * multiplier);
            upgradesPurchased++;
            save();
            updateUI();
        }
    }

    // Click Power Upgrades
    document.getElementById("upgrade1").addEventListener("click", () => purchaseUpgrade("upgrade1", 1, "clickPower", 1.5));
    document.getElementById("upgrade2").addEventListener("click", () => purchaseUpgrade("upgrade2", 5, "clickPower", 1.6));
    document.getElementById("upgrade3").addEventListener("click", () => purchaseUpgrade("upgrade3", 10, "clickPower", 1.7));
    document.getElementById("upgrade4").addEventListener("click", () => purchaseUpgrade("upgrade4", 25, "clickPower", 1.8));
    document.getElementById("upgrade5").addEventListener("click", () => purchaseUpgrade("upgrade5", 50, "clickPower", 2));

    // Auto Clicker Upgrades
    document.getElementById("autoclick1").addEventListener("click", () => purchaseUpgrade("autoclick1", 1, "cps", 1.5));
    document.getElementById("autoclick2").addEventListener("click", () => purchaseUpgrade("autoclick2", 5, "cps", 1.6));
    document.getElementById("autoclick3").addEventListener("click", () => purchaseUpgrade("autoclick3", 10, "cps", 1.7));
    document.getElementById("autoclick4").addEventListener("click", () => purchaseUpgrade("autoclick4", 25, "cps", 1.8));
    document.getElementById("autoclick5").addEventListener("click", () => purchaseUpgrade("autoclick5", 50, "cps", 2));

    // Loot Box Upgrade
    document.getElementById("lootbox").addEventListener("click", () => {
        if (clicks >= lootboxCost) {
            clicks -= lootboxCost;
            upgradesPurchased++;

            const rewardType = Math.floor(Math.random() * 3);
            let rewardMessage = "";

            if (rewardType === 0) {
                const bonus = Math.floor(Math.random() * 401) + 100;
                clicks += bonus;
                rewardMessage = `🎉 You received ${bonus} clicks!`;
            } else if (rewardType === 1) {
                const bonus = Math.floor(Math.random() * 5) + 1;
                clickPower += bonus;
                rewardMessage = `⚡ You received +${bonus} Click Power!`;
            } else {
                const bonus = Math.floor(Math.random() * 5) + 1;
                cps += bonus;
                rewardMessage = `🤖 You received +${bonus} CPS!`;
            }

            lootboxCost = Math.floor(lootboxCost * 1.5);
            lootboxResultEl.textContent = rewardMessage;

            save();
            updateUI();
        } else {
            lootboxResultEl.textContent = "Not enough clicks to open!";
        }
    });

    // Auto-clicking effect
    setInterval(() => {
        clicks += cps;
        save();
        updateUI();
    }, 1000);

    updateUI();
});
