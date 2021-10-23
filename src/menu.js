scene("menu", () => {
  debug.clearLog();
  //debug.log("menu");
  const title = add([
    text("Back to the Office", { size: 12 }),
    pos(width() / 2, height() / 2 - 70),
    { value: 0 },
    scale(2),
    color(),
    origin("center"),
  ]);

  const start = add([
    text("start", { size: 16 }),
    pos(width() / 2, height() / 2 + 10),
    { value: 0 },
    scale(),
    area(),
    "button",
    {
      clickAction: () => {
        go("introduction");
        //debug.log("hi");
      },
    },
    origin("center"),
    layer("ui"),
    color(),
  ]);

  const palm = add([
    sprite("palm"),
    z(-1),
    pos(width() / 2 - 140, height() / 2 + 90),
    scale(3),
    origin("center"),
  ]);

  const palm2 = add([
    sprite("palm", { flipX: "true" }),
    z(-1),
    pos(width() / 2 + 140, height() / 2 + 90),
    scale(3),
    origin("center"),
  ]);

  palm.action(() => {
    palm.scale = wave(3, 3.1, time());
    palm.angle = wave(-1, 1, time());
    palm2.scale = wave(3, 3.1, time());
    palm2.angle = wave(-1, 1, time() * 1.2);
  });

  const about = add([
    text("about"),
    pos(width() / 2, height() / 2 + 60),
    { value: 0 },
    scale(2),
    area(),
    "button",
    {
      clickAction: () => {
        go("about");
      },
    },
    origin("center"),
    layer("ui"),
    color(),
  ]);

  action("button", (b) => {
    if (b.isHovering()) {
      b.use(scale(3));
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

scene("instructions", () => {
  //debug.log("instructions");
});
scene("about", () => {
  //debug.log("about");
});

go("menu", 1);
