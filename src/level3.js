let charArray_lvl3 = [];

const chars_lvl3 = [
  { name: "Aiduthrhox", gender: "f", face: "face13", lvl: 3 },
  { name: "Iazaaralb", gender: "f", face: "face23", lvl: 3 },
  { name: "V'uirvish", gender: "f", face: "face33", lvl: 3 },
  { name: "Cxoulp'dhri", gender: "f", face: "face43", lvl: 3 },
  { name: "Yihaiothlelbh", gender: "f", face: "face53", lvl: 3 },
  { name: "Cnecn'krulb", gender: "f", face: "face53", lvl: 23 },
  { name: "Guizhid", gender: "f", face: "face53", lvl: 3 },
];

const random_female_names_lvl3 = [
  "Aiuctubresh",
  "Aiduthrhox",
  "Aiuemlurvu",
  "Iaubhyltho",
  "Iaumhidrr're",
  "Vhidrih",
  "V'ombrerh",
  "Cnecn'krulb",
  "Guizhid",
  "Iv'aiodrr'krast",
  "Iazaaralb",
  "Ghruithlisz",
  "Mh'aadrrilbh",
  "V'ibhirh",
  "V'uirvish",
  "Xogn'thi",
  "Ydaggd'dhrurh",
  "Yz'aag'dri",
  "Yaxughig",
  "Cxoulp'dhri",
  "Cxaiozt'itra",
  "Yihaiothlelbh",
];

const phrases_lvl3 = [
  ["Am I your favorite elder god?", "Yes..."],
  ["Do you dream of me?", "Oh, sure I do..."],
  ["Does the void stare back at you?", "Yes..."],
];

for (let x = 1; x <= 7; x++) {
  let face3 = "face" + x;
  loadSprite(
    chars_lvl3[x - 1].name,
    "src/sprites/lvl3_faces/" + face3 + "_level3" + ".png",
    {
      x: 0,
      y: 0,
      width: 64 * 2,
      height: 64,
      sliceX: 2,
    }
  );
}

scene("begining_lvl3", () => {
  const dialog = addDialog();

  const script = [
    "I... am... sorry... I forgott you puny humans \n\ncan't understand my native language...",
    "But fear me not my child... because you are \n\nspecial...",
    "Your new co-workerssss are waiting for you...",
    "But firsssst... let me shake your hand!",
  ];

  const boss_3 = add([
    pos(240, 250),
    origin("center"),
    sprite("boss3", { anim: "idle" }),
    scale(3.5),
    "hand",
    z(100),
  ]);
  const t = (n = 1) => time() * n;
  const w = (a, b, n) => wave(a, b, t(n));
  dialog.say("");

  const rune1 = add([
    pos(140, 62),
    color(rgb(82, 81, 83)),
    origin("center"),
    sprite("runes", { flipX: "true" }),
    scale(2),
    "runes",
    z(300),
  ]);
  const rune2 = add([
    pos(330, 68),
    color(rgb(82, 81, 83)),
    origin("center"),
    sprite("runes", { flipX: "true", flipY: "true" }),
    scale(2),
    "runes",
    z(300),
  ]);
  rune1.action(() => {
    rune1.color.r = wave(90, 255, 2 * time());
    rune1.color.g = wave(90, 255, 2 * time());
  });

  rune2.action(() => {
    rune2.color.r = wave(90, 255, 2 * time());
    rune2.color.g = wave(90, 255, 2 * time());
  });

  const cont = add([
    text("PRESS SPACE TO CONTINUE"),
    pos(width() / 2, height() / 2 + -50),
    { value: 0 },
    scale(1.5),
    origin("center"),
    "continue",
    z(500),
  ]);
  cont.action(() => {
    cont.opacity = wave(0.2, 1, time() * 5);
  });
  let script_num = 0;
  keyPress("space", () => {
    destroyAll("runes");
    if (script_num == 5 || script_num == 3) {
      shake(3);
    }
    dialog.say(script[script_num]);
    script_num += 1;

    if (script_num == script.length + 1) {
      go("mg-handshake", 3);
    }
  });
});

