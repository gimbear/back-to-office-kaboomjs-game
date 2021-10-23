let charArray_lvl2 = [];

const chars_lvl2 = [
  { name: "Daegel", gender: "m", face: "face12", lvl: 2 },
  { name: "Desdemona", gender: "f", face: "face22", lvl: 2 },
  { name: "Griffin", gender: "m", face: "face32", lvl: 2 },
  { name: "Azrail", gender: "m", face: "face42", lvl: 2 },
  { name: "Morrigan", gender: "f", face: "face52", lvl: 2 },
];

const random_female_names_lvl2 = [
  "Narkissa",
  "Desdemona",
  "Nerezza",
  "Tisiphone",
  "Persephone",
  "Layal",
  "Samara",
  "Agrona",
  "Kiara",
  "Morrigan",
];

const random_male_names_lvl2 = [
  "Daegel",
  "Griffin",
  "Azrail",
  "Revon",
  "Claec",
  "Foghlaidh",
  "Dracul",
  "Marduk",
];

const phrases_lvl2 = [
  ["Have you sensed something strange yet?", "Yes... What's going on?..."],
  ["Will you join us for the dark mass later?", "Oh, sure I would love too..."],
  [
    "Have you been having dark nightmares lately?",
    "Yes.. terrifying nightmares... ",
  ],
];

for (let x = 1; x <= 5; x++) {
  let face2 = "face" + x;
  loadSprite(
    chars_lvl2[x - 1].name,
    "src/sprites/lvl2_faces/" + face2 + "_level2" + ".png",
    {
      x: 0,
      y: 0,
      width: 64 * 2,
      height: 64,
      sliceX: 2,
    }
  );
}

scene("begining_lvl2", () => {
  const dialog = addDialog();

  const script = [
    "I'm your new boss... Pleassssed to meet you...",
    "We have heard great thingssss... about you...",
    "I ssssincerely hope you will like it here on \n\nour office floor...",
    "Your new co-workerssss are waiting for you...",
    "But firsssst... let me shake your hand!",
  ];

  const boss_2 = add([
    pos(240, 250),
    origin("center"),
    sprite("boss2", { anim: "idle" }),
    scale(3.5),
    color(0, 0, 0),
    "hand",
    z(100),
  ]);

  dialog.say("Greetings worker! ");
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
      boss_2.color = rgb(50 * time(), 50 * time(), 50 * time());
    });
    if (script_num == 6 || script_num == 4) {
      shake(3);
    }
    dialog.say(script[script_num]);
    script_num += 1;

    if (script_num == script.length + 1) {
      go("mg-handshake", 2);
    }
  });
});

scene("presentation1", () => {
  check = false;
  const numOfChars = 4;
  const shuffle_chars_lvl2 = _.shuffle(chars_lvl2);
  for (let i = 0; i < numOfChars; i++) {
    let temp = new character(
      shuffle_chars_lvl2[i],
      choose(phrases_lvl2),
      shuffle_chars_lvl2[i].face,
      level
    );
    charArray_lvl2.push(temp);
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
          dialog.say(`Salutations... You can call me ${f.name}...`);

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
  for (let i = 0; i < charArray_lvl2.length; i++) {
    faces.push(spawnFace(charArray_lvl2[i], face_locations[i]));
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
    } else if (shown.length == charArray_lvl2.length) {
      go("transition", "level2");
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

scene("level2", () => {
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
  layers(["level1", "ui"], "level1");
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
      let random_names = _.sampleSize(random_female_names_lvl2, 3);

      options = _.remove(random_names, function (n) {
        return n != correctOption;
      });
      options = _.take(options, 2);
      options.push(correctOption);
      options = _.shuffle(options);

      correctOptionIndex = _.indexOf(options, correctOption);
    } else {
      let random_names = _.sampleSize(random_male_names_lvl2, 3);

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

            if (charArray_lvl2.length === 0) {
              check = true;
            }
            if (data.correctIndex == i) {
              dialog.say("Goooood...");
              face1.action(() => {
                face1.angle = wave(-20, 20, this.time() * 4);
              });
              if (!check) add([timer(1.5, () => go("transition", "level2"))]);
              else add([timer(1, () => go("end_lvl2", "level1"))]);
            } else {
              dialog.say("*ANGRY HISSSSSS*");
              face1.frame = 1;
              shake(3);
              character.face;
              if (player.hp() <= 1) {
                charArray_lvl2 = [];
                destroyAll("heart");
                add([timer(1.5, () => go("game_over_lvl2"))]);
              } else {
                player.hurt();
                destroyAll("heart");
                spawnHearts(player.hp());
                if (!check) add([timer(1.5, () => go("transition", "level2"))]);
                else add([timer(2, () => go("end_lvl2", "level2"))]);
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

  let x = charArray_lvl2.splice(
    Math.floor(Math.random() * charArray_lvl2.length),
    1
  );
  console.log(charArray_lvl2.length);
  if (charArray_lvl2.length >= 0) {
    addChoice(x[0]);
  }
  // random = Math.floor(Math.random() * charArray_lvl2.length);
  // addChoice(charArray_lvl2[random]);
});
scene("end_lvl2", () => {
  const dialog = addDialog();

  const script_lvl2 = [
    "You have performed well over our... \n\nexpectationsssss...",
    "My masterssssss have sssseen your \n\ntrue potetial...",
    "There are whispersss saying you might be...\n\nthe choosssssen one...",
    "They want to promote you to work on the next \n\nfloor!",
    "...I am jealoussss!",
    "Don't disssssapoint me! \n\nAnd remember...",
    "DON'T FORGET YOUR CO-WORKERS NAMES!!!",
  ];

  const boss_2 = add([
    pos(240, 250),
    origin("center"),
    sprite("boss2", { anim: "idle" }),
    scale(3.5),
    "hand",
    color(0, 0, 0),
    z(100),
  ]);

  dialog.say("Salutations...");
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
      boss_2.color = rgb(50 * time(), 50 * time(), 50 * time());
    });

    if (script_num == 4 || script_num == 2 || script_num == 6) {
      shake(3);
    }
    dialog.say(script_lvl2[script_num]);
    script_num += 1;

    if (script_num == script_lvl2.length + 1) {
      go("begining_lvl3");
    }
  });
});

scene("game_over_lvl2", () => {
  const dialog = addDialog();

  const script = [
    "How could you...",
    "I am really dissssapointed in you....",
    "You're...",
    "FIRED!!!!",
  ];

  const boss_2 = add([
    pos(240, 250),
    origin("center"),
    sprite("boss2", { anim: "idle" }),
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
      boss_2.color = rgb(50 * time(), 50 * time(), 50 * time());
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
