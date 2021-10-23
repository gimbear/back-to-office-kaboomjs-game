scene("transition", (level) => {
  const cubicle = add([
    pos(-0, 100),
    sprite("transition", { anim: "idle" }),
    scale(4),
    "hand",
    z(100),
  ]);

  const anon = add([
    pos(-90, -10),
    sprite("anon", { anim: "idle" }),
    scale(2.5),
    "anon",
    z(50),
  ]);

  anon.action(() => {
    anon.moveTo(140, -10, 80);
  });
  const warning_background = add([
    rect(150, 40),
    outline(4),
    z(120),
    area(),
    color(rgb(197, 19, 54)),
    pos(width() / 2, height() / 2 - 15),
    { value: 0 },
    scale(2),
    origin("center"),
  ]);

  const warning = add([
    text("WARNING! \n\nNEW COWOKER APROACHING"),
    pos(width() / 2, height() / 2 - 15),
    { value: 0 },
    scale(2),
    origin("center"),
    z(150),
  ]);

  warning.action(() => {
    warning.scale = wave(2, 2.3, this.time() * 2);
    warning.opacity = wave(0.3, 1, this.time() * 10);
  });

  warning_background.action(() => {
    shake(1);
    warning_background.scale = wave(2, 2.3, this.time() * 2);
    warning_background.color = rgb(wave(15, 255, this.time() * 5), 0, 0);
  });

  action("anon", (a) => {
    if (a.pos.x == 140) {
      add([timer(0.5, () => go(level))]);
    }
  });
});
