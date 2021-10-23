kaboom({
  width: 480,
  height: 360,
  scale: 2,
  letterbox: true,
  font: "sink",
  background: [16, 15, 16],
  pos: "center",
});

debug.inspect = false;

loadSpriteAtlas("src/sprites/long-hand.png", {
  hand: {
    x: 0,
    y: 0,
    width: 128 * 3,
    height: 128,
    sliceX: 3,
    anims: {
      idle: { from: 0, to: 2, speed: 5, loop: true },
    },
  },
});

loadSpriteAtlas("src/sprites/lvl1_faces/long-hand2.png", {
  bosshand: {
    x: 0,
    y: 0,
    width: 128 * 3,
    height: 128,
    sliceX: 3,
    anims: {
      idle: { from: 0, to: 2, speed: 5, loop: true },
    },
  },
});

loadSpriteAtlas("src/sprites/lvl2_faces/long-hand_lvl2.png", {
  bosshand2: {
    x: 0,
    y: 0,
    width: 128 * 4,
    height: 128,
    sliceX: 4,
    anims: {
      idle: { from: 0, to: 3, speed: 5, loop: true },
    },
  },
});

loadSpriteAtlas("src/sprites/lvl1_faces/boss_face1.png", {
  boss1: {
    x: 0,
    y: 0,
    width: 64 * 3,
    height: 64,
    sliceX: 3,
    anims: {
      idle: { from: 0, to: 2, speed: 5, loop: true },
    },
  },
});

loadSpriteAtlas("src/sprites/anon-sheet.png", {
  anon: {
    x: 0,
    y: 0,
    width: 64 * 4,
    height: 64,
    sliceX: 4,
    anims: {
      idle: { from: 0, to: 2, speed: 5, loop: true },
    },
  },
});

loadSpriteAtlas("src/sprites/lvl2_faces/boss_2.png", {
  boss2: {
    x: 0,
    y: 0,
    width: 64 * 4,
    height: 64,
    sliceX: 4,
    anims: {
      idle: { from: 0, to: 2, speed: 3, loop: true },
    },
  },
});

loadSpriteAtlas("src/sprites/lvl3_faces/boss_3.png", {
  boss3: {
    x: 0,
    y: 0,
    width: 80 * 4,
    height: 64,
    sliceX: 4,
    anims: {
      idle: { from: 0, to: 2, speed: 3, loop: true },
    },
  },
});

loadSpriteAtlas("src/sprites/lvl3_faces/long-hand2_lvl3.png", {
  bosshand3: {
    x: 0,
    y: 0,
    width: 128 * 6,
    height: 128,
    sliceX: 6,
    anims: {
      idle: { from: 0, to: 3, speed: 5, loop: true },
    },
  },
});

loadSpriteAtlas("src/sprites/lvl3_faces/Nameless-one.png", {
  nameless: {
    x: 0,
    y: 0,
    width: 64 * 7,
    height: 64,
    sliceX: 7,
    anims: {
      idle: { from: 0, to: 6, speed: 8, loop: true },
    },
  },
});

loadSpriteAtlas("src/sprites/transition-sheet.png", {
  transition: {
    x: 0,
    y: 0,
    width: 80 * 3,
    height: 64,
    sliceX: 3,
    anims: {
      idle: { from: 0, to: 2, speed: 3, loop: true },
    },
  },
});

loadSprite("runes", "src/sprites/runes.png");
loadSprite("palm", "src/sprites/palm.png");

var level = 1;
var myTime = time();
const player = add([health(2), "player"]);

// loadSprite("face1", "src/sprites/face1.png");
// loadSprite("face2", "src/sprites/face2.png");
// loadSprite("face3", "src/sprites/face3.png");
loadSprite("health_icon", "src/sprites/hearth.png");

function character(character, phrase, face, lvl) {
  var presented = false;
  this.name = character.name;
  this.gender = character.gender;
  this.phrase = phrase[0];
  this.respone = phrase[1];
  this.face = face;
  this.lvl = lvl;

  this.present = function () {
    this.presented = true;
  };
  this.isPresented = function () {
    return presented;
  };
}

function addDialog() {
  const posY = height() / 2 - 160;
  const posX = 20;
  const h = 90;
  const pad = 15;
  const bg = add([
    pos(posX, posY),
    rect(width() - 40, h),
    color(rgb(61, 60, 61)),
    outline(5, rgb(255, 255, 255)),
    z(100),
  ]);
  const txt = add([
    text("", {
      width: width() - 60,
    }),
    pos(posX + pad, posY + pad),
    scale(1.5),
    z(120),
  ]);
  bg.hidden = true;
  txt.hidden = true;
  return {
    say(t) {
      txt.text = t;
      bg.hidden = false;
      txt.hidden = false;
    },
    dismiss() {
      if (!this.active()) {
        return;
      }
      txt.text = "";
      bg.hidden = true;
      txt.hidden = true;
    },
    active() {
      return !bg.hidden;
    },
    destroy() {
      bg.destroy();
      txt.destroy();
    },
  };
}

scene("introduction", () => {
  const boss_1 = add([
    pos(240, 250),
    origin("center"),
    sprite("boss1", { anim: "idle" }),
    scale(3.5),
    "hand",
    z(100),
  ]);

  const dialog = addDialog();

  const script = [
    "I'm you're new boss! I've heard good things about you...",
    "It's important to make a good impression on \n\nyour new co-workers!",
    "I will soon introduce you to your collegues, \n\nplease try to...",
    "REMEMBER THEIR NAMES!!!!",
    "Let's shake hands on that!",
  ];

  dialog.say("Hi there and welcome to your new workplace!");
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
  let script_num = 1;
  keyPress("space", () => {
    if (script_num == 3) {
      shake(3);
    }
    dialog.say(script[script_num]);
    script_num += 1;

    if (script_num == script.length + 1) {
      go("mg-handshake", 1);
    }
  });
});