scene("presentation2", () => {
  check = false;
  const numOfChars = 4;
  const shuffle_chars_lvl3 = _.shuffle(chars_lvl3);
  for (let i = 0; i < numOfChars; i++) {
    let temp = new character(
      shuffle_chars_lvl3[i],
      choose(phrases_lvl3),
      shuffle_chars_lvl3[i].face,
      level
    );
    charArray_lvl3.push(temp);
  }

  let faces = [];
  const face_locations = [
    pos(80, 210),
    pos(80 * 2.4, 210),
    pos(80 * 3.6, 210),
    pos(80 * 4.9, 210),
  ];
  let presented = false;
  const dialog = addDialog();
  dialog.say("It's time to meet your work colleagues!");

  function spawnFace(f, position) {
    const face = add([
      sprite(f.name),
      scale(1),
      position,
      origin("center"),
      z(120),
      "face",
      {
        present: () => {
          dialog.say(`I am ${f.name}...`);

          face.action(() => {
            face.color = rgb(255, 255, 255);
            face.angle = wave(-0.5, 0.5, this.time() * 2);
            face.scale = wave(3, 4, this.time() * 2);
            face.z = 500;
          });

          return true;
        },

        dismiss: () => {
          face.action(() => {
            face.color = rgb(0, 0, 0);
            face.opacity = +0.8 * time();
            face.angle = wave(-0.5, 0.5, time() * 2);
            face.scale = wave(2.55, 2.6, time() * 2);
          });
        },
      },
      opacity(0),
      color(rgb(0, 0, 0)),
    ]);

    let dest = vec2(250, 210);

    face.action(() => {
      face.opacity = +0.8 * time();
      face.angle = wave(-0.5, 0.5, time() * 2);
      face.scale = wave(2.3, 2.4, time() * 2);
    });

    return face;
  }
  let done = false;
  let f_number = 0;
  for (let i = 0; i < charArray_lvl3.length; i++) {
    faces.push(spawnFace(charArray_lvl3[i], face_locations[i]));
  }
  let shown = [];

  keyPress("space", () => {
    shown.forEach((f) => {
      f.dismiss();
    });
    if (faces.length > 0) {
      let temp = faces.shift();
      temp.present();
      shown.push(temp);
    } else if (shown.length == charArray_lvl3.length) {
      go("transition", "level3");
    }

    // presented = false;
    // let temp = [];
    // if (f_number < faces.length) {
    //   temp = faces.shift();
    //   presented = temp.present();
    //   if (!presented) {
    //     temp.unpresent();
    //   }
    // }
  });

  const cont = add([
    text("PRESS SPACE TO CONTINUE"),
    pos(width() / 2, height() / 2 + 170),
    { value: 0 },
    scale(1),
    origin("center"),
    "continue",
  ]);

  cont.action(() => {
    cont.opacity = wave(0.2, 1, time() * 5);
  });
});

