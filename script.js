document.addEventListener("DOMContentLoaded", () => {
  let clicks = parseInt(localStorage.getItem("clicks")) || 0;
  let totalClicks = parseInt(localStorage.getItem("totalClicks")) || 0;
  let clickPower = parseInt(localStorage.getItem("clickPower")) || 1;
  let cps = parseInt(localStorage.getItem("cps")) || 0;
  let upgradesPurchased = parseInt(localStorage.getItem("upgradesPurchased")) || 0;
  let prestige = parseInt(localStorage.getItem("prestige")) || 0;

  const achievements = JSON.parse(localStorage.getItem("achievements")) || {
    "100clicks": false,
    "1000clicks": false,
    "10ktotal": false
  };

  const multiplier = 1 + prestige;

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

  const boxCosts = {
    basic: 500,
    epic: 2000,
    legendary: 8000,
  };

  const clickEl = document.getElementById("click-count");
  const powerEl = document.getElementById("click-power");
  const cpsEl = document.getElementById("cps");
  const upgradesEl = document.getElementById("upgrades");
  const prestigeEl = document.getElementById("prestige");
  const multiplierEl = document.getElementById("multiplier");
  const lootboxResult = document.getElementById("lootbox-result");

  const achvEls = {
    "100clicks": document.getElementById("achv-100-clicks"),
    "1000clicks": document.getElementById("achv-1000-clicks"),
    "10ktotal": document.getElementById("achv-10k-total"),
  };

  function updateUI() {
    clickEl.textContent = Math.floor(clicks);
    powerEl.textContent = clickPower;
    cpsEl.textContent = cps;
    upgradesEl.textContent = upgradesPurchased;
    prestigeEl.textContent = prestige;
    multiplierEl.textContent = `${multiplier}x`;

    for (let id in upgradeCosts) {
      const costEl = document.getElementById(`${id}-cost`);
      if (costEl) costEl.textContent = upgradeCosts[id];
    }

    document.getElementById("basic-cost").textContent = boxCosts.basic;
    document.getElementById("epic-cost").textContent = boxCosts.epic;
    document.getElementById("legendary-cost").textContent = boxCosts.legendary;

    // Update achievements
    for (let key in achievements) {
      if (achievements[key] && achvEls[key]) {
        achvEls[key].textContent = "✅ " + achvEls[key].textContent.split(" - ")[0] + " - UNLOCKED!";
      }
    }
  }

  function save() {
    localStorage.setItem("clicks", clicks);
    localStorage.setItem("totalClicks", totalClicks);
    localStorage.setItem("clickPower", clickPower);
    localStorage.setItem("cps", cps);
    localStorage.setItem("upgradesPurchased", upgradesPurchased);
    localStorage.setItem("prestige", prestige);
    localStorage.setItem("achievements", JSON.stringify(achievements));
    for (let id in upgradeCosts) {
      localStorage.setItem(`${id}Cost`, upgradeCosts[id]);
    }
  }

  function checkAchievements() {
    if (!achievements["100clicks"] && clicks >= 100) {
      achievements["100clicks"] = true;
      clickPower += 5;
      alert("Achievement unlocked: 100 Clicks! +5 Click Power");
    }

    if (!achievements["1000clicks"] && clicks >= 1000) {
      achievements["1000clicks"] = true;
      clickPower += 10;
      alert("Achievement unlocked: 1,000 Clicks! +10 Click Power");
    }

    if (!achievements["10ktotal"] && totalClicks >= 10000) {
      achievements["10ktotal"] = true;
      // simulate free epic box
      clicks += 1000;
      alert("Achievement unlocked: 10,000 Total Clicks! +1 Epic Box (1,000 Clicks)");
    }

    save();
    updateUI();
  }

  document.getElementById("click-button").addEventListener("click", () => {
    const gained = clickPower * multiplier;
    clicks += gained;
    totalClicks += gained;
    checkAchievements();
    save();
    updateUI();
  });

  function buyUpgrade(id, amount, type, factor = 1.5) {
    if (clicks >= upgradeCosts[id]) {
      clicks -= upgradeCosts[id];
      if (type === "clickPower") clickPower += amount;
      else cps += amount;
      upgradesPurchased++;
      upgradeCosts[id] = Math.floor(upgradeCosts[id] * factor);
      save();
      updateUI();
    }
  }

  for (let i = 1; i <= 5; i++) {
    document.getElementById(`upgrade${i}`).addEventListener("click", () =>
      buyUpgrade(`upgrade${i}`, [1, 5, 10, 25, 50][i - 1], "clickPower", 1.4 + i * 0.1)
    );
    document.getElementById(`autoclick${i}`).addEventListener("click", () =>
      buyUpgrade(`autoclick${i}`, [1, 5, 10, 25, 50][i - 1], "cps", 1.4 + i * 0.1)
    );
  }

  function openBox(type) {
    const cost = boxCosts[type];
    if (clicks < cost) {
      lootboxResult.textContent = "Not enough clicks!";
      return;
    }

    clicks -= cost;
    let reward = 0;
    let msg = "";

    if (type === "basic") {
      reward = Math.floor(Math.random() * 300) + 100;
      clicks += reward;
      msg = `You got ${reward} clicks from a Basic Box!`;
    } else if (type === "epic") {
      const rand = Math.random();
      if (rand < 0.5) {
        reward = Math.floor(Math.random() * 500) + 250;
        clicks += reward;
        msg = `Epic reward: +${reward} clicks!`;
      } else {
        const boost = Math.floor(Math.random() * 4) + 1;
        clickPower += boost;
        msg = `Epic reward: +${boost} click power!`;
      }
    } else {
      const rand = Math.random();
      if (rand < 0.33) {
        const big = Math.floor(Math.random() * 1000) + 1000;
        clicks += big;
        msg = `LEGENDARY: +${big} clicks! 🔥`;
      } else if (rand < 0.66) {
        const boost = Math.floor(Math.random() * 6) + 2;
        clickPower += boost;
        msg = `LEGENDARY: +${boost} click power! 💥`;
      } else {
        const auto = Math.floor(Math.random() * 6) + 2;
        cps += auto;
        msg = `LEGENDARY: +${auto} CPS! 🚀`;
      }
    }

    lootboxResult.textContent = msg;
    save();
    updateUI();
  }

  document.getElementById("basic-box").addEventListener("click", () => openBox("basic"));
  document.getElementById("epic-box").addEventListener("click", () => openBox("epic"));
  document.getElementById("legendary-box").addEventListener("click", () => openBox("legendary"));

  document.getElementById("prestige-button").addEventListener("click", () => {
    if (clicks >= 100000) {
      prestige++;
      clicks = 0;
      totalClicks = 0;
      clickPower = 1;
      cps = 0;
      upgradesPurchased = 0;
      for (let id in upgradeCosts) {
        upgradeCosts[id] = {
          upgrade1: 10,
          upgrade2: 50,
          upgrade3: 150,
          upgrade4: 500,
          upgrade5: 1200,
          autoclick1: 100,
          autoclick2: 300,
          autoclick3: 1000,
          autoclick4: 2500,
          autoclick5: 6000,
        }[id];
      }
      save();
      location.reload();
    } else {
      alert("You need 100,000 clicks to Prestige!");
    }
  });

  setInterval(() => {
    clicks += cps * multiplier;
    totalClicks += cps * multiplier;
    checkAchievements();
    save();
    updateUI();
  }, 1000);

  updateUI();
});
