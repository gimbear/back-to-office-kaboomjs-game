const bosshands_array = ["bosshand", "bosshand2", "bosshand3"];
scene("mg-handshake", (level) => {
  let x = 1;
  debug.clearLog();
  //debug.log("minigame-handshake");

  console.log(level);

  let difficulty = [50, 25, 10];
  let speed = [9, 12, 15];
  let score_intervall = [[]];
  let stage = level - 1;
  let score = add([text(`Score: 0`), { value: 0 }]);

  let score_value = 0;
  let score_multiplier = 0;

  const hand = add([
    pos(-180, 170),
    sprite("hand", { anim: "idle" }),
    scale(3),
    "hand",
  ]);
  const bosshand = add([
    pos(280, -90),
    sprite(bosshands_array[stage], { anim: "idle" }),
    "boss",
    scale(2),
    area(),
  ]);

  add([text("It's imporant to make a good impression..."), pos(10, 40)]);
  add([text("Give your new boss a firm and accurate handshake!"), pos(10, 55)]);
  const cont = add([
    text("PRESS SPACE TO CONTINUE"),
    pos(width() / 2, height() / 2),
    { value: 0 },
    scale(1),
    origin("center"),
    "continue",
  ]);

  cont.action(() => {
    cont.opacity = wave(0.2, 1, time() * 5);
  });

  const posX1 = 400;
  const posY1 = 330;

  const posX2 = 430;
  const posY2 = 342;

  let pBar = add([
    pos(posX1, posY1),
    rect(-200, 12),
    scale(),
    "powerbar",
    color(255, 21, 68),
    z(10),
  ]);
  add([
    pos(posX1, posY1),
    rect(-200, 12),
    scale(),
    "powerbar",
    opacity(0.2),
    color(rgb(255, 21, 68)),
    z(100),
  ]);

  let aBarGoal = add([
    pos(posX2, posY2 - 190),
    rect(15, 14 + difficulty[stage]),
    scale(),
    opacity(0.5),
    "powerbar-goal",
    color(rgb(255, 255, 255)),
    z(11),
  ]);

  let aBar = add([
    pos(posX2, posY2),
    rect(15, -200),
    scale(),
    "powerbar",
    color(rgb(22, 91, 255)),
  ]);
  add([
    pos(posX2, posY2),
    rect(15, -200),
    scale(),
    "powerbar",
    opacity(0.2),
    color(rgb(169, 166, 171)),
  ]);

  add([text("POWER"), pos(285, 332), z(150)]);
  let a = add([text("ACCURACY"), pos(413, 125)]);

  // let start = true;
  // let start2 = false;

  let start1 = true;
  let start2 = false;

  action(() => {
    if (keyIsReleased("space") && x == 1) {
      if (!start2) {
        action(() => {
          if (start1) {
            hand.move(
              -wave(-180, 180, time() * 4),
              wave(-180, 180, time() * 4)
            );
            pBar.width = wave(-200, 0, time() * speed[stage]);
          } else {
            pBar.width = pBar.width;
            score_value = -pBar.width / 2;
          }
        });
      }

      x += 1;
    } else if (keyIsPressed("space") && x == 2) {
      start1 = false;
      start2 = true;

      pBar.action(() => {
        if (start2) {
          hand.move(wave(-50, 50, time() * 5), 0);
          hand.scale = wave(2, 3, time() * 5);
          aBar.height = -wave(0, 200, time() * (speed[stage] - 3));
        } else {
          if (-aBar.height > 176 - difficulty[stage] && -aBar.height < 190) {
            score_multiplier = 4;
          } else score_multiplier = 2;
          aBar.height = aBar.height;
        }
      });

      x += 1;
    } else if (keyIsPressed("space") && x == 3) {
      start2 = false;
    }

    if (!start1 && !start2)
      add([
        timer(1, () =>
          go(
            "mg-hanskake-score",
            stage,
            Math.round(score_value * score_multiplier),
            score_multiplier
          )
        ),
      ]);
  });
});

scene("mg-hanskake-score", (level, score, score_multiplier) => {
  let stage = level;
  console.log("presentation" + stage);
  const hand = add([
    pos(-180, 170),
    sprite("hand", { anim: "idle" }),
    scale(3),
    z(100),
    area(width(0.05)),
  ]);
  const bosshand = add([
    pos(280, -90),
    sprite(bosshands_array[stage], { anim: "idle" }),
    scale(2),
    "boss",
    area(scale(0.5)),
  ]);

  hand.action(() => {
    hand.move(150, -90);
  });
  bosshand.action(() => {
    bosshand.move(-100, 60);
  });

  hand.collides("boss", () => {
    destroy(hand);
    destroy(bosshand);

    const start = add([
      text("continue"),
      pos(width() / 2, height() / 2 + 150),
      { value: 0 },
      scale(2),
      area(),
      "button",
      {
        clickAction: () => {
          console.log("presentation" + stage.toString());
          go("presentation" + stage.toString());
        },
      },
      origin("center"),
      layer("ui"),
      color(),
    ]);

    if (score <= 190) {
      add([
        text(`Weak handshake... disgusting...\n\n\n\nScore: ${score} `),
        pos(width() / 2, height() / 2),
        origin("center"),
        scale(2),
      ]);
    } else if (score >= 190 && score_multiplier != 4) {
      add([
        text(
          `You have a mediocre handshake... \n\nYou need to get better accuracy... \n\n\n\nScore: ${score} `
        ),
        pos(width() / 2, height() / 2),
        origin("center"),
        scale(2),
      ]);
    } else {
      player.heal(1);
      add([
        text(
          `A great handshake! \n\nYou're gonna go far kid!\n\n\n\nScore: ${score}`
        ),
        pos(width() / 2, height() / 2),
        origin("center"),
        scale(2),
      ]);
      add([
        text("You've gained +1 health"),
        pos(width() / 2, height() / 2 + 100),
        origin("center"),
        scale(1),
        color(rgb(255, 19, 25)),
      ]);
    }
  });

  action("button", (b) => {
    if (b.isHovering()) {
      b.use(scale(2.5));
      b.use(color(255, 68, 73));
    } else {
      b.use(color(255, 255, 255));
      b.use(scale(2));
      b.use(opacity(1));
    }

    if (b.isClicked()) {
      b.clickAction();
    } else {
    }
  });
});