scene("level3", () => {
  function spawnHearts(health) {
    console.log(health);

    for (let i = 0; i < health; i++) {
      const heart = add([
        pos(40 + i * 50, 320),
        origin("center"),
        sprite("health_icon"),
        "heart",
        scale(2),
        z(100),
        area(width(0.05)),
      ]);
    }
  }

  spawnHearts(player.hp());

  counter = counter + 1;
  layers(["level3", "ui"], "level3");
  debug.clearLog();
  //debug.log("level1" + counter);

  const dialog = addDialog();

  const dirs = {
    up: UP,
    down: DOWN,
  };

  function randomGenerator(character) {
    let correctOption = character.name;
    let correctOptionIndex = 0;
    let options = [];

    if (character.gender == "f") {
      let random_names = _.sampleSize(random_female_names_lvl3, 3);

      options = _.remove(random_names, function (n) {
        return n != correctOption;
      });
      options = _.take(options, 2);
      options.push(correctOption);
      options = _.shuffle(options);

      correctOptionIndex = _.indexOf(options, correctOption);
    } else {
      let random_names = _.sampleSize(random_male_names_lvl3, 3);

      options = _.remove(random_names, function (n) {
        return n != correctOption;
      });
      options = _.take(options, 2);
      options.push(correctOption);
      options = _.shuffle(options);

      correctOptionIndex = _.indexOf(options, correctOption);
    }

    let quizData = {
      options: options,
      correctIndex: correctOptionIndex,
    };

    return quizData;

    console.log(options);
  }

  function addChoice(character) {
    const posY = height() / 2 - 60;
    const posX = 20;
    const h = 30;
    const pad = 9;
    let options = [];
    dialog.say(character.phrase);
    let data = randomGenerator(character);

    console.log(character.face);

    const face1 = add([
      sprite(character.name),
      scale(2),
      pos(380, 260),
      origin("center"),
      z(120),
    ]);

    face1.action(() => {
      face1.color = rgb(40 * time(), 40 * time(), 40 * time());
      face1.angle = wave(-1, 1, time() * 2);
      face1.scale = wave(2.95, 3.05, time() * 2);
    });

    for (let i = 0; i < 3; i++) {
      const bg = add([
        pos(posX, posY + 38 * i),
        rect(width() - 40, h),
        color(rgb(61, 60, 61)),
        outline(3, rgb(255, 255, 255)),
        "option",
        ,
        {
          clickAction: () => {
            //
            // } else {
            //   if (data.correctIndex == i) {
            //     dialog.say("Oh awesome!");
            //     face1.action(() => {
            //       face1.angle = wave(-20, 20, this.time() * 4);
            //     });
            //     add([timer(1, () => go("transition", "level1"))]);
            //   } else {
            //     face1.frame = 1;
            //     shake(3);
            //     character.face;
            //     player.hurt();
            //     destroyAll("heart");
            //     spawnHearts(player.hp());
            //     add([timer(1, () => go("transition", "level1"))]);
            //     //debug.log(player.hp());
            //   }
            // }

            if (charArray_lvl3.length === 0) {
              check = true;
            }
            if (data.correctIndex == i) {
              dialog.say("Goooood...");
              face1.action(() => {
                face1.angle = wave(-20, 20, this.time() * 4);
              });
              if (!check) add([timer(1.5, () => go("transition", "level3"))]);
              else add([timer(1, () => go("end_lvl3", "level1"))]);
            } else {
              dialog.say("Puny human...");
              face1.frame = 1;
              shake(3);
              character.face;
              if (player.hp() <= 1) {
                charArray_lvl3 = [];
                destroyAll("heart");
                add([timer(1.5, () => go("game_over_lvl3"))]);
              } else {
                player.hurt();
                destroyAll("heart");
                spawnHearts(player.hp());
                if (!check) add([timer(1.5, () => go("transition", "level3"))]);
                else add([timer(2, () => go("end_lvl3", "level3"))]);
              }
            }
          },
        },
        area(),
        z(100),
      ]);

      const txt = add([
        text(character.respone + data.options[i], {
          width: width() - 60,
        }),
        pos(posX + pad, posY + pad + 38 * i),
        scale(1),
        z(120),
      ]);
      bg.hidden = false;
      txt.hidden = false;
    }

    action("option", (b) => {
      if (b.isHovering()) {
        b.use(opacity(0.5));
      } else {
        b.use(opacity(1));
      }

      if (b.isClicked()) {
        b.clickAction();
      }
    });
  }

  let x = charArray_lvl3.splice(
    Math.floor(Math.random() * charArray_lvl3.length),
    1
  );
  console.log(charArray_lvl3.length);
  if (charArray_lvl3.length >= 0) {
    addChoice(x[0]);
  }
  // random = Math.floor(Math.random() * charArray_lvl2.length);
  // addChoice(charArray_lvl2[random]);
});
scene("end_lvl3", () => {
  const dialog = addDialog();

  const script_lvl3 = [
    "Good work...",
    "You are indeed the chosen one...",
    "You have earned your place with the old ones \n\non this floor...",
    "Are you ready to meet the nameless one?...",
  ];

  const boss_3 = add([
    pos(240, 250),
    origin("center"),
    sprite("boss3", { anim: "idle" }),
    scale(3.5),
    "hand",
    color(0, 0, 0),
    z(100),
  ]);

  boss_3.action(() => {
    boss_3.color = rgb(60 * time(), 60 * time(), 60 * time());
  });

  dialog.say("Hi there...");
  const cont = add([
    text("PRESS SPACE TO CONTINUE"),
    pos(width() / 2, height() / 2 + -50),
    { value: 0 },
    scale(1.5),
    origin("center"),
    "continue",
    z(500),
  ]);
  cont.action(() => {
    cont.opacity = wave(0.2, 1, time() * 5);
  });
  let script_num = 0;
  keyPress("space", () => {
    if (script_num == 4 || script_num == 2 || script_num == 6) {
      shake(3);
    }
    dialog.say(script_lvl3[script_num]);
    script_num += 1;

    if (script_num == script_lvl3.length + 1) {
      go("the_end");
    }
  });
});

