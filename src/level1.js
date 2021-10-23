let check = false;
let charArray_lvl1 = [];

const chars_lvl1 = [
  { name: "Sarah", gender: "f", face: "face11", lvl: 1 },
  { name: "Mike", gender: "m", face: "face21", lvl: 1 },
  { name: "Bob", gender: "m", face: "face31", lvl: 1 },
  { name: "Marie", gender: "f", face: "face41", lvl: 1 },
  { name: "Elyse", gender: "f", face: "face51", lvl: 1 },
  { name: "Luna", gender: "f", face: "face61", lvl: 1 },
  { name: "Lisa", gender: "f", face: "face71", lvl: 1 },
  // ["Luna", "f"],
];
const random_female_names = [
  "Sarah",
  "Cathrine",
  "Andrea",
  "Sandra",
  "Lisa",
  "Luna",
];

const random_male_names = ["Richard", "Carl", "Arnold", "Simon", "Jonathan"];

for (let x = 1; x <= 7; x++) {
  let face = "face" + x;
  loadSprite(
    chars_lvl1[x - 1].name,
    "src/sprites/lvl1_faces/" + face + ".png",
    {
      x: 0,
      y: 0,
      width: 64 * 2,
      height: 64,
      sliceX: 2,
    }
  );
}

console.log();

const phrases_lvl1 = [
  ["Hi how are you?", "I'm doing great, how about you... "],
  ["How is work going so far?", "I'm doing great, thanks for asking... "],
  ["Will you have lunch with me later?", "I would love too... "],
];

if (player.hp() <= 0) {
  go("credits");
}

scene("presentation0", () => {
  check = false;
  const numOfChars = 3;
  const shuffle_chars_lvl1 = _.shuffle(chars_lvl1);
  for (let i = 0; i < numOfChars; i++) {
    let temp = new character(
      shuffle_chars_lvl1[i],
      choose(phrases_lvl1),
      shuffle_chars_lvl1[i].face,
      level
    );
    charArray_lvl1.push(temp);
  }

  let faces = [];
  const face_locations = [pos(100, 210), pos(240, 210), pos(380, 210)];
  let presented = false;
  const dialog = addDialog();
  dialog.say("It's time to meet your work colleagues!");

  function spawnFace(f, position) {
    console.log(f.face);
    const face = add([
      sprite(f.name),
      scale(2),
      position,
      origin("center"),
      z(120),
      "face",
      {
        present: () => {
          dialog.say(`Hi! My name is ${f.name}...`);

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
      face.scale = wave(2.55, 2.6, time() * 2);
    });

    return face;
  }
  let done = false;
  let f_number = 0;
  for (let i = 0; i < charArray_lvl1.length; i++) {
    faces.push(spawnFace(charArray_lvl1[i], face_locations[i]));
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
    } else if (shown.length == charArray_lvl1.length) {
      go("transition", "level1");
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
let counter = 0;
scene("level1", () => {
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
      let random_names = _.sampleSize(random_female_names, 3);

      options = _.remove(random_names, function (n) {
        return n != correctOption;
      });
      options = _.take(options, 2);
      options.push(correctOption);
      options = _.shuffle(options);

      correctOptionIndex = _.indexOf(options, correctOption);
    } else {
      let random_names = _.sampleSize(random_male_names, 3);

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

            if (charArray_lvl1.length === 0) {
              check = true;
            }
            if (data.correctIndex == i) {
              dialog.say("Oh awesome!");
              face1.action(() => {
                face1.angle = wave(-20, 20, this.time() * 4);
              });
              if (!check) add([timer(1.5, () => go("transition", "level1"))]);
              else add([timer(1, () => go("end_lvl1", "level1"))]);
            } else {
              dialog.say("Hey! That's not my name!");
              face1.frame = 1;
              shake(3);
              character.face;
              if (player.hp() <= 1) {
                charArray_lvl1 = [];
                destroyAll("heart");
                add([timer(1.5, () => go("game_over_lvl1"))]);
              } else {
                player.hurt();
                destroyAll("heart");
                spawnHearts(player.hp());
                if (!check) add([timer(1.5, () => go("transition", "level1"))]);
                else add([timer(2, () => go("end_lvl1", "level1"))]);
              }
              //debug.log(player.hp());
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

  let x = charArray_lvl1.splice(
    Math.floor(Math.random() * charArray_lvl1.length),
    1
  );
  console.log(charArray_lvl1.length);
  if (charArray_lvl1.length >= 0) {
    addChoice(x[0]);
  }
  // random = Math.floor(Math.random() * charArray_lvl1.length);
  // addChoice(charArray_lvl1[random]);
});

scene("end_lvl1", () => {
  const dialog = addDialog();

  const script = [
    "Wow, you did an amazing job on your first \n\nday!",
    "The people upstairs has taken interest in \n\nyou...",
    "They want to promote you to work on the next \n\nfloor!",
    "Congratulations!",
    "Don't screw this opportunity up! \n\nAnd remember...",
    "DON'T FORGET YOUR CO-WORKERS NAMES!!!",
  ];

  const boss_1 = add([
    pos(240, 250),
    origin("center"),
    sprite("boss1", { anim: "idle" }),
    scale(3.5),
    color(0, 0, 0),
    "hand",
    z(100),
  ]);

  dialog.say("Hi there!");
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
      boss_1.color = rgb(50 * time(), 50 * time(), 50 * time());
    });
    if (script_num == 5 || script_num == 3) {
      shake(3);
    }
    dialog.say(script[script_num]);
    script_num += 1;

    if (script_num == script.length + 1) {
      go("begining_lvl2");
    }
  });
});

scene("game_over_lvl1", () => {
  const dialog = addDialog();

  const script = [
    "I've gotten multiple complaints about you \n\nfrom my staff...",
    "I am are really disapointed in you...",
    "You're...",
    "FIRED!!!!",
  ];

  const boss_1 = add([
    pos(240, 250),
    origin("center"),
    sprite("boss1", { anim: "idle" }),
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
      boss_1.color = rgb(50 * time(), 50 * time(), 50 * time());
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