scene("the_end", () => {
  const dialog = addDialog();
  const cont = add([
    text("PRESS SPACE TO CONTINUE"),
    pos(width() / 2, height() / 2 + -50),
    { value: 0 },
    scale(1.5),
    origin("center"),
    "continue",
    z(500),
  ]);
  cont.action(() => {
    cont.opacity = wave(0.2, 1, time() * 5);
  });
  dialog.say("..i..am..the..void...");
  const hand = add([
    pos(-180, 170),
    sprite("hand", { anim: "idle" }),
    scale(3),
    z(100),
    area(width(0.05)),
    opacity(1),
  ]);
  const bosshand = add([
    pos(380, 210),
    sprite("nameless", { anim: "idle" }),
    scale(3),
    "boss",
    area(scale(0.5)),
    origin("center"),
  ]);

  keyPress("space", () => {
    dialog.say("It is time you join me in the void...");

    hand.action(() => {
      shake(2);
      hand.moveTo(300, 10, 50);
      hand.opacity -= 0.2 * dt();
      if (hand.opacity <= 0) {
        shake(0);
        go("the_end2");
      }
    });
  });

  // hand.action(() => {
  //   hand.move(150, -90);
  // });
  // bosshand.action(() => {
  //   bosshand.move(-100, 60);
  // });
});

scene("the_end2", () => {
  const dialog = addDialog();

  const bosshand = add([
    pos(380, 210),
    sprite("nameless", { anim: "idle" }),
    scale(3),
    "boss",
    area(scale(0.5)),
    origin("center"),
  ]);

  const end = add([
    text("End game"),
    pos(width() / 2, height() / 2 + 150),
    { value: 0 },
    scale(2),
    area(),
    "button",
    {
      clickAction: () => {
        go("credits");
      },
    },
    origin("center"),
    layer("ui"),
    color(),
  ]);

  end.hidden = true;

  bosshand.action(() => {
    bosshand.moveTo(width() / 2, height() / 2 + 40, 20);
    bosshand.scale = wave(3, 5, time());
    bosshand.angle = wave(-5, 5, time());
    if (bosshand.pos.x == 240) {
      dialog.say(
        "You have done a great job... \n\nNow it's your time to rest in the void..."
      );
      end.hidden = false;
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

  keyPress("space", () => {
    dialog.say("It is time you join me in the void...");
  });
});

scene("credits", () => {
  add([
    text("Thanks for playing"),
    pos(width() / 2, height() / 2 - 120),
    origin("center"),
    scale(3),
    color(rgb(241, 239, 255)),
  ]);
  add([
    text("a GAME BY"),
    pos(width() / 2, height() / 2 - 70),
    origin("center"),
    scale(2),
    color(rgb(210, 0, 0)),
  ]);
  add([
    text("Erik Gimbergsson"),
    pos(width() / 2, height() / 2 - 40),
    origin("center"),
    scale(2),
  ]);
  add([
    text("with ART BY"),
    pos(width() / 2, height() / 2 + 15),
    origin("center"),
    scale(2),
    color(rgb(210, 0, 0)),
  ]);
  add([
    text("Erik Gimbergsson\n\nLisa Palman"),
    pos(width() / 2, height() / 2 + 60),
    origin("center"),
    scale(2),
  ]);

  const end = add([
    text("back to menu"),
    pos(width() / 2, height() / 2 + 150),
    { value: 0 },
    scale(2),
    area(),
    "button",
    {
      clickAction: () => {
        go("menu");
      },
    },
    origin("center"),
    layer("ui"),
    color(),
  ]);

  action("button", (b) => {
    if (b.isHovering()) {
      b.use(scale(2.5));
      b.use(color(rgb(255, 170, 255)));
    } else {
      b.use(color(rgb(255, 0, 243)));
      b.use(scale(2));
      b.use(opacity(1));
    }

    if (b.isClicked()) {
      b.clickAction();
    } else {
    }
  });
});

scene("game_over_lvl3", () => {
  const dialog = addDialog();

  const script = [
    "I knew you humans were not ready for this \n\nkind of work...",
    "You will never learn the secrets of this \n\nworld...",
    "You're...",
    "FIRED!!!!",
  ];

  const boss_3 = add([
    pos(240, 250),
    origin("center"),
    sprite("boss3", { anim: "idle" }),
    scale(3.5),
    color(0, 0, 0),
    "hand",
    z(100),
  ]);
  dialog.say("....");
  const cont = add([
    text("PRESS SPACE TO CONTINUE"),
    pos(width() / 2, height() / 2 + -50),
    { value: 0 },
    scale(1.5),
    origin("center"),
    "continue",
    z(500),
  ]);
  cont.action(() => {
    cont.opacity = wave(0.2, 1, time() * 5);
  });
  let script_num = 0;
  keyPress("space", () => {
    render(() => {
      boss_3.color = rgb(50 * time(), 50 * time(), 50 * time());
    });
    if (script_num == 3) {
      shake(3);
    }
    dialog.say(script[script_num]);
    script_num += 1;

    if (script_num == script.length + 1) {
      go("credits");
    }
  });
});
