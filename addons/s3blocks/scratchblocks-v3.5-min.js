(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function (require, module, exports) {
        "use strict";
        function makeCanvas() {
          return document.createElement("canvas");
        }
        var scratchblocks = (window.scratchblocks = module.exports = require("./lib/")(window, makeCanvas)),
          style = scratchblocks.makeStyle();
        document.head.appendChild(style);
      },
      { "./lib/": 6 },
    ],
    2: [
      function (require, module, exports) {
        "use strict";
        module.exports = (function () {
          function c(J, K) {
            return Object.assign({}, K, J);
          }
          function d(J) {
            var K = J.split(B).filter(function (L) {
              return !!L;
            });
            return {
              spec: J,
              parts: K,
              inputs: K.filter(function (L) {
                return y.test(L);
              }),
              hash: e(J),
            };
          }
          function e(J) {
            return f(J.replace(z, " _ "));
          }
          function f(J) {
            return J.replace(/_/g, " _ ")
              .replace(/ +/g, " ")
              .replace(/[,%?:]/g, "")
              .replace(/ß/g, "ss")
              .replace(/ä/g, "a")
              .replace(/ö/g, "o")
              .replace(/ü/g, "u")
              .replace(". . .", "...")
              .replace(/^…$/, "...")
              .trim()
              .toLowerCase();
          }
          function g(J, K) {
            var L = (K.blocksByHash = {});
            Object.keys(K.commands).forEach(function (M) {
              var N = K.commands[M],
                O = E[M],
                P = e(N);
              L[P] = O;
              var Q = A.exec(M);
              if (Q) {
                var R = Q[0],
                  S = P.replace(R, G[R]);
                L[S] = O;
              }
            }),
              (K.nativeAliases = {}),
              Object.keys(K.aliases).forEach(function (M) {
                var N = K.aliases[M],
                  O = E[N],
                  P = e(M);
                (L[P] = O), (K.nativeAliases[N] = M);
              }),
              (K.nativeDropdowns = {}),
              Object.keys(K.dropdowns).forEach(function (M) {
                var N = K.dropdowns[M];
                K.nativeDropdowns[N] = M;
              }),
              (K.code = J),
              (H[J] = K);
          }
          function h(J) {
            Object.keys(J).forEach(function (K) {
              g(K, J[K]);
            });
          }
          function j(J, K, L) {
            D[J].specialCase = D[K].specialCase = function func(N, O, P) {
              return D[L(O, P) ? J : K];
            };
          }
          var r = [
              "motion",
              "looks",
              "sound",
              "pen",
              "variables",
              "list",
              "events",
              "control",
              "sensing",
              "operators",
              "custom",
              "custom-arg",
              "extension",
              "oldextension",
              "music",
              "video",
              "microbit",
              "ev3",
              "wedo",
              "tts",
              "makeymakey",
              "translate",
              "grey",
              "obsolete",
            ],
            s = ["hat", "cap", "stack", "boolean", "reporter", "ring"],
            u = require("./commands.js"),
            v = {
              0: "obsolete",
              1: "motion",
              2: "looks",
              3: "sound",
              4: "pen",
              5: "events",
              6: "control",
              7: "sensing",
              8: "operators",
              9: "variables",
              10: "custom",
              11: "parameter",
              12: "list",
              20: "extension",
              42: "grey",
            },
            w = {
              " ": "stack",
              b: "boolean",
              c: "c-block",
              e: "if-block",
              f: "cap",
              h: "hat",
              r: "reporter",
              cf: "c-block cap",
              else: "celse",
              end: "cend",
              ring: "ring",
            },
            y = /(%[a-zA-Z](?:\.[a-zA-Z0-9]+)?)/,
            z = new RegExp(y.source, "g"),
            A = /(@[a-zA-Z]+)/,
            B = new RegExp([y.source, "|", A.source, "| +"].join(""), "g"),
            C = /^#(?:[0-9a-fA-F]{3}){1,2}?$/,
            D = {},
            E = {},
            F = u.map(function (J) {
              var K = c(d(J[0]), {
                shape: w[J[1]],
                category: v[J[2] % 100],
                selector: J[3],
                hasLoopArrow: -1 < ["doRepeat", "doUntil", "doForever"].indexOf(J[3]),
              });
              return K.selector && !D[K.selector] && (D[K.selector] = K), (E[K.spec] = K);
            }),
            G = {
              "@greenFlag": "\u2691",
              "@turnRight": "\u21BB",
              "@turnLeft": "\u21BA",
              "@addInput": "\u25B8",
              "@delInput": "\u25C2",
            },
            H = {},
            I = {
              aliases: {
                "turn left %n degrees": "turn @turnLeft %n degrees",
                "turn ccw %n degrees": "turn @turnLeft %n degrees",
                "turn right %n degrees": "turn @turnRight %n degrees",
                "turn cw %n degrees": "turn @turnRight %n degrees",
                "when gf clicked": "when @greenFlag clicked",
                "when flag clicked": "when @greenFlag clicked",
                "when green flag clicked": "when @greenFlag clicked",
                clear: "erase all",
              },
              define: ["define"],
              ignorelt: ["when distance"],
              math: [
                "abs",
                "floor",
                "ceiling",
                "sqrt",
                "sin",
                "cos",
                "tan",
                "asin",
                "acos",
                "atan",
                "ln",
                "log",
                "e ^",
                "10 ^",
              ],
              osis: ["other scripts in sprite", "other scripts in stage"],
              dropdowns: {},
              commands: {},
            };
          return (
            F.forEach(function (J) {
              I.commands[J.spec] = J.spec;
            }),
            h({ en: I }),
            j("computeFunction:of:", "getAttribute:of:", function (J, K) {
              var L = J[0];
              if (L.isInput) {
                var M = L.value;
                return -1 < K.math.indexOf(M);
              }
            }),
            j("lineCountOfList:", "stringLength:", function (J) {
              var L = J[J.length - 1];
              return L.isInput ? "dropdown" === L.shape : void 0;
            }),
            j("penColor:", "setPenHueTo:", function (J) {
              var L = J[J.length - 1];
              return (L.isInput && L.isColor) || L.isBlock;
            }),
            (D.stopScripts.specialCase = function (J, K, L) {
              var M = K[K.length - 1];
              if (M.isInput) {
                var N = M.value;
                if (-1 < L.osis.indexOf(N)) return c(D.stopScripts, { shape: "stack" });
              }
            }),
            {
              loadLanguages: h,
              blockName: function (J) {
                for (var M, K = [], L = 0; L < J.children.length; L++) {
                  if (((M = J.children[L]), !M.isLabel)) return;
                  K.push(M.value);
                }
                return K.join(" ");
              },
              allLanguages: H,
              lookupDropdown: function (J, K) {
                for (var M, L = 0; L < K.length; L++)
                  if (((M = K[L]), M.nativeDropdowns.hasOwnProperty(J))) {
                    var N = M.nativeDropdowns[J];
                    return N;
                  }
              },
              hexColorPat: C,
              minifyHash: f,
              lookupHash: function (J, K, L, M) {
                for (var O, N = 0; N < M.length; N++)
                  if (((O = M[N]), O.blocksByHash.hasOwnProperty(J))) {
                    var P = O.blocksByHash[J];
                    if ("reporter" === K.shape && "reporter" !== P.shape) continue;
                    if ("boolean" === K.shape && "boolean" !== P.shape) continue;
                    return P.specialCase && (P = P.specialCase(K, L, O) || P), { type: P, lang: O };
                  }
              },
              applyOverrides: function (J, K) {
                for (var M, L = 0; L < K.length; L++)
                  (M = K[L]),
                    C.test(M)
                      ? ((J.color = M), (J.category = ""), (J.categoryIsDefault = !1))
                      : -1 < r.indexOf(M)
                      ? ((J.category = M), (J.categoryIsDefault = !1))
                      : -1 < s.indexOf(M)
                      ? (J.shape = M)
                      : "loop" === M
                      ? (J.hasLoopArrow = !0)
                      : ("+" === M || "-" === M) && (J.diff = M);
              },
              rtlLanguages: ["ar", "fa", "he"],
              iconPat: A,
              hashSpec: e,
              blocksBySelector: D,
              parseSpec: d,
              inputPat: y,
              unicodeIcons: G,
              english: I,
            }
          );
        })();
      },
      { "./commands.js": 3 },
    ],
    3: [
      function (require, module, exports) {
        "use strict";
        module.exports = [
          ["move %n steps", " ", 1, "forward:"],
          ["turn @turnRight %n degrees", " ", 1, "turnRight:"],
          ["turn @turnLeft %n degrees", " ", 1, "turnLeft:"],
          ["point in direction %d.direction", " ", 1, "heading:"],
          ["point towards %m.spriteOrMouse", " ", 1, "pointTowards:"],
          ["go to x:%n y:%n", " ", 1, "gotoX:y:"],
          ["go to %r.location", " ", 1, "gotoSpriteOrMouse:"],
          ["glide %n secs to x:%n y:%n", " ", 1, "glideSecs:toX:y:elapsed:from:"],
          ["change x by %n", " ", 1, "changeXposBy:"],
          ["set x to %n", " ", 1, "xpos:"],
          ["change y by %n", " ", 1, "changeYposBy:"],
          ["set y to %n", " ", 1, "ypos:"],
          ["set rotation style %m.rotationStyle", " ", 1, "setRotationStyle"],
          ["say %s for %n secs", " ", 2, "say:duration:elapsed:from:"],
          ["say %s", " ", 2, "say:"],
          ["think %s for %n secs", " ", 2, "think:duration:elapsed:from:"],
          ["think %s", " ", 2, "think:"],
          ["show", " ", 2, "show"],
          ["hide", " ", 2, "hide"],
          ["switch costume to %m.costume", " ", 2, "lookLike:"],
          ["next costume", " ", 2, "nextCostume"],
          ["next backdrop", " ", 102, "nextScene"],
          ["switch backdrop to %m.backdrop", " ", 2, "startScene"],
          ["switch backdrop to %m.backdrop and wait", " ", 102, "startSceneAndWait"],
          ["change %m.effect effect by %n", " ", 2, "changeGraphicEffect:by:"],
          ["set %m.effect effect to %n", " ", 2, "setGraphicEffect:to:"],
          ["clear graphic effects", " ", 2, "filterReset"],
          ["change size by %n", " ", 2, "changeSizeBy:"],
          ["set size to %n%", " ", 2, "setSizeTo:"],
          ["go to front", " ", 2, "comeToFront"],
          ["go back %n layers", " ", 2, "goBackByLayers:"],
          ["play sound %m.sound", " ", 3, "playSound:"],
          ["play sound %m.sound until done", " ", 3, "doPlaySoundAndWait"],
          ["stop all sounds", " ", 3, "stopAllSounds"],
          ["play drum %d.drum for %n beats", " ", 3, "playDrum"],
          ["rest for %n beats", " ", 3, "rest:elapsed:from:"],
          ["play note %d.note for %n beats", " ", 3, "noteOn:duration:elapsed:from:"],
          ["set instrument to %d.instrument", " ", 3, "instrument:"],
          ["change volume by %n", " ", 3, "changeVolumeBy:"],
          ["set volume to %n%", " ", 3, "setVolumeTo:"],
          ["change tempo by %n", " ", 3, "changeTempoBy:"],
          ["set tempo to %n bpm", " ", 3, "setTempoTo:"],
          ["change %m.audioEffect effect by %n", " ", 3, "changeAudioEffectBy:"],
          ["set %m.audioEffect effect to %n", " ", 3, "setAudioEffectTo:"],
          ["erase all", " ", 4, "clearPenTrails"],
          ["stamp", " ", 4, "stampCostume"],
          ["pen down", " ", 4, "putPenDown"],
          ["pen up", " ", 4, "putPenUp"],
          ["set pen color to %c", " ", 4, "penColor:"],
          ["change pen color by %n", " ", 4, "changePenHueBy:"],
          ["set pen color to %n", " ", 4, "setPenHueTo:"],
          ["change pen shade by %n", " ", 4, "changePenShadeBy:"],
          ["set pen shade to %n", " ", 4, "setPenShadeTo:"],
          ["change pen size by %n", " ", 4, "changePenSizeBy:"],
          ["set pen size to %n", " ", 4, "penSize:"],
          ["when @greenFlag clicked", "h", 5, "whenGreenFlag"],
          ["when %m.key key pressed", "h", 5, "whenKeyPressed"],
          ["when this sprite clicked", "h", 5, "whenClicked"],
          ["when backdrop switches to %m.backdrop", "h", 5, "whenSceneStarts"],
          ["when %m.triggerSensor > %n", "h", 5, "whenSensorGreaterThan"],
          ["when I receive %m.broadcast", "h", 5, "whenIReceive"],
          ["broadcast %m.broadcast", " ", 5, "broadcast:"],
          ["broadcast %m.broadcast and wait", " ", 5, "doBroadcastAndWait"],
          ["wait %n seconds", " ", 6, "wait:elapsed:from:"],
          ["repeat %n", "c", 6, "doRepeat"],
          ["forever", "cf", 6, "doForever"],
          ["if %b then", "c", 6, "doIf"],
          ["if %b then", "e", 6, "doIfElse"],
          ["wait until %b", " ", 6, "doWaitUntil"],
          ["repeat until %b", "c", 6, "doUntil"],
          ["stop %m.stop", "f", 6, "stopScripts"],
          ["when I start as a clone", "h", 6, "whenCloned"],
          ["create clone of %m.spriteOnly", " ", 6, "createCloneOf"],
          ["delete this clone", "f", 6, "deleteClone"],
          ["ask %s and wait", " ", 7, "doAsk"],
          ["turn video %m.videoState", " ", 7, "setVideoState"],
          ["set video transparency to %n%", " ", 7, "setVideoTransparency"],
          ["reset timer", " ", 7, "timerReset"],
          ["set %m.var to %s", " ", 9, "setVar:to:"],
          ["change %m.var by %n", " ", 9, "changeVar:by:"],
          ["show variable %m.var", " ", 9, "showVariable:"],
          ["hide variable %m.var", " ", 9, "hideVariable:"],
          ["add %s to %m.list", " ", 12, "append:toList:"],
          ["delete %d.listDeleteItem of %m.list", " ", 12, "deleteLine:ofList:"],
          ["delete all of %m.list", " ", 12, "deleteAll:ofList:"],
          ["if on edge, bounce", " ", 1, "bounceOffEdge"],
          ["insert %s at %d.listItem of %m.list", " ", 12, "insert:at:ofList:"],
          ["replace item %d.listItem of %m.list with %s", " ", 12, "setLine:ofList:to:"],
          ["show list %m.list", " ", 12, "showList:"],
          ["hide list %m.list", " ", 12, "hideList:"],
          ["x position", "r", 1, "xpos"],
          ["y position", "r", 1, "ypos"],
          ["direction", "r", 1, "heading"],
          ["costume #", "r", 2, "costumeIndex"],
          ["size", "r", 2, "scale"],
          ["backdrop name", "r", 102, "sceneName"],
          ["backdrop #", "r", 102, "backgroundIndex"],
          ["volume", "r", 3, "volume"],
          ["tempo", "r", 3, "tempo"],
          ["touching %m.touching?", "b", 7, "touching:"],
          ["touching color %c?", "b", 7, "touchingColor:"],
          ["color %c is touching %c?", "b", 7, "color:sees:"],
          ["distance to %m.spriteOrMouse", "r", 7, "distanceTo:"],
          ["answer", "r", 7, "answer"],
          ["key %m.key pressed?", "b", 7, "keyPressed:"],
          ["mouse down?", "b", 7, "mousePressed"],
          ["mouse x", "r", 7, "mouseX"],
          ["mouse y", "r", 7, "mouseY"],
          ["loudness", "r", 7, "soundLevel"],
          ["video %m.videoMotionType on %m.stageOrThis", "r", 7, "senseVideoMotion"],
          ["timer", "r", 7, "timer"],
          ["%m.attribute of %m.spriteOrStage", "r", 7, "getAttribute:of:"],
          ["current %m.timeAndDate", "r", 7, "timeAndDate"],
          ["days since 2000", "r", 7, "timestamp"],
          ["username", "r", 7, "getUserName"],
          ["%n + %n", "r", 8, "+"],
          ["%n - %n", "r", 8, "-"],
          ["%n * %n", "r", 8, "*"],
          ["%n / %n", "r", 8, "/"],
          ["pick random %n to %n", "r", 8, "randomFrom:to:"],
          ["%s < %s", "b", 8, "<"],
          ["%s = %s", "b", 8, "="],
          ["%s > %s", "b", 8, ">"],
          ["%b and %b", "b", 8, "&"],
          ["%b or %b", "b", 8, "|"],
          ["not %b", "b", 8, "not"],
          ["join %s %s", "r", 8, "concatenate:with:"],
          ["letter %n of %s", "r", 8, "letter:of:"],
          ["length of %s", "r", 8, "stringLength:"],
          ["%n mod %n", "r", 8, "%"],
          ["round %n", "r", 8, "rounded"],
          ["%m.mathOp of %n", "r", 8, "computeFunction:of:"],
          ["item %d.listItem of %m.list", "r", 12, "getLine:ofList:"],
          ["length of %m.list", "r", 12, "lineCountOfList:"],
          ["%m.list contains %s?", "b", 12, "list:contains:"],
          ["when %m.booleanSensor", "h", 20, ""],
          ["when %m.sensor %m.lessMore %n", "h", 20, ""],
          ["sensor %m.booleanSensor?", "b", 20, ""],
          ["%m.sensor sensor value", "r", 20, ""],
          ["turn %m.motor on for %n secs", " ", 20, ""],
          ["turn %m.motor on", " ", 20, ""],
          ["turn %m.motor off", " ", 20, ""],
          ["set %m.motor power to %n", " ", 20, ""],
          ["set %m.motor2 direction to %m.motorDirection", " ", 20, ""],
          ["when distance %m.lessMore %n", "h", 20, ""],
          ["when tilt %m.eNe %n", "h", 20, ""],
          ["distance", "r", 20, ""],
          ["tilt", "r", 20, ""],
          ["turn %m.motor on for %n seconds", " ", 20, ""],
          ["set light color to %n", " ", 20, ""],
          ["play note %n for %n seconds", " ", 20, ""],
          ["when tilted", "h", 20, ""],
          ["tilt %m.xxx", "r", 20, ""],
          ["else", "else", 6, ""],
          ["end", "end", 6, ""],
          [". . .", " ", 42, ""],
          ["%n @addInput", "ring", 42, ""],
          ["user id", "r", 0, ""],
          ["if %b", "c", 0, "doIf"],
          ["if %b", "e", 0, "doIfElse"],
          ["forever if %b", "cf", 0, "doForeverIf"],
          ["stop script", "f", 0, "doReturn"],
          ["stop all", "f", 0, "stopAll"],
          ["switch to costume %m.costume", " ", 0, "lookLike:"],
          ["next background", " ", 0, "nextScene"],
          ["switch to background %m.backdrop", " ", 0, "startScene"],
          ["background #", "r", 0, "backgroundIndex"],
          ["loud?", "b", 0, "isLoud"],
        ];
      },
      {},
    ],
    4: [
      function (require, module, exports) {
        "use strict";
        function extend(a, b) {
          return Object.assign({}, b, a);
        }
        function assert(a, b) {
          if (!a) throw "Assertion failed! " + (b || "");
        }
        var document,
          xml,
          directProps = { textContent: !0 },
          SVG = (module.exports = {
            init: function init(a, b) {
              document = a.document;
              var c = a.DOMParser;
              (xml = new c().parseFromString("<xml></xml>", "application/xml")),
                (SVG.XMLSerializer = a.XMLSerializer),
                (SVG.makeCanvas = b);
            },
            cdata: function cdata(a) {
              return xml.createCDATASection(a);
            },
            el: function el(a, b) {
              var c = document.createElementNS("http://www.w3.org/2000/svg", a);
              return SVG.setProps(c, b);
            },
            setProps: function setProps(a, b) {
              for (var c in b) {
                var d = "" + b[c];
                directProps[c]
                  ? (a[c] = d)
                  : /^xlink:/.test(c)
                  ? a.setAttributeNS("http://www.w3.org/1999/xlink", c.slice(6), d)
                  : null !== b[c] && b.hasOwnProperty(c) && a.setAttributeNS(null, c, d);
              }
              return a;
            },
            withChildren: function withChildren(a, b) {
              for (var c = 0; c < b.length; c++) a.appendChild(b[c]);
              return a;
            },
            group: function group(a) {
              return SVG.withChildren(SVG.el("g"), a);
            },
            newSVG: function newSVG(a, b) {
              return SVG.el("svg", { version: "1.1", width: a, height: b });
            },
            polygon: function polygon(a) {
              return SVG.el("polygon", extend(a, { points: a.points.join(" ") }));
            },
            path: function path(a) {
              return SVG.el("path", extend(a, { path: null, d: a.path.join(" ") }));
            },
            text: function text(a, b, c, d) {
              var e = SVG.el("text", extend(d, { x: a, y: b, textContent: c }));
              return e;
            },
            symbol: function symbol(a) {
              return SVG.el("use", { "xlink:href": a });
            },
            move: function move(a, b, c) {
              return SVG.setProps(c, { transform: ["translate(", a, " ", b, ")"].join("") }), c;
            },
            translatePath: function translatePath(a, b, c) {
              for (var k, d = !0, e = c.split(" "), f = [], g = 0; g < e.length; g++) {
                if (((k = e[g]), "A" === k)) {
                  var l = g + 5;
                  for (f.push("A"); g < l; ) f.push(e[++g]);
                  continue;
                } else /[A-Za-z]/.test(k) ? assert(d) : ((k = +k), (k += d ? a : b), (d = !d));
                f.push(k);
              }
              return f.join(" ");
            },
            rect: function rect(a, b, c) {
              return SVG.el("rect", extend(c, { x: 0, y: 0, width: a, height: b }));
            },
            ellipse: function ellipse(a, b, c) {
              return SVG.el("ellipse", extend(c, { cx: a / 2, cy: b / 2, rx: a / 2, ry: b / 2 }));
            },
            arc: function arc(a, b, c, d, e, f) {
              return ["L", a, b, "A", e, f, 0, 0, 1, c, d].join(" ");
            },
            arcw: function arcw(a, b, c, d, e, f) {
              return ["L", a, b, "A", e, f, 0, 0, 0, c, d].join(" ");
            },
            roundRect: function roundRect(a, b, c) {
              return SVG.rect(a, b, extend(c, { rx: 4, ry: 4 }));
            },
            pillRect: function pillRect(a, b, c) {
              var d = b / 2;
              return SVG.rect(a, b, extend(c, { rx: d, ry: d }));
            },
            pointedPath: function pointedPath(a, b) {
              var c = b / 2;
              return ["M", c, 0, "L", a - c, 0, a, c, "L", a, c, a - c, b, "L", c, b, 0, c, "L", 0, c, c, 0, "Z"];
            },
            pointedRect: function pointedRect(a, b, c) {
              return SVG.path(extend(c, { path: SVG.pointedPath(a, b) }));
            },
            getTop: function getTop(a) {
              return [
                "M",
                0,
                4,
                "Q",
                SVG.curve(0, 4, 4, 0, 0),
                ["L", 8, 0].join(" "),
                "c 2 0 3 1 4 2",
                "l 1.5 1.5",
                "c 1 1 2 2 4 2",
                "h 8",
                "c 2 0 3 -1 4 -2",
                "l 1.5 -1.5",
                "c 1 -1 2 -2 4 -2",
                "L",
                a - 4,
                0,
                "Q",
                SVG.curve(a - 4, 0, a, 4, 0),
                "L",
                a,
                4,
              ].join(" ");
            },
            getRingTop: function getRingTop(a) {
              return [
                "M",
                0,
                3,
                "L",
                3,
                0,
                "L",
                7,
                0,
                "L",
                10,
                3,
                "L",
                16,
                3,
                "L",
                19,
                0,
                "L",
                a - 3,
                0,
                "L",
                a,
                3,
              ].join(" ");
            },
            getRightAndBottom: function getRightAndBottom(a, b, c, d) {
              "undefined" == typeof d && (d = 0);
              var e = ["L", a, b - 4, "Q", SVG.curve(a, b - 4, a - 4, b, 0)];
              return (
                c &&
                  (e = e.concat([
                    ["L", d + 35, b].join(" "),
                    "c -2 0 -3 1 -4 2",
                    "l -1.5 1.5",
                    "c -1 1 -2 2 -4 2",
                    "h -8",
                    "c -2 0 -3 -1 -4 -2",
                    "l -1.5 -1.5",
                    "c -1 -1 -2 -2 -4 -2",
                  ])),
                0 === d
                  ? (e.push("L", d + 4, b), e.push("a 4 4 0 0 1 -4 -4"))
                  : (e.push("L", d + 4, b), e.push("a 4 4 0 0 0 -4 4")),
                e.join(" ")
              );
            },
            getArm: function getArm(a, b) {
              return ["L", 10, b - 4, "a -4 -4 0 0 0 4 4", "L", a - 4, b, "a 4 4 0 0 1 4 4"].join(" ");
            },
            stackRect: function stackRect(a, b, c) {
              return SVG.path(extend(c, { path: [SVG.getTop(a), SVG.getRightAndBottom(a, b, !0, 0), "Z"] }));
            },
            capPath: function capPath(a, b) {
              return [SVG.getTop(a), SVG.getRightAndBottom(a, b, !1, 0), "Z"];
            },
            ringCapPath: function ringCapPath(a, b) {
              return [SVG.getRingTop(a), SVG.getRightAndBottom(a, b, !1, 0), "Z"];
            },
            capRect: function capRect(a, b, c) {
              return SVG.path(extend(c, { path: SVG.capPath(a, b) }));
            },
            hatRect: function hatRect(a, b, c) {
              return SVG.path(
                extend(c, {
                  path: [
                    "M 0 12",
                    "c 14,-15 52,-15 66,0",
                    ["L", a - 4, 12].join(" "),
                    "a 4 4 0 0 1 4 4",
                    SVG.getRightAndBottom(a, b, !0),
                    "Z",
                  ],
                })
              );
            },
            curve: function curve(a, b, c, d, e) {
              var e = e || 0.42,
                k = Math.round((a + c) / 2 + e * (d - b)),
                l = Math.round((b + d) / 2 - e * (c - a));
              return [k, l, c, d].join(" ");
            },
            procHatBase: function procHatBase(a, b, c, d) {
              return SVG.path(
                extend(d, {
                  path: [
                    "M",
                    0,
                    b - 3,
                    "L",
                    0,
                    10,
                    "Q",
                    SVG.curve(0, 10, 15, -5, 0),
                    "L",
                    a - 15,
                    -5,
                    "Q",
                    SVG.curve(a - 15, -5, a, 10, 0),
                    SVG.getRightAndBottom(a, b, !0),
                  ],
                })
              );
            },
            procHatCap: function procHatCap(a, b, c) {
              return SVG.path({
                path: [
                  "M",
                  -1,
                  13,
                  "Q",
                  SVG.curve(-1, 13, a + 1, 13, c),
                  "Q",
                  SVG.curve(a + 1, 13, a, 16, 0.6),
                  "Q",
                  SVG.curve(a, 16, 0, 16, -c),
                  "Q",
                  SVG.curve(0, 16, -1, 13, 0.6),
                  "Z",
                ],
                class: "sb-define-hat-cap",
              });
            },
            procHatRect: function procHatRect(a, b, c) {
              var d = 52,
                f = Math.min(0.2, 35 / a);
              return SVG.move(0, b - d, SVG.group([SVG.procHatBase(a, d, f, c)]));
            },
            mouthRect: function mouthRect(a, b, c, d, e) {
              for (
                var l, f = d[0].height, g = [SVG.getTop(a), SVG.getRightAndBottom(a, f, !0, 10)], k = 1;
                k < d.length;
                k += 2
              ) {
                (l = k + 2 === d.length), (f += d[k].height - 3), g.push(SVG.getArm(a, f));
                var m = !(l && c),
                  n = l ? 0 : 10;
                (f += d[k + 1].height + 3), g.push(SVG.getRightAndBottom(a, f, m, n));
              }
              return g.push("Z"), SVG.path(extend(e, { path: g }));
            },
            ringRect: function ringRect(a, b, c, d, e, f, g) {
              "reporter" === f
                ? SVG.roundRect
                : "boolean" === f
                ? SVG.pointedPath
                : 40 > d
                ? SVG.ringCapPath
                : SVG.capPath;
              return SVG.rect(a, b, extend(g, { rx: 4, ry: 4 }));
            },
            commentRect: function commentRect(a, b, c) {
              var d = 6;
              return SVG.path(
                extend(c, {
                  class: "sb-comment",
                  path: [
                    "M",
                    d,
                    0,
                    SVG.arc(a - d, 0, a, d, d, d),
                    SVG.arc(a, b - d, a - d, b, d, d),
                    SVG.arc(d, b, 0, b - d, d, d),
                    SVG.arc(0, d, d, 0, d, d),
                    "Z",
                  ],
                })
              );
            },
            commentLine: function commentLine(a, b) {
              return SVG.move(-a, 9, SVG.rect(a, 2, extend(b, { class: "sb-comment-line" })));
            },
            strikethroughLine: function strikethroughLine(a, b) {
              return SVG.path(extend(b, { path: ["M", 0, 0, "L", a, 0], class: "sb-diff sb-diff-del" }));
            },
          });
      },
      {},
    ],
    5: [
      function (require, module, exports) {
        "use strict";
        module.exports = (function () {
          function a(d, e) {
            return Object.assign({}, e, d);
          }
          var b = require("./draw.js"),
            c = function Filter(d, e) {
              (this.el = b.el("filter", a(e, { id: d, x0: "-50%", y0: "-50%", width: "200%", height: "200%" }))),
                (this.highestId = 0);
            };
          return (
            (c.prototype.fe = function (d, e, f) {
              var g = d.toLowerCase().replace(/gaussian|osite/, ""),
                h = [g, "-", ++this.highestId].join("");
              return this.el.appendChild(b.withChildren(b.el("fe" + d, a(e, { result: h })), f || [])), h;
            }),
            (c.prototype.comp = function (d, e, f, g) {
              return this.fe("Composite", a(g, { operator: d, in: e, in2: f }));
            }),
            (c.prototype.subtract = function (d, e) {
              return this.comp("arithmetic", d, e, { k2: 1, k3: -1 });
            }),
            (c.prototype.offset = function (d, e, f) {
              return this.fe("Offset", { in: f, dx: d, dy: e });
            }),
            (c.prototype.flood = function (d, e, f) {
              return this.fe("Flood", { in: f, "flood-color": d, "flood-opacity": e });
            }),
            (c.prototype.blur = function (d, e) {
              return this.fe("GaussianBlur", { in: e, stdDeviation: [d, d].join(" ") });
            }),
            (c.prototype.colorMatrix = function (d, e) {
              return this.fe("ColorMatrix", { in: d, type: "matrix", values: e.join(" ") });
            }),
            (c.prototype.merge = function (d) {
              this.fe(
                "Merge",
                {},
                d.map(function (e) {
                  return b.el("feMergeNode", { in: e });
                })
              );
            }),
            c
          );
        })();
      },
      { "./draw.js": 4 },
    ],
    6: [
      function (require, module, exports) {
        "use strict";
        (function (a) {
          if ("undefined" != typeof module && module.exports) module.exports = a;
          else {
            var b = function makeCanvas() {
                return document.createElement("canvas");
              },
              c = (window.scratchblocks = a(window, b));
            document.head.appendChild(c.makeStyle());
          }
        })(function (a, b) {
          "use strict";
          function c(x, y) {
            return Object.assign({}, y, x);
          }
          function d(x, y) {
            return x.render(y);
          }
          function e(x, y) {
            var y = c({ inline: !1 }, y),
              z = x.innerHTML.replace(/<br>\s?|\n|\r\n|\r/gi, "\n"),
              A = g.createElement("pre");
            A.innerHTML = z;
            var B = A.textContent;
            return y.inline && (B = B.replace("\n", "")), B;
          }
          function f(x, y, z, A) {
            if (A.inline) {
              var B = g.createElement("span"),
                C = "scratchblocks scratchblocks-inline";
              z[0] && !z[0].isEmpty && (C += " scratchblocks-inline-" + z[0].blocks[0].shape),
                (B.className = C),
                (B.style.display = "inline-block"),
                (B.style.verticalAlign = "middle");
            } else {
              var B = g.createElement("div");
              B.className = "scratchblocks";
            }
            B.appendChild(y), (x.innerHTML = ""), x.appendChild(B);
          }
          var g = a.document,
            h = require("./blocks.js"),
            i = h.allLanguages,
            j = h.loadLanguages,
            k = require("./syntax.js").parse,
            l = require("./style.js"),
            m = require("./model.js"),
            n = m.Label,
            o = m.Icon,
            p = m.Input,
            q = m.Block,
            r = m.Comment,
            s = m.Script,
            t = m.Document,
            u = require("./draw.js");
          u.init(a, b),
            (n.measuring = (function () {
              var x = u.makeCanvas();
              return x.getContext("2d");
            })());
          return {
            allLanguages: i,
            loadLanguages: j,
            fromJSON: t.fromJSON,
            toJSON: function toJSON(x) {
              return x.toJSON();
            },
            stringify: function stringify(x) {
              return x.stringify();
            },
            Label: n,
            Icon: o,
            Input: p,
            Block: q,
            Comment: r,
            Script: s,
            Document: t,
            read: e,
            parse: k,
            replace: f,
            renderMatching: function renderMatching(x, y) {
              var x = x || "pre.blocks",
                y = c({ inline: !1, languages: ["en"], read: e, parse: k, render: d, replace: f }, y),
                z = [].slice.apply(g.querySelectorAll(x));
              z.forEach(function (A) {
                var B = y.read(A, y),
                  C = y.parse(B, y);
                y.render(C, function (D) {
                  y.replace(A, D, C, y);
                });
              });
            },
            renderSVGString: function renderSVGString(x, y) {
              var z = k(x, y);
              return z.render(function () {}), z.exportSVGString();
            },
            makeStyle: l.makeStyle,
          };
        });
      },
      { "./blocks.js": 2, "./draw.js": 4, "./model.js": 7, "./style.js": 8, "./syntax.js": 9 },
    ],
    7: [
      function (require, module, exports) {
        "use strict";
        module.exports = (function () {
          function a(R, S) {
            if (!R) throw "Assertion failed! " + (S || "");
          }
          function b(R) {
            return R && R.constructor === Array;
          }
          function d(R, S) {
            return Object.assign({}, S, R);
          }
          function e(R) {
            return R.split("\n")
              .map(function (S) {
                return "  " + S;
              })
              .join("\n");
          }
          function g(R) {
            R = "" + R;
            var S = parseInt(R);
            if (!isNaN(S)) return S;
            var T = parseFloat(R);
            return isNaN(T) ? R : T;
          }
          var k = require("./draw.js"),
            l = require("./style.js"),
            m = l.defaultFontFamily,
            q = l.makeStyle,
            r = l.makeIcons,
            s = l.darkRect,
            t = l.bevelFilter,
            u = l.darkFilter,
            z = l.desaturateFilter,
            A = require("./blocks.js"),
            B = A.blocksBySelector,
            C = A.parseSpec,
            D = A.inputPat,
            E = A.iconPat,
            F = A.rtlLanguages,
            G = A.unicodeIcons,
            H = A.english,
            I = A.blockName,
            J = function Label(R, S) {
              (this.value = R),
                (this.cls = S || ""),
                (this.el = null),
                (this.height = 11),
                (this.metrics = null),
                (this.x = 0);
            };
          (J.prototype.isLabel = !0),
            (J.prototype.stringify = function () {
              return "<" === this.value || ">" === this.value
                ? this.value
                : this.value.replace(/([<>[\](){}])/g, "\\$1");
            }),
            (J.prototype.draw = function () {
              return this.el;
            }),
            Object.defineProperty(J.prototype, "width", {
              get: function get() {
                return this.metrics.width;
              },
            }),
            (J.metricsCache = {}),
            (J.toMeasure = []),
            (J.prototype.measure = function () {
              var R = this.value,
                S = this.cls;
              this.el = k.text(0, 10, R, { class: "sb-label " + S });
              var T = J.metricsCache[S];
              if ((T || (T = J.metricsCache[S] = Object.create(null)), Object.hasOwnProperty.call(T, R)))
                this.metrics = T[R];
              else {
                var U = /sb-comment-label/.test(this.cls)
                  ? "normal 11px 'Helvetica Neue', Helvetica, sans-serif"
                  : /sb-literal/.test(this.cls)
                  ? "normal 11px " + m
                  : "bold 11px " + m;
                this.metrics = T[R] = J.measure(R, U);
              }
            }),
            (J.measure = function (R, S) {
              var T = J.measuring;
              T.font = S;
              var U = T.measureText(R),
                V = -0.75 | U.width;
              return { width: V };
            });
          var K = function Icon(R) {
            (this.name = R), (this.isArrow = "loopArrow" === R);
            var S = K.icons[R];
            a(S, "no info for icon " + R), Object.assign(this, S);
          };
          (K.prototype.isIcon = !0),
            (K.prototype.stringify = function () {
              return G["@" + this.name] || "";
            }),
            (K.icons = {
              greenFlag: { width: 12, height: 5, dy: -8 },
              turnLeft: { width: 15, height: 12, dy: 1 },
              turnRight: { width: 15, height: 12, dy: 1 },
              loopArrow: { width: 14, height: 11 },
              addInput: { width: 4, height: 8 },
              delInput: { width: 4, height: 8 },
              music: { width: 26, height: 26 },
              pen: { width: 26, height: 26, dy: 2 },
              video: { width: 26, height: 26, dy: 6.5 },
              tts: { width: 26, height: 26, dy: 2 },
              microbit: { width: 26, height: 26, dy: 2 },
              wedo: { width: 26, height: 26, dy: 2 },
              ev3: { width: 26, height: 26, dy: 2 },
              makeymakey: { width: 26, height: 26, dy: 2 },
              translate: { width: 26, height: 26, dy: 2 },
              line: { width: 0, height: 26 },
              normal: { width: -4, height: 20 },
            }),
            (K.prototype.draw = function () {
              return "normal" == this.name
                ? k.el("line", { x1: 0, y1: 0, x2: 0, y2: 20 })
                : "line" == this.name
                ? k.el("line", { class: "sb-outline", "stroke-linecap": "round", x1: 0, y1: 0, x2: 0, y2: 26 })
                : k.symbol("#" + this.name, { width: this.width, height: this.height });
            });
          var L = function Input(R, S, T) {
            (this.shape = R),
              (this.value = S),
              (this.menu = T || null),
              (this.isRound = "number" === R || "number-dropdown" === R || "round-dropdown" === R || "string" === R),
              (this.isBoolean = "boolean" === R),
              (this.isStack = "stack" === R),
              (this.isInset = "boolean" === R || "stack" === R || "reporter" === R),
              (this.isColor = "color" === R),
              (this.hasArrow = "dropdown" === R || "number-dropdown" === R || "round-dropdown" === R),
              (this.isDarker = "boolean" === R || "stack" === R || "dropdown" === R || "round-dropdown" === R),
              (this.isSquare = "dropdown" === R),
              (this.hasLabel = !(this.isColor || this.isInset)),
              (this.label = this.hasLabel ? new J(S, ["sb-literal-" + this.shape]) : null),
              (this.x = 0);
          };
          (L.prototype.isInput = !0),
            (L.fromJSON = function (R, S, T) {
              var U = {
                b: "boolean",
                n: "number",
                s: "string",
                d: "number-dropdown",
                m: "dropdown",
                c: "color",
                r: "round-dropdown",
              }[T[1]];
              if ("color" === U) {
                S || 0 === S || (S = parseInt(256 * (256 * (256 * Math.random())))),
                  (S = +S),
                  0 > S && (S = 4294967295 + S + 1);
                var V = S.toString(16);
                for (V = V.slice(Math.max(0, V.length - 6)); 6 > V.length; ) V = "0" + V;
                V[0] === V[1] && V[2] === V[3] && V[4] === V[5] && (V = V[0] + V[2] + V[4]), (S = "#" + V);
              } else if ("dropdown" === U) {
                S =
                  {
                    _mouse_: "mouse-pointer",
                    _myself_: "myself",
                    _stage_: "Stage",
                    _edge_: "edge",
                    _random_: "random position",
                  }[S] || S;
                var W = S;
                S = R.dropdowns[S] || S;
              } else
                "number-dropdown" === U
                  ? (S = R.dropdowns[S] || S)
                  : "round-dropdown" === U && (S = R.dropdowns[S] || S);
              return new L(U, "" + S, W);
            }),
            (L.prototype.toJSON = function () {
              if (this.isColor) {
                a("#" === this.value[0]);
                var R = this.value.slice(1);
                return 3 === R.length && (R = R[0] + R[0] + R[1] + R[1] + R[2] + R[2]), parseInt(R, 16);
              }
              if (this.hasArrow) {
                var S = this.menu || this.value;
                return (
                  "dropdown" === this.shape &&
                    (S =
                      {
                        "mouse-pointer": "_mouse_",
                        myself: "_myself",
                        Stage: "_stage_",
                        edge: "_edge_",
                        "random position": "_random_",
                      }[S] || S),
                  this.isRound && (S = g(S)),
                  S
                );
              }
              return !this.isBoolean && (this.isRound ? g(this.value) : this.value);
            }),
            (L.prototype.stringify = function () {
              if (this.isColor) return a("#" === this.value[0]), "[" + this.value + "]";
              var R = (this.value ? "" + this.value : "").replace(/ v$/, " \\v").replace(/([\]\\])/g, "\\$1");
              return (
                this.hasArrow && (R += " v"),
                this.isRound
                  ? "(" + R + ")"
                  : this.isSquare
                  ? "[" + R + "]"
                  : this.isBoolean
                  ? "<>"
                  : this.isStack
                  ? "{}"
                  : R
              );
            }),
            (L.prototype.translate = function (R) {
              if (this.hasArrow) {
                var S = this.menu || this.value;
                (this.value = R.dropdowns[S] || S), (this.label = new J(this.value, ["sb-literal-" + this.shape]));
              }
            }),
            (L.prototype.measure = function () {
              this.hasLabel && this.label.measure();
            }),
            (L.shapes = {
              string: k.pillRect,
              number: k.pillRect,
              "number-dropdown": k.pillRect,
              "round-dropdown": k.pillRect,
              color: k.pillRect,
              dropdown: k.roundRect,
              boolean: k.pointedRect,
              stack: k.stackRect,
              reporter: k.roundRect,
            }),
            (L.prototype.draw = function (R) {
              if (this.hasLabel)
                var S = this.label.draw(),
                  T = Math.max(
                    25,
                    this.label.width +
                      ("string" === this.shape || "number-dropdown" === this.shape || "reporter" === this.shape
                        ? 20
                        : 20)
                  );
              else var T = this.isInset ? 30 : this.isColor ? 25 : null;
              this.hasArrow && (T += 8), "round-dropdown" === this.shape && (T += 6), (this.width = T);
              var U = (this.height = this.isRound || this.isColor ? 20 : 20),
                V = L.shapes[this.shape](T, U);
              this.isColor
                ? k.setProps(V, { fill: this.value })
                : this.isDarker &&
                  ((V = s(T, U, R.info.category, V)), R.info.color && k.setProps(V, { fill: R.info.color }));
              var W = k.group([k.setProps(V, { class: ["sb-input", "sb-input-" + this.shape].join(" ") })]);
              if (this.hasLabel) {
                var X = this.isRound ? 10 : 6;
                W.appendChild(k.move(X, 4, S));
              }
              if (this.hasArrow) {
                "dropdown" === this.shape ? 4 : 4;
                "number-dropdown" === this.shape
                  ? W.appendChild(k.move(T - 16, 8, k.symbol("#blackDropdownArrow", {})))
                  : W.appendChild(k.move(T - 16, 8, k.symbol("#whiteDropdownArrow", {})));
              }
              return W;
            });
          var M = function Block(R, S, T) {
            a(R), (this.info = R), (this.children = S), (this.comment = T || null), (this.diff = null);
            var U = this.info.shape;
            switch (
              ((this.isHat = "hat" === U || "define-hat" === U),
              (this.hasPuzzle = "stack" === U || "hat" === U),
              (this.isFinal = /cap/.test(U)),
              (this.isCommand = "stack" === U || "cap" === U || /block/.test(U)),
              (this.isOutline = "outline" === U),
              (this.isReporter = "reporter" === U),
              (this.isBoolean = "boolean" === U),
              (this.isRing = "ring" === U),
              (this.hasScript = /block/.test(U)),
              (this.isElse = "celse" === U),
              (this.isEnd = "cend" === U),
              (this.x = 0),
              (this.width = null),
              (this.height = null),
              (this.firstLine = null),
              (this.innerWidth = null),
              this.info.category)
            ) {
              default:
                this.isCommand && this.children.unshift(new K("normal"));
                break;
              case "music":
                this.children.unshift(new K("line")),
                  this.children.unshift(new K("music")),
                  (this.info.category = "extension");
                break;
              case "pen":
                this.children.unshift(new K("line")), this.children.unshift(new K("pen"));
                break;
              case "video":
                this.children.unshift(new K("line")),
                  this.children.unshift(new K("video")),
                  (this.info.category = "extension");
                break;
              case "tts":
                this.children.unshift(new K("line")),
                  this.children.unshift(new K("tts")),
                  (this.info.category = "extension");
                break;
              case "makeymakey":
                this.children.unshift(new K("line")),
                  this.children.unshift(new K("makeymakey")),
                  (this.info.category = "extension");
                break;
              case "wedo":
                this.children.unshift(new K("line")),
                  this.children.unshift(new K("wedo")),
                  (this.info.category = "extension");
                break;
              case "translate":
                this.children.unshift(new K("line")),
                  this.children.unshift(new K("translate")),
                  (this.info.category = "extension");
                break;
              case "ev3":
                this.children.unshift(new K("line")),
                  this.children.unshift(new K("ev3")),
                  (this.info.category = "extension");
                break;
              case "microbit":
                this.children.unshift(new K("line")),
                  this.children.unshift(new K("microbit")),
                  (this.info.category = "extension");
            }
          };
          (M.prototype.isBlock = !0),
            (M.fromJSON = function (R, S) {
              var U = S.slice(),
                V = U.shift();
              if ("procDef" === V) {
                var W = U[0],
                  X = U[1].slice(),
                  Y = C(W),
                  Z = Y.parts.map(function (ba) {
                    if (D.test(ba)) {
                      var ca = new J(X.shift());
                      return new M({ shape: "b" === ba[1] ? "boolean" : "reporter", category: "custom-arg" }, [ca]);
                    }
                    return new J(ba);
                  }),
                  $ = new M({ shape: "outline" }, Z),
                  Z = [new J(R.define[0]), $];
                return new M(
                  { shape: "define-hat", category: "custom", selector: "procDef", call: W, names: U[1], language: R },
                  Z
                );
              }
              if ("call" === V)
                var W = U.shift(),
                  Y = d(C(W), { category: "custom", shape: "stack", selector: "call", call: W, language: R }),
                  _ = Y.parts;
              else {
                if ("readVariable" === V || "contentsOfList:" === V || "getParam" === V) {
                  var aa = "getParam" === V && "b" === U.pop() ? "boolean" : "reporter",
                    Y = {
                      selector: V,
                      shape: aa,
                      category: { readVariable: "variables", "contentsOfList:": "list", getParam: "custom-arg" }[V],
                      language: R,
                    };
                  return new M(Y, [new J(U[0])]);
                }
                var Y = d(B[V], { language: R });
                a(Y, "unknown selector: " + V);
                var W = R.commands[Y.spec] || W,
                  _ = W ? C(W).parts : Y.parts;
              }
              var Z = _.map(function (ba) {
                if (D.test(ba)) {
                  var ca = U.shift();
                  return (b(ca) ? M : L).fromJSON(R, ca, ba);
                }
                return E.test(ba) ? new K(ba.slice(1)) : new J(ba.trim());
              });
              return (
                U.forEach(function (ba, ca) {
                  (ba = ba || []),
                    a(b(ba)),
                    Z.push(new P(ba.map(M.fromJSON.bind(null, R)))),
                    "doIfElse" === V && 0 === ca && Z.push(new J(R.commands["else"]));
                }),
                new M(Y, Z)
              );
            }),
            (M.prototype.toJSON = function () {
              var R = this.info.selector,
                S = [];
              if ("procDef" === R) {
                var T = this.info.names,
                  U = this.info.call,
                  V = C(U),
                  W = V.inputs.map(function ($) {
                    return "%n" === $ ? 1 : "%b" !== $ && "";
                  });
                return ["procDef", U, T, W, !1];
              }
              if ("readVariable" === R || "contentsOfList:" === R || "getParam" === R)
                S.push(I(this)), "getParam" === R && S.push("boolean" === this.isBoolean ? "b" : "r");
              else {
                for (var Z, Y = 0; Y < this.children.length; Y++)
                  (Z = this.children[Y]), (Z.isInput || Z.isBlock || Z.isScript) && S.push(Z.toJSON());
                if ("call" === R) return ["call", this.info.call].concat(S);
              }
              if (!R) throw "unknown block: " + this.info.hash;
              return [R].concat(S);
            }),
            (M.prototype.stringify = function (R) {
              var S = null,
                T = !1,
                U = this.children
                  .map(function ($) {
                    return (
                      $.isIcon && (T = !0),
                      S || $.isLabel || $.isIcon || (S = $),
                      $.isScript ? "\n" + e($.stringify()) + "\n" : $.stringify().trim() + " "
                    );
                  })
                  .join("")
                  .trim(),
                V = this.info.language;
              if (T && V && this.info.selector) {
                var W = B[this.info.selector],
                  X = W.spec,
                  Y = V.nativeAliases[W.spec];
                if (Y) return D.test(Y) && S && (Y = Y.replace(D, S.stringify())), Y;
              }
              var Z = R || "";
              return (
                (("reporter" === this.info.shape && this.isReporter) ||
                  ("custom-arg" === this.info.category && (this.isReporter || this.isBoolean)) ||
                  ("custom" === this.info.category && "stack" === this.info.shape)) &&
                  (Z && (Z += " "), (Z += this.info.category)),
                Z && (U += " :: " + Z),
                this.hasScript
                  ? U + "\nend"
                  : "reporter" === this.info.shape
                  ? "(" + U + ")"
                  : "boolean" === this.info.shape
                  ? "<" + U + ">"
                  : U
              );
            }),
            (M.prototype.translate = function (R, S) {
              var T = this.info.selector;
              if (T) {
                "procDef" === T &&
                  (a(this.children[0].isLabel), (this.children[0] = new J(R.define[0] || H.define[0])));
                var U = B[T];
                if (U) {
                  var V = R.commands[U.spec];
                  if (V) {
                    var W = C(V),
                      X = this.children.filter(function (Y) {
                        return !Y.isLabel && !Y.isIcon;
                      });
                    S ||
                      X.forEach(function (Y) {
                        Y.translate(R);
                      }),
                      (this.children = W.parts
                        .map(function (Y) {
                          var Y = Y.trim();
                          return Y ? (D.test(Y) ? X.shift() : E.test(Y) ? new K(Y.slice(1)) : new J(Y)) : void 0;
                        })
                        .filter(function (Y) {
                          return !!Y;
                        })),
                      X.forEach(
                        function (Y) {
                          this.children.push(Y);
                        }.bind(this)
                      ),
                      (this.info.language = R),
                      (this.info.isRTL = -1 < F.indexOf(R.code));
                  }
                }
              }
            }),
            (M.prototype.measure = function () {
              for (var S, R = 0; R < this.children.length; R++) (S = this.children[R]), S.measure && S.measure();
              this.comment && this.comment.measure();
            }),
            (M.shapes = {
              stack: k.stackRect,
              "c-block": k.stackRect,
              "if-block": k.stackRect,
              celse: k.stackRect,
              cend: k.stackRect,
              cap: k.capRect,
              reporter: k.pillRect,
              boolean: k.pointedRect,
              hat: k.hatRect,
              "define-hat": k.procHatRect,
              ring: k.ringRect,
            }),
            (M.prototype.drawSelf = function (R, S, T) {
              if (1 < T.length)
                return k.mouthRect(R, S, this.isFinal, T, {
                  class: ["sb-" + this.info.category, "sb-bevel"].join(" "),
                });
              if ("outline" === this.info.shape) return k.setProps(k.stackRect(R, S), { class: "sb-outline" });
              if (this.isRing) {
                var U = this.children[0];
                if (U && (U.isInput || U.isBlock || U.isScript)) {
                  var V = U.isScript ? "stack" : U.isInput ? U.shape : U.info.shape;
                  return k.ringRect(R, S, U.y, U.width, U.height, V, {
                    class: ["sb-" + this.info.category, "sb-bevel"].join(" "),
                  });
                }
              }
              var W = M.shapes[this.info.shape];
              return (
                a(W, "no shape func: " + this.info.shape),
                W(R, S, { class: ["sb-" + this.info.category, "sb-bevel"].join(" ") })
              );
            }),
            (M.prototype.minDistance = function (R) {
              return this.isBoolean
                ? R.isReporter
                  ? 0 | (4 + R.height / 4)
                  : R.isLabel
                  ? 0 | (5 + R.height / 2)
                  : R.isBoolean || "boolean" === R.shape
                  ? 5
                  : 0 | (2 + R.height / 2)
                : this.isReporter
                ? (R.isInput && R.isRound) || ((R.isReporter || R.isBoolean) && !R.hasScript)
                  ? 2
                  : R.isLabel
                  ? 0 | (2 + R.height / 2)
                  : 0 | (-2 + R.height / 2)
                : 0;
            }),
            (M.padding = {
              hat: [21, 6, 7],
              "define-hat": [20, 8, 10],
              reporter: [5, 3, 3],
              boolean: [5, 3, 3],
              cap: [11, 6, 6],
              "c-block": [8, 6, 5],
              "if-block": [8, 6, 5],
              ring: [10, 4, 10],
              null: [8, 6, 5],
            }),
            (M.prototype.draw = function () {
              function R(pa) {
                0 === ea.length ? (aa.height += V + X) : ((aa.height += pa ? 0 : 2), (aa.y -= 1)),
                  (Y += aa.height),
                  ea.push(aa);
              }
              var S = "define-hat" === this.info.shape,
                T = this.children,
                U = M.padding[this.info.shape] || M.padding[null],
                V = U[0],
                W = U[1],
                X = U[2],
                Y = 0,
                Z = function Line(pa) {
                  (this.y = pa), (this.width = 0), (this.height = pa ? 18 : 16), (this.children = []);
                },
                $ = 0,
                _ = 0,
                aa = new Z(Y);
              if (this.info.isRTL) {
                for (
                  var ba = 0,
                    ca = function () {
                      T = T.slice(0, ba).concat(T.slice(ba, da).reverse()).concat(T.slice(da));
                    }.bind(this),
                    da = 0;
                  da < T.length;
                  da++
                )
                  T[da].isScript && (ca(), (ba = da + 1));
                ba < da && ca();
              }
              for (var fa, ea = [], da = 0; da < T.length; da++)
                if (((fa = T[da]), (fa.el = fa.draw(this)), fa.isScript && this.isCommand))
                  (this.hasScript = !0),
                    R(),
                    (fa.y = Y),
                    ea.push(fa),
                    (_ = Math.max(_, Math.max(1, fa.width))),
                    (fa.height = Math.max(12, fa.height) + 3),
                    (Y += fa.height),
                    (aa = new Z(Y));
                else if (fa.isArrow) aa.children.push(fa);
                else {
                  var ga = 0 < da ? 32 : 0,
                    ha = this.isCommand ? 0 : this.minDistance(fa),
                    ia = this.isCommand ? (fa.isBlock || fa.isInput ? ga : 0) : ha;
                  ia && !ea.length && aa.width < ia - W && (aa.width = ia - W),
                    (fa.x = aa.width),
                    (aa.width += fa.width),
                    ($ = Math.max($, aa.width + Math.max(0, ha - W))),
                    fa.isLabel ? (aa.width += 5) : ((aa.width += 5), (aa.height = Math.max(aa.height, fa.height))),
                    aa.children.push(fa);
                }
              if (
                (R(!0),
                ($ = Math.max(
                  $ + 2 * W,
                  this.isHat || this.hasScript ? 70 : this.isCommand || this.isOutline || this.isRing ? 45 : 20
                )),
                (this.height = Y),
                (this.width = _ ? Math.max($, 10 + _) : $),
                S)
              ) {
                var ja = Math.min(26, 0 | (3.5 + 0.13 * $)) - 15;
                (this.height += ja), (V += 2 * ja);
              }
              (this.firstLine = ea[0]), (this.innerWidth = $);
              for (var aa, ka = [], da = 0; da < ea.length; da++) {
                if (((aa = ea[da]), aa.isScript)) {
                  ka.push(k.move(10, aa.y, aa.el));
                  continue;
                }
                for (var fa, la = aa.height, ma = 0; ma < aa.children.length; ma++) {
                  if (((fa = aa.children[ma]), fa.isArrow)) {
                    ka.push(k.move($ - 10, this.height - 3, fa.el));
                    continue;
                  }
                  var Y = V + (la - fa.height - V - X) / 2 - 1;
                  if (
                    (S && fa.isLabel ? (Y += 0) : fa.isIcon && (Y += 0 | fa.dy),
                    !(this.isRing && ((fa.y = 0 | (aa.y + Y)), fa.isInset))) &&
                    !this.isStack &&
                    (ka.push(k.move(W + fa.x, 0 | (aa.y + Y), fa.el)), "+" === fa.diff)
                  ) {
                    var na = k.insEllipse(fa.width, fa.height);
                    ka.push(k.move(W + fa.x, 0 | (aa.y + Y), na));
                  }
                }
              }
              var oa = this.drawSelf($, this.height, ea);
              return ka.splice(0, 0, oa), this.info.color && k.setProps(oa, { fill: this.info.color }), k.group(ka);
            });
          var N = function Comment(R, S) {
            (this.label = new J(R, ["sb-comment-label"])), (this.width = null), (this.hasBlock = S);
          };
          (N.prototype.isComment = !0),
            (N.lineLength = 16),
            (N.prototype.height = 25),
            (N.prototype.stringify = function () {
              return "// " + this.label.value;
            }),
            (N.prototype.measure = function () {
              this.label.measure();
            }),
            (N.prototype.draw = function () {
              var R = this.label.draw();
              return (
                (this.width = this.label.width + 16),
                k.group([
                  k.commentLine(this.hasBlock ? N.lineLength : 0, 6),
                  k.commentRect(this.width, this.height, { class: "sb-comment" }),
                  k.move(8, 6, R),
                ])
              );
            });
          var O = function Glow(R) {
            a(R),
              (this.child = R),
              R.isBlock ? ((this.shape = R.info.shape), (this.info = R.info)) : (this.shape = "stack"),
              (this.width = null),
              (this.height = null),
              (this.y = 0);
          };
          (O.prototype.isGlow = !0),
            (O.prototype.stringify = function () {
              if (this.child.isBlock) return this.child.stringify("+");
              var R = this.child.stringify().split("\n");
              return R.map(function (S) {
                return "+ " + S;
              }).join("\n");
            }),
            (O.prototype.translate = function (R) {
              this.child.translate(R);
            }),
            (O.prototype.measure = function () {
              this.child.measure();
            }),
            (O.prototype.drawSelf = function () {
              var S,
                R = this.child,
                T = this.width,
                U = this.height - 1;
              if (R.isScript)
                S = !R.isEmpty && R.blocks[0].isHat ? k.hatRect(T, U) : R.isFinal ? k.capRect(T, U) : k.stackRect(T, U);
              else var S = R.drawSelf(T, U, []);
              return k.setProps(S, { class: "sb-diff sb-diff-ins" });
            }),
            (O.prototype.draw = function () {
              var R = this.child,
                S = R.isScript ? R.draw(!0) : R.draw();
              return (
                (this.width = R.width),
                (this.height = (R.isBlock && R.firstLine.height) || R.height),
                k.group([S, this.drawSelf()])
              );
            });
          var P = function Script(R) {
            (this.blocks = R),
              (this.isEmpty = !R.length),
              (this.isFinal = !this.isEmpty && R[R.length - 1].isFinal),
              (this.y = 0);
          };
          (P.prototype.isScript = !0),
            (P.fromJSON = function (R, S) {
              return new P(S.map(M.fromJSON.bind(null, R)));
            }),
            (P.prototype.toJSON = function () {
              return this.blocks[0] && this.blocks[0].isComment
                ? void 0
                : this.blocks.map(function (R) {
                    return R.toJSON();
                  });
            }),
            (P.prototype.stringify = function () {
              return this.blocks
                .map(function (R) {
                  var S = R.stringify();
                  return R.comment && (S += " " + R.comment.stringify()), S;
                })
                .join("\n");
            }),
            (P.prototype.translate = function (R) {
              this.blocks.forEach(function (S) {
                S.translate(R);
              });
            }),
            (P.prototype.measure = function () {
              for (var R = 0; R < this.blocks.length; R++) this.blocks[R].measure();
            }),
            (P.prototype.draw = function (R) {
              var S = [],
                T = 0;
              this.width = 0;
              for (var U = 0; U < this.blocks.length; U++) {
                var V = this.blocks[U],
                  W = R ? 0 : 2,
                  X = V.draw();
                S.push(k.move(W, T, X)), (this.width = Math.max(this.width, V.width));
                var Y = V.diff;
                if ("-" === Y) {
                  var Z = V.width,
                    $ = V.firstLine.height || V.height;
                  S.push(k.move(W, T + $ / 2 + 1, k.strikethroughLine(Z))),
                    (this.width = Math.max(this.width, V.width));
                }
                T += V.height;
                var _ = V.comment;
                if (_) {
                  var aa = V.firstLine,
                    ba = V.innerWidth + 2 + N.lineLength,
                    ca = T - V.height + aa.height / 2,
                    da = _.draw();
                  S.push(k.move(ba, ca - _.height / 2, da)), (this.width = Math.max(this.width, ba + _.width));
                }
              }
              return (
                (this.height = T),
                R || this.isFinal || (this.height += 8),
                !R && V.isGlow && (this.height += 2),
                k.group(S)
              );
            });
          var Q = function Document(R) {
            (this.scripts = R), (this.width = null), (this.height = null), (this.el = null), (this.defs = null);
          };
          return (
            (Q.fromJSON = function (R, S) {
              var S = S || H,
                T = R.scripts.map(function (U) {
                  var V = P.fromJSON(S, U[2]);
                  return (V.x = U[0]), (V.y = U[1]), V;
                });
              return new Q(T);
            }),
            (Q.prototype.toJSON = function () {
              var R = this.scripts
                .map(function (S) {
                  var T = S.toJSON();
                  return T ? [10, S.y + 10, T] : void 0;
                })
                .filter(function (S) {
                  return !!S;
                });
              return { scripts: R };
            }),
            (Q.prototype.stringify = function () {
              return this.scripts
                .map(function (R) {
                  return R.stringify();
                })
                .join("\n\n");
            }),
            (Q.prototype.translate = function (R) {
              this.scripts.forEach(function (S) {
                S.translate(R);
              });
            }),
            (Q.prototype.measure = function () {
              this.scripts.forEach(function (R) {
                R.measure();
              });
            }),
            (Q.prototype.render = function (R) {
              this.measure();
              for (var W, S = 0, T = 0, U = [], V = 0; V < this.scripts.length; V++)
                (W = this.scripts[V]),
                  T && (T += 10),
                  (W.y = T),
                  U.push(k.move(0, T, W.draw())),
                  (T += W.height),
                  (S = Math.max(S, W.width + 4));
              (this.width = S), (this.height = T);
              var X = k.newSVG(S, T);
              X.appendChild(
                (this.defs = k.withChildren(
                  k.el("defs"),
                  [t("bevelFilter", !1), t("inputBevelFilter", !0), u("inputDarkFilter"), z("desaturateFilter")].concat(
                    r()
                  )
                ))
              ),
                X.appendChild(k.group(U)),
                (this.el = X),
                R(X);
            }),
            (Q.prototype.exportSVGString = function () {
              a(this.el, "call draw() first");
              var R = q();
              this.defs.appendChild(R);
              var S = new k.XMLSerializer().serializeToString(this.el);
              return this.defs.removeChild(R), S;
            }),
            (Q.prototype.exportSVG = function () {
              var R = this.exportSVGString();
              return "data:image/svg+xml;utf8," + R.replace(/[#]/g, encodeURIComponent);
            }),
            (Q.prototype.exportPNG = function (R) {
              var S = k.makeCanvas();
              (S.width = this.width), (S.height = this.height);
              var T = S.getContext("2d"),
                U = new Image();
              (U.src = this.exportSVG()),
                (U.onload = function () {
                  if ((T.drawImage(U, 0, 0), URL && URL.createObjectURL && Blob && S.toBlob))
                    S.toBlob(function (W) {
                      R(URL.createObjectURL(W));
                    }, "image/png");
                  else R(S.toDataURL("image/png"));
                });
            }),
            { Label: J, Icon: K, Input: L, Block: M, Comment: N, Glow: O, Script: P, Document: Q }
          );
        })();
      },
      { "./blocks.js": 2, "./draw.js": 4, "./style.js": 8 },
    ],
    8: [
      function (require, module, exports) {
        "use strict";
        function _defineProperty(a, b, c) {
          return (
            b in a
              ? Object.defineProperty(a, b, { value: c, enumerable: !0, configurable: !0, writable: !0 })
              : (a[b] = c),
            a
          );
        }
        var SVG = require("./draw.js"),
          Filter = require("./filter.js"),
          Style = (module.exports = {
            cssContent: '\n    .sb-label {\n      font-family: "Helvetica Neue", Helvetica, sans-serif;\n      font-weight: normal;\n      fill: #fff;\n      font-size: 11px;\n      word-spacing: 0px;\n      opacity: 1;\n    }\n\n    .sb-obsolete { fill: #ED4242; }\n    .sb-motion { fill: #4C97FF; }\n    .sb-looks { fill: #9966FF; }\n    .sb-sound { fill: #CF63CF; }\n    .sb-pen { fill: #0fBD8C;  }\n    .sb-events { fill: #FFBF00; }\n    .sb-control { fill: #FFAB19; }\n    .sb-sensing { fill: #5CB1D6; }\n    .sb-operators { fill: #59C059; }\n    .sb-variables { fill: #FF8C1A; }\n    .sb-list { fill: #FF661A }\n    .sb-custom { fill: #FF6680; }\n    .sb-custom-arg { fill: #FF6680; }\n    .sb-oldextension { fill: #4b4a60; }\n    .sb-extension { fill: #0fbd8c; }\n    .sb-grey { fill: #969696; }\n\n    .sb-bevel {\n      filter2: url(#bevelFilter);\n      stroke: #000;\n      stroke-opacity: 0.15;\n      stroke-alignment: inner;\n    }\n    .sb-input-round-dropdown,\n    .sb-input-boolean {\n      filter: url(#inputDarkFilter);\n    }\n    .sb-input {\n      filter2: url(#inputBevelFilter);\n      stroke: #000;\n      stroke-opacity: 0.15;\n      stroke-alignment: inner;\n    }\n    .sb-input-number,\n    .sb-input-string,\n    .sb-input-number-dropdown {\n      fill: #fff;\n    }\n    .sb-literal-number,\n    .sb-literal-string,\n    .sb-literal-number-dropdown,\n    .sb-literal-dropdown {\n      font-weight: normal;\n      font-size: 11px;\n      word-spacing: 0;\n    }\n    .sb-literal-number,\n    .sb-literal-string,\n    .sb-literal-number-dropdown {\n      fill: #444;\n    }\n\n    .sb-darker {\n      filter2: url(#inputDarkFilter);\n      stroke: #000;\n      stroke-opacity: 0.1;\n      stroke-alignment: inner;\n    }\n    .sb-desaturate {\n      filter: url(#desaturateFilter);\n    }\n\n    .sb-outline {\n      stroke: #000;\n      stroke-opacity: 0.1;\n      stroke-width: 1;\n      fill: #FF4D6A;\n    }\n\n    .sb-define-hat-cap {\n      stroke: #632d99;\n      stroke-width: 1;\n      fill: #8e2ec2;\n    }\n\n    .sb-comment {\n      fill: #E4DB8C;\n      stroke: #000;\n      stroke-opacity: 0.2;\n      stroke-width: 1;\n    }\n    .sb-comment-line {\n      fill: #000;\n      opacity: 0.2;\n    }\n    .sb-comment-label {\n      font-family: "Helvetica Neue", Helvetica, sans-serif;\n      font-weight: normal;\n      fill: #000;\n      font-size: 11px;\n      word-spacing: 0px;\n      opacity: 1;\n    }\n\n    .sb-diff {\n      fill: none;\n      stroke: #000;\n    }\n    .sb-diff-ins {\n      stroke-width: 2px;\n    }\n    .sb-diff-del {\n      stroke-width: 3px;\n    }\n  '.replace(
              /[ \n]+/,
              " "
            ),
            makeIcons: function makeIcons() {
              return [
                SVG.setProps(
                  SVG.group([
                    SVG.el("path", {
                      d:
                        "M20.8 3.7c-.4-.2-.9-.1-1.2.2-2 1.6-4.8 1.6-6.8 0-2.3-1.9-5.6-2.3-8.3-1v-.4c0-.6-.5-1-1-1s-1 .4-1 1v18.8c0 .5.5 1 1 1h.1c.5 0 1-.5 1-1v-6.4c1-.7 2.1-1.2 3.4-1.3 1.2 0 2.4.4 3.4 1.2 2.9 2.3 7 2.3 9.8 0 .3-.2.4-.5.4-.9V4.7c0-.5-.3-.9-.8-1zm-.3 10.2C18 16 14.4 16 11.9 14c-1.1-.9-2.5-1.4-4-1.4-1.2.1-2.3.5-3.4 1.1V4c2.5-1.4 5.5-1.1 7.7.6 2.4 1.9 5.7 1.9 8.1 0h.2l.1.1-.1 9.2z",
                      fill: "#45993d",
                    }),
                    SVG.el("path", {
                      d:
                        "M20.6 4.8l-.1 9.1v.1c-2.5 2-6.1 2-8.6 0-1.1-.9-2.5-1.4-4-1.4-1.2.1-2.3.5-3.4 1.1V4c2.5-1.4 5.5-1.1 7.7.6 2.4 1.9 5.7 1.9 8.1 0h.2c0 .1.1.1.1.2z",
                      fill: "#4cbf56",
                    }),
                  ]),
                  { id: "greenFlag", transform: "scale(0.65) translate(-3 4)" }
                ),
                SVG.setProps(
                  SVG.group([
                    SVG.el("path", {
                      d:
                        "M22.68 12.2a1.6 1.6 0 0 1-1.27.63h-7.69a1.59 1.59 0 0 1-1.16-2.58l1.12-1.41a4.82 4.82 0 0 0-3.14-.77 4.31 4.31 0 0 0-2 .8A4.25 4.25 0 0 0 7.2 10.6a5.06 5.06 0 0 0 .54 4.62A5.58 5.58 0 0 0 12 17.74a2.26 2.26 0 0 1-.16 4.52A10.25 10.25 0 0 1 3.74 18a10.14 10.14 0 0 1-1.49-9.22 9.7 9.7 0 0 1 2.83-4.14A9.92 9.92 0 0 1 9.66 2.5a10.66 10.66 0 0 1 7.72 1.68l1.08-1.35a1.57 1.57 0 0 1 1.24-.6 1.6 1.6 0 0 1 1.54 1.21l1.7 7.37a1.57 1.57 0 0 1-.26 1.39z",
                      fill: "#3d79cc",
                    }),
                    SVG.el("path", {
                      d:
                        "M21.38 11.83h-7.61a.59.59 0 0 1-.43-1l1.75-2.19a5.9 5.9 0 0 0-4.7-1.58 5.07 5.07 0 0 0-4.11 3.17A6 6 0 0 0 7 15.77a6.51 6.51 0 0 0 5 2.92 1.31 1.31 0 0 1-.08 2.62 9.3 9.3 0 0 1-7.35-3.82 9.16 9.16 0 0 1-1.4-8.37A8.51 8.51 0 0 1 5.71 5.4a8.76 8.76 0 0 1 4.11-1.92 9.71 9.71 0 0 1 7.75 2.07l1.67-2.1a.59.59 0 0 1 1 .21L22 11.08a.59.59 0 0 1-.62.75z",
                      fill: "#fff",
                    }),
                  ]),
                  { id: "turnRight", transform: "scale(0.65) translate(-2 -5)" }
                ),
                SVG.setProps(
                  SVG.group([
                    SVG.el("path", {
                      d:
                        "M20.34 18.21a10.24 10.24 0 0 1-8.1 4.22 2.26 2.26 0 0 1-.16-4.52 5.58 5.58 0 0 0 4.25-2.53 5.06 5.06 0 0 0 .54-4.62A4.25 4.25 0 0 0 15.55 9a4.31 4.31 0 0 0-2-.8 4.82 4.82 0 0 0-3.15.8l1.12 1.41A1.59 1.59 0 0 1 10.36 13H2.67a1.56 1.56 0 0 1-1.26-.63A1.54 1.54 0 0 1 1.13 11l1.72-7.43A1.59 1.59 0 0 1 4.38 2.4a1.57 1.57 0 0 1 1.24.6L6.7 4.35a10.66 10.66 0 0 1 7.72-1.68A9.88 9.88 0 0 1 19 4.81 9.61 9.61 0 0 1 21.83 9a10.08 10.08 0 0 1-1.49 9.21z",
                      fill: "#3d79cc",
                    }),
                    SVG.el("path", {
                      d:
                        "M19.56 17.65a9.29 9.29 0 0 1-7.35 3.83 1.31 1.31 0 0 1-.08-2.62 6.53 6.53 0 0 0 5-2.92 6.05 6.05 0 0 0 .67-5.51 5.32 5.32 0 0 0-1.64-2.16 5.21 5.21 0 0 0-2.48-1A5.86 5.86 0 0 0 9 8.84L10.74 11a.59.59 0 0 1-.43 1H2.7a.6.6 0 0 1-.6-.75l1.71-7.42a.59.59 0 0 1 1-.21l1.67 2.1a9.71 9.71 0 0 1 7.75-2.07 8.84 8.84 0 0 1 4.12 1.92 8.68 8.68 0 0 1 2.54 3.72 9.14 9.14 0 0 1-1.33 8.36z",
                      fill: "#fff",
                    }),
                  ]),
                  { id: "turnLeft", transform: "scale(0.65) translate(-2 -5)" }
                ),
                SVG.el("path", { d: "M0 0L4 4L0 8Z", fill: "#111", id: "addInput" }),
                SVG.el("path", { d: "M4 0L4 8L0 4Z", fill: "#111", id: "delInput" }),
                SVG.setProps(
                  SVG.group([
                    SVG.el("path", {
                      d:
                        "M23.3 11c-.3.6-.9 1-1.5 1h-1.6c-.1 1.3-.5 2.5-1.1 3.6-.9 1.7-2.3 3.2-4.1 4.1-1.7.9-3.6 1.2-5.5.9-1.8-.3-3.5-1.1-4.9-2.3-.7-.7-.7-1.9 0-2.6.6-.6 1.6-.7 2.3-.2H7c.9.6 1.9.9 2.9.9s1.9-.3 2.7-.9c1.1-.8 1.8-2.1 1.8-3.5h-1.5c-.9 0-1.7-.7-1.7-1.7 0-.4.2-.9.5-1.2l4.4-4.4c.7-.6 1.7-.6 2.4 0L23 9.2c.5.5.6 1.2.3 1.8z",
                      fill: "#cf8b17",
                    }),
                    SVG.el("path", {
                      d:
                        "M21.8 11h-2.6c0 1.5-.3 2.9-1 4.2-.8 1.6-2.1 2.8-3.7 3.6-1.5.8-3.3 1.1-4.9.8-1.6-.2-3.2-1-4.4-2.1-.4-.3-.4-.9-.1-1.2.3-.4.9-.4 1.2-.1 1 .7 2.2 1.1 3.4 1.1s2.3-.3 3.3-1c.9-.6 1.6-1.5 2-2.6.3-.9.4-1.8.2-2.8h-2.4c-.4 0-.7-.3-.7-.7 0-.2.1-.3.2-.4l4.4-4.4c.3-.3.7-.3.9 0L22 9.8c.3.3.4.6.3.9s-.3.3-.5.3z",
                      fill: "#fff",
                    }),
                  ]),
                  { id: "loopArrow", transform: "scale(0.65) translate(-15 -25)" }
                ),
                SVG.setProps(
                  SVG.group([
                    SVG.el("path", {
                      d:
                        "M12.71 2.44A2.41 2.41 0 0 1 12 4.16L8.08 8.08a2.45 2.45 0 0 1-3.45 0L.72 4.16A2.42 2.42 0 0 1 0 2.44 2.48 2.48 0 0 1 .71.71C1 .47 1.43 0 6.36 0s5.39.46 5.64.71a2.44 2.44 0 0 1 .71 1.73z",
                      fill: "#231f20",
                      opacity: ".1",
                    }),
                    SVG.el("path", {
                      d:
                        "M6.36 7.79a1.43 1.43 0 0 1-1-.42L1.42 3.45a1.44 1.44 0 0 1 0-2c.56-.56 9.31-.56 9.87 0a1.44 1.44 0 0 1 0 2L7.37 7.37a1.43 1.43 0 0 1-1.01.42z",
                      fill: "#fff",
                    }),
                  ]),
                  { id: "whiteDropdownArrow", transform: "scale(0.65)" }
                ),
                SVG.setProps(
                  SVG.group([
                    SVG.el("path", {
                      d:
                        "M12.71 2.44A2.41 2.41 0 0 1 12 4.16L8.08 8.08a2.45 2.45 0 0 1-3.45 0L.72 4.16A2.42 2.42 0 0 1 0 2.44 2.48 2.48 0 0 1 .71.71C1 .47 1.43 0 6.36 0s5.39.46 5.64.71a2.44 2.44 0 0 1 .71 1.73z",
                      fill: "#231f20",
                      opacity: ".1",
                    }),
                    SVG.el("path", {
                      d:
                        "M6.36 7.79a1.43 1.43 0 0 1-1-.42L1.42 3.45a1.44 1.44 0 0 1 0-2c.56-.56 9.31-.56 9.87 0a1.44 1.44 0 0 1 0 2L7.37 7.37a1.43 1.43 0 0 1-1.01.42z",
                      fill: "#111",
                    }),
                  ]),
                  { id: "blackDropdownArrow", transform: "scale(0.65)" }
                ),
                SVG.setProps(
                  SVG.group([
                    SVG.el("path", {
                      d:
                        "M28.456 21.675c-.009-.312-.087-.825-.256-1.702-.096-.495-.612-3.022-.753-3.73-.395-1.98-.76-3.92-1.142-6.113-.732-4.223-.693-6.05.344-6.527.502-.23 1.06-.081 1.842.35.413.227 2.181 1.365 2.07 1.296 1.993 1.243 3.463 1.775 4.928 1.549 1.527-.237 2.505-.06 2.877.618.348.635.015 1.416-.729 2.18-1.473 1.516-3.976 2.514-5.849 2.023-.822-.218-1.238-.464-2.38-1.266a9.737 9.737 0 0 0-.095-.066c.047.593.264 1.74.717 3.803.294 1.336 2.079 9.187 2.637 11.674l.002.012c.529 2.637-1.872 4.724-5.235 4.724-3.29 0-6.363-1.988-6.862-4.528-.53-2.64 1.873-4.734 5.233-4.734a8.411 8.411 0 0 1 2.65.437zM11.46 27.666c-.01-.319-.091-.84-.266-1.738-.09-.46-.595-2.937-.753-3.727-.39-1.96-.752-3.892-1.131-6.07-.732-4.224-.692-6.052.344-6.527.502-.23 1.06-.082 1.841.349.414.228 2.181 1.365 2.07 1.296 1.992 1.243 3.461 1.775 4.925 1.549 1.525-.24 2.504-.064 2.876.614.348.635.015 1.415-.728 2.18-1.474 1.517-3.977 2.513-5.847 2.017-.822-.218-1.237-.463-2.38-1.266a9.729 9.729 0 0 0-.094-.065c.047.593.264 1.74.717 3.802.294 1.337 2.078 9.19 2.636 11.675l.003.013c.517 2.638-1.884 4.732-5.234 4.732-3.286 0-6.359-1.993-6.87-4.54-.518-2.639 1.885-4.73 5.242-4.73.904 0 1.802.15 2.65.436z",
                      stroke: "#000",
                      "stroke-opacity": ".1",
                    }),
                    SVG.el("path", {
                      d:
                        "M32.18 25.874C32.636 28.157 30.512 30 27.433 30c-3.07 0-5.923-1.843-6.372-4.126-.458-2.285 1.665-4.136 4.743-4.136.647 0 1.283.084 1.89.234a7 7 0 0 1 .938.302c.87-.02-.104-2.294-1.835-12.229-2.134-12.303 3.06-1.87 8.768-2.753 5.708-.885.076 4.82-3.65 3.844-3.724-.987-4.65-7.153.263 14.738zm-16.998 5.99C15.63 34.148 13.507 36 10.439 36c-3.068 0-5.92-1.852-6.379-4.136-.448-2.284 1.674-4.135 4.751-4.135 1.002 0 1.974.197 2.854.544.822-.055-.15-2.377-1.862-12.228-2.133-12.303 3.059-1.87 8.764-2.753 5.706-.894.076 4.821-3.648 3.834-3.723-.987-4.648-7.152.263 14.738z",
                      fill: "#FFF",
                    }),
                  ]),
                  { id: "music", fill: "none", transform: "scale(0.65)" }
                ),
                SVG.setProps(
                  SVG.group([
                    SVG.el("path", {
                      d:
                        "M8.753 34.602l-4.251 1.779 1.784-4.236c1.218-2.892 2.907-5.423 5.03-7.538L31.066 4.93c.846-.842 2.65-.41 4.032.967 1.38 1.375 1.816 3.173.97 4.015L16.318 29.59c-2.123 2.116-4.664 3.799-7.565 5.012",
                      fill: "#FFF",
                    }),
                    SVG.el("path", { d: "M29.41 6.111s-4.45-2.379-8.202 5.771c-1.734 3.766-4.35 1.546-4.35 1.546" }),
                    SVG.el("path", {
                      d:
                        "M36.42 8.825c0 .463-.14.873-.432 1.164l-9.335 9.301c.282-.29.41-.668.41-1.12 0-.874-.507-1.963-1.406-2.868-1.362-1.358-3.147-1.8-4.002-.99L30.99 5.01c.844-.84 2.65-.41 4.035.96.898.904 1.396 1.982 1.396 2.855M10.515 33.774a23.74 23.74 0 0 1-1.764.83L4.5 36.382l1.786-4.235c.258-.604.529-1.186.833-1.757.69.183 1.449.625 2.109 1.282.659.658 1.102 1.412 1.287 2.102",
                      fill: "#4C97FF",
                    }),
                    SVG.el("path", {
                      d:
                        "M36.498 8.748c0 .464-.141.874-.433 1.165l-19.742 19.68c-2.131 2.111-4.673 3.793-7.572 5.01L4.5 36.381l.974-2.317 1.925-.808c2.899-1.218 5.441-2.899 7.572-5.01l19.742-19.68c.292-.292.432-.702.432-1.165 0-.647-.27-1.4-.779-2.123.249.172.498.377.736.614.898.905 1.396 1.983 1.396 2.856",
                      fill: "#575E75",
                      opacity: ".15",
                    }),
                    SVG.el("path", {
                      d: "M18.45 12.831a.904.904 0 1 1-1.807 0 .904.904 0 0 1 1.807 0z",
                      fill: "#575E75",
                    }),
                  ]),
                  { id: "pen", stroke: "#575E75", fill: "none", "stroke-linejoin": "round", transform: "scale(0.65)" }
                ),
                SVG.setProps(
                  SVG.group([
                    SVG.el("circle", { opacity: 0.25, cx: 32, cy: 16, r: 4.5 }),
                    SVG.el("circle", { opacity: 0.5, cx: 32, cy: 12, r: 4.5 }),
                    SVG.el("circle", { opacity: 0.75, cx: 32, cy: 8, r: 4.5 }),
                    SVG.el("circle", { cx: 32, cy: 4, r: 4.5 }),
                    SVG.el("path", {
                      d:
                        "M22.672 4.42l-6.172 4V6.1c0-2.01-1.563-3.6-3.5-3.6H4.1C2.076 2.5.5 4.076.5 6.1V14c0 1.927 1.584 3.512 3.6 3.6H13c1.902 0 3.5-1.653 3.5-3.6v-2.283l6.257 3.754.097.075c.02.02.098.054.146.054.267 0 .5-.217.5-.5V4.8c0 .037-.056-.094-.129-.243-.145-.242-.43-.299-.7-.137z",
                      fill: "#4D4D4D",
                      "stroke-linejoin": "round",
                    }),
                  ]),
                  { id: "video", stroke: "#000", fill: "#FFF", "stroke-opacity": 0.15, transform: "scale(0.65)" }
                ),
                SVG.setProps(
                  SVG.group([
                    SVG.el("path", {
                      d:
                        "M25.644 20.5c-1.667 1.937-4.539 3.429-5.977 3.429a1.25 1.25 0 0 1-.557-.137c-.372-.186-.61-.542-.61-1.03 0-.105.017-.207.05-.308.076-.236.624-.986.727-1.173.27-.484.462-1.075.566-1.865A8.5 8.5 0 0 1 24 3.5h4a8.5 8.5 0 1 1 0 17h-2.356z",
                      fill: "#FFF",
                    }),
                    SVG.el("path", {
                      d:
                        "M15.5 21.67c0-1.016-1.494-1.586-2.387-.782l-2.7 2.163A5.958 5.958 0 0 1 6.7 24.33h-.4c-1.035 0-1.8.69-1.8 1.573v4.235c0 .883.765 1.572 1.8 1.572h.4c1.458 0 2.754.423 3.82 1.287l2.598 2.161c.908.75 2.382.188 2.382-.876V21.67z",
                      fill: "#4D4D4D",
                    }),
                  ]),
                  { id: "tts", stroke: "#000", "stroke-opacity": 0.15, transform: "scale(0.65)" }
                ),
                SVG.el("image", {
                  id: "translate",
                  width: "40px",
                  height: "40px",
                  transform: "scale(0.65)",
                  href:
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAABTVBMVEX///8AAAAAAAAAAAAAAABqamoAAAAAAAAAAAAAAACurq7Ly8vV1dXZ2dnS0tLDw8MAAAAAAAAAAAAAAADb29vq6urz8/P6+vr////9/f319fXx8fHl5eXPz89HR0e2trbu7u7X19ekpKTe3t74+Pjn5+fg4ODi4uIAAACEhISWlpa9vb0AAAAAAADH3v/0+P8AAADHx8e41f9Rmf9WnP/p8v+Pvv9Nl/9Ynf/S5f9ho/9Smv+82P9PmP9Ml/+Rv/9uqv9mpf9coP+MvP9an/9zrf9Qmf+rzf+Dtv9op/+10/+bxP/d6/96sf9jpP+5ubkAAABrqf92r/9/tP9GieeOrtnW19mgx/96otnZ4u5Znv/q6+5XXnXV19ygpLGWmqhhZ3309fbKzNTAwsuLkKBtbW3s7OxMTEy1uMJ2fI5rcobf4eVFRUWBhperrrqQI7PpAAAAbXRSTlMADBUdJkERBQIfeLzl/9ehGA4aJP///////////8kyhf/yav//////E09ckwcK//8hrv///////////////////////////////////////0b//////////////////////////z//L/////80bccdAQAABJxJREFUeAHtmOd/qkoTgDELVhZLiKwRseuRA5Y00uT03nvvvf7/H++CmVzNsvvD+74f85ie8DCzO2EGpFOiOSWxgmRFRiiZ+r/o0plsTsUULa8UhMp0sbQqc1ktFdNSQCmnr5UNUlmvmrimJPm+pFXXsACtboVHy7hBjjDMZqvA8xVazXajQ7h0Gu3Z0TLukmMaOFvg+LJwYh5wdCGPe/1+wyAhVZw9E5lvC1dFLji6lZTSaGC3zmpw/mpTidiZtNVskBg0mhbdGcd1i6jVPMq8X4tIulhvk1i060U4ZNCc5WRgJeGcFJa0iACHo4gQtZIU4ozt/FEQ5sS2x4lF4Spm93djc2ub3Wu8KgWkLI1uzWxjyv0eVgfuglDGhGHH290jDFieFUVOn8+prKul/02IcJnMY2CLJxzte8ABfLE/YoWLVVbGMk94OPUZpodMypN2Zc5X6dX4KZ87f/6C5108H3Lgb144f/4Sk3La0nqVOZ9mOaI1HHn+ZfjiIHINJQeMkT5mU674V8MNuTb1rkcKwcjxMcK9q96NIMBd/+o2RwhG8ImFZN+7epOQW1PvfHTZgNFgfBzh3tQ/2L7t+d52pBCMOdzHNfCJC/sOrb4Df3orurDBOFbqyhh8YiFdPlrRdwlHCLiuKwFiITn0fEiYIwTiCa9d9egKHgyDbayaOgbu3ed0Q7Hw9oOrPl1Dz58+3G6ATdQNxcK9R1ep6vpodHfqe4+fPI3XDbnCm/tTqtsdEsqzzcfP43ZDnnC4STdj89aIhLx4Ersb8lrA8ODqy2tw/avoOH435DWp7dvzp166G4rbqBkrQOiGMRq9jvn7y3bDGKMIxiQmWOYPS2Lhq9eUNwIhO86JhW8D4TuOkB0458LsBv+5rPB9IHz/QSyEkRgp2Dj2NQeyfJ8Rfnwd8imGMOy2JlS02RwUo65Cn2l4NMjPsYSuDVXSaWtfqI8VfggW8B398CqOMKOtzcL7ivPfHClK+J26PgZpf48jlHEn1OmqXUpLkcIfr1//DDfmZxzheGKul7u6moXxkRH+orG9JSTI+VcMYfK3htVJa1zkXsnfzkwfoRR5QqBYQmjFEbQGmivwPoYQuiJX+AlsUIoiIfTtjCDCz9TzJ+Q1lKJI6Fg13Mc5y4kSwnXhBwn5CaXIFcI0ZcDsEyH8/m/9vYUvuUJ2OmOEEBbUz0+hkJ0fWeHfv3+/z339ly/kTrirS7cAxgfGNNMNl2pSpdrMB8b2pPBfbyphrconRgG0/G3vPBY2TtwYoaVvzBdAqj4fYkPPFZZ9dLCIO1Bxrz9zGv0e1qzU0g83FkmMbRsaSjtvjx3h45fuXHDMwAk4CWh5VdqfhA+IBs1jo4EVxIzEQKHWhw7aQkXXdSQOxUHThCozaYHxSCnNKiSinbXtAUrzjF+0NvRHbLtc45ks1IjR6NOtyXNP7nzL46+zINe0jBQJWyNdwT1JumSreqjs8P4KasQ0QNgQ/mlinFX1bnndnIwlAUmlhs3qeoUY5TU9V5JEFMetiYq130lJRKqg5MOyU3PZTFoS46wgVIIezlcmEZIHMlrh/OUpp/wDfCaVjn0YjrEAAAAASUVORK5CYII=",
                }),
                SVG.el("image", {
                  id: "microbit",
                  width: "40px",
                  height: "40px",
                  transform: "scale(0.65)",
                  href:
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAKQElEQVR4AeybBVAcSxeF4+4OwcND4hV3fB1NFuLu7i5IXLCHS9wV97cQd3d3d/e9/9wh6YI/AwOT2dqF2q46leb07e7b3/RMr2RLaIu2aIu2aIu2aIu2aIu2aIu2aIu2aIv6SuSG1I3ha5NOb9ihOJt58MyV/5di/5mr4RtSTkZtTL0Wvi59bJFZGACUbN68eWUzM7M6TY2N6zcxMmqgCvkGbVakpe+HjMxDkLn3CKPSFQchLeMALF21doWq8sA1WlhY1LY2sq7ACzwcTDA5Lkqy/MEnWehPpSwUoGBSgnDijjzbhRP+bJMsvga2soFgI/RQm2yFHh9thO77O9pIhaamptX+CqC5uXlVwbSkraywGOA5DA8DW5fRecHDZNUMjwWkyONLZyupDQWxPGeAuJ2lAW9+cIGHSRCADPBQGgqPyFogj2nWrFlNzrdvl74+1lzhEYDM8FAaDI/oBj77OQPsOsBPyhUeAcgMD6XZ8FAC9wfULVxXNQBZ4BGAzPBQf8KTDQLBiAgQjN3IoE1gP9gfbEQ9iwVAFngEIIHHJju38SBZ8RCkfq9BNP84iOcezC3PMyAL+gLiBSfAVtK/uAAk8P5aIs9TIPV9DjaOQ8FG3PfPiyHpA3Yes3BO3I3FASB/8FBSv5cgmr3vV/017l7ShvOIZmVhnYYsmnOwqAPkFx5K4n2OgvMCbJ2G5b0De82h5xeM316UAfIPD2UnnwoSahdK/d+CmLqdRfOP5pLY5wLIgr6CZOFlPGyKEEDVwyOydR4BgnFbQTglDoSTY3MJPcHI1bgTi+opTOAVG9n38QSJ1zkQe1PyOY+i63buU/kDWFzhoRyGBILr7FRw8TySvUmCPoOQPF95A0jgFUuAzkuugvOK+wQePiJ4A9it33KJKuD1GzwBho2eDiKnfsTr2X8s7Tm6DSJejz6jaM/FfSjxsE552EY87IMejlFIgLjzmOHxAbBdZ4c2qrjyp89egEePn8CUGT7Ey9x3iPaW+4YSLzY+lfai124hHtYpD9uIh33QwzEKC1D6LwM8TQd46MhxesGjxs8mXkJyGu15+awi3qYtu2gvICiSeFinPGwjHvZBD8co1CHSbxEIJu4m8FQO0FrgDlb2bmBlx6xu9t0xhjXxLtaO0MlKClYOPYjX1cY526PGIJ6tC3rUuG7EwzrlYRvxsA96OEbe8zLkL6A95vx5BogfLoJH37GwYHEoeC0NY9Qc7zAQyPpq2mHBPX8+AXazc4Ulvuvg/oNHcP8hs67duAuTZizFnaVJhwj3/HkFaOsKq4I20s8a1M1btyEtIwsUmfvh3v0H2d7tezB19gqwJgDVf4hwyl/VAK9evQ4jxs4EsXN/cJEPBe/FfvDg4SN2gOo5RLjnzwdAqetAuHTlOqzwDSYJ7IlJAntJbyC3Wq+RcOjwMXaAajxEEGBB8w8MjqLXLHMd+PCvAcqpZ83Xr99g+44YksCumEQqgV4kAfe+o1kAql8IsKD5xyek0Wvu2W/0I15uYdyFORO4efMW9fzyBrHzAHDuPhh8FrHcwuo/RAqbP65ZtYfI1es3yEP4/oOHmnuIcM+f/5cxS/3W4suAPHXtxh2YMtsXrDTrEOGeP/8vpMfBgsXh4L00jFGzvYJA6NhPw96JcM9f9W/lRH3Y38qpX1zeiqr+wwRb2WAQLziO3+dq9MdZHKR6gAhPNHsvSAI/4JdBmv9xlgYBJPDwk2ppwDsEqPEfZ6kfIAM856XX2AGq/xDRGID4oSOBhx+Du02PAadFlwhADZf6ATqMigLJwosg9j6fLa+z1N8X8Ltc7SFSjL4TKdYAtYcIR2kPkWIi9QMc1EcIkZ5NH0V5Nb20eGr7r7ai/N+22YnlsHmJ5bcz6+s+PbGm3rt54zqTNrZ+GxY3+XEgUuexIkTvWUH7oQJmt1KeWFvvxaEonWe+M1sr2XJ0dnGB/4INPp1aW/dJ6r+GHwb0FqsGYH9q4ORAg6M4YEujljX8ppv3ifZu+iW/5OJ8G31d5204GOOFXevonFxT99qMUd1YIcT7N/oRMe+fqfgTA/xf8on+hskF6RcyrwUkB+itb9KkSS3U1iWmwcFzW+YZ7yDpAafX1n23YoxR+5ZGRjUWjarX/Oz6Oq+cnF34B7h9mRlMHWHREX1sb21iUn1feMMb9mI5Y3J45Y9G17/5+9c+np6epYJnGDumBRnmCwH7nV1X5yUC+J1H++YN9RIDTL6zAEQYH3MuGOuKEIN3ecVPGmZNbQr9mI4dO1b8FV8+ZqVhpNfEjvwDVITow6rJZh7W1tZlsA0XeH5jned4CzAlJ5J1h/Mbaj/DOIxv3bp1Wf8Zlv2PRTfIFwL2u7Oz6ifcedhPLpeXHjPIstWR6AZKNoC3dlT7bk3BxouFsjQ01Dm3ofa3vOLnj+8M6UH6mVSOVXDNVI6V9qw03uo/u5VqAF7ZUvON1xgzO9wRu1ca74CsEsr8AGJ7zEqjLd2a6urPHW0quLq15tuCAITMEpAapL9X2sXAZFJ/s3an1tV9zNYP9SS2EuyP0Lkk6mxu3q2l5T/JgYZn0MsP4MfUMspoT7OZ+Kus4Dlmo5/HV/jBK0APuQz2rDSFa1tr4MJoKTNLKH/Xz66vDVmhenBsdX04EtUADkbqwFGqfiBChzH+ZUJ5OI6x0Q2oGF28zWFfuC7dnzpoICusYe5+Wdl9X1H9MGY/3acBNUY9+qKeXlcXzqyvQ9e/ppci/X7+mvML5eF8CipH6kJgPMbS3vVt1chcv+NRCf7GGMMPwCH9hHhlKVXMTk5REj6nlcN6Lr1NLkvqb5Jyt3/PKJPr7/cpzLEfUnPG4eLLwY//SgOJTSyXYwwSCwSCIvvfj6kV8pzvh4LMReb4llEWPqWVh1eJVeBDSkU4HN0A21QD8PQGE9gf1aRQAFNCWnECeGajCZzfZFhogNtWdYUD0Y3hWXx1VoDpYS0hNqA9hPqIIWKhEDJCW/IDEEvT1q0bUQCVBCC94Mpwc4dOYQBSfWtyAnh5qx5CKDTAsxuN4fp2XapekhXgje06cHGzAf0vbo5LW/QJQCuB/Cz+XpozQOw8ZrDdyZwAiQoOEMUJIFHhAOYWC0AGEYDU15sr8TfTnAFSx3u50QNaCKgH7uf/tXPWCBFDURSdEnd3Ghxa1kiPu7trh7tHx911DbybLTAV3BNPniX5kh9L/rMDqK1W54a6hzpxOWT7Dfh3AC4J7mYaLpSVakf0oDiRPinIYpo6Kcgoq9WOm6mmr4/FGrvUvvrTTIP6vlBrv5+u/87I9sxpQTZ2WJTENHNWkPVsl4c+IbtQpz9MN6gfIns33aC8z9ean0s19uvJps+syGGIix58pY4LMv6dkgh83M80KK/zdQZkryaaP5XlGsf3crUT85JL0ogpcVyYgm8swzf8XYndb0u2xpKFLWO9wgtZ+JBpOnlcmEmeFKR2RtrHhgfq6nHNa8sHOAu4WscF518f8IMNtEisFhchhBBCCCGEEEJIPvkBF5B61BH0sY4AAAAASUVORK5CYII=",
                }),
                SVG.setProps(
                  SVG.group([
                    SVG.el("path", {
                      d: "M23.513 11.17h-.73c-.319 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479",
                      fill: "#7C87A5",
                    }),
                    SVG.el("path", {
                      d: "M24.91 11.17h-.73c-.319 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479z",
                    }),
                    SVG.el("path", {
                      d: "M9.54 11.17h-.728c-.32 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.257-.479-.577-.479",
                      fill: "#7C87A5",
                    }),
                    SVG.el("path", {
                      d: "M10.938 11.17h-.729c-.32 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.257-.479-.577-.479z",
                    }),
                    SVG.el("path", {
                      d: "M26.305 11.17h-.73c-.318 0-.574.213-.574.478v1.08h1.882v-1.08c0-.265-.26-.479-.578-.479",
                      fill: "#7C87A5",
                    }),
                    SVG.el("path", {
                      d: "M27.702 11.17h-.73c-.318 0-.574.213-.574.478v1.08h1.882v-1.08c0-.265-.26-.479-.578-.479z",
                    }),
                    SVG.el("path", {
                      d: "M29.101 11.17h-.73c-.318 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479",
                      fill: "#7C87A5",
                    }),
                    SVG.el("path", {
                      d: "M30.498 11.17h-.73c-.318 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479z",
                    }),
                    SVG.el("path", {
                      d: "M17.925 11.17h-.73c-.319 0-.577.213-.577.478v1.08h1.883v-1.08c0-.265-.258-.479-.576-.479",
                      fill: "#7C87A5",
                    }),
                    SVG.el("path", {
                      d: "M19.322 11.17h-.73c-.319 0-.577.213-.577.478v1.08h1.883v-1.08c0-.265-.258-.479-.576-.479z",
                    }),
                    SVG.el("path", {
                      d: "M20.717 11.17h-.73c-.319 0-.575.213-.575.478v1.08h1.883v-1.08c0-.265-.26-.479-.578-.479",
                      fill: "#7C87A5",
                    }),
                    SVG.el("path", {
                      d: "M22.114 11.17h-.73c-.319 0-.575.213-.575.478v1.08h1.883v-1.08c0-.265-.26-.479-.578-.479z",
                    }),
                    SVG.el("path", {
                      d: "M15.129 11.17H14.4c-.32 0-.576.213-.576.478v1.08h1.883v-1.08c0-.265-.258-.479-.578-.479",
                      fill: "#7C87A5",
                    }),
                    SVG.el("path", {
                      d: "M16.526 11.17h-.729c-.32 0-.576.213-.576.478v1.08h1.883v-1.08c0-.265-.258-.479-.578-.479z",
                    }),
                    SVG.el("path", {
                      d: "M12.335 11.17h-.73c-.319 0-.575.213-.575.478v1.08h1.882v-1.08c0-.265-.26-.479-.577-.479",
                      fill: "#7C87A5",
                    }),
                    SVG.el("path", {
                      d: "M13.732 11.17h-.73c-.319 0-.575.213-.575.478v1.08h1.883v-1.08c0-.265-.26-.479-.578-.479z",
                    }),
                    SVG.el("path", {
                      d: "M31.893 11.17h-.73c-.318 0-.574.213-.574.478v1.08h1.882v-1.08c0-.265-.26-.479-.578-.479",
                      fill: "#7C87A5",
                    }),
                    SVG.el("path", {
                      d: "M33.29 11.17h-.73c-.318 0-.574.213-.574.478v1.08h1.882v-1.08c0-.265-.26-.479-.578-.479z",
                    }),
                    SVG.el("path", {
                      d: "M33.647 28.407H15.765V12.533h17.882c.52 0 .941.445.941.992v13.89c0 .547-.421.992-.94.992",
                      fill: "#FFF",
                    }),
                    SVG.el("path", {
                      d: "M33.647 28.407H15.765V12.533h17.882c.52 0 .941.445.941.992v13.89c0 .547-.421.992-.94.992z",
                      stroke: "#7C87A5",
                      "stroke-width": ".893",
                    }),
                    SVG.el("path", {
                      d:
                        "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V16.502c0-2.19 1.686-3.969 3.764-3.969h15.06-3.766c-2.078 0-3.764 1.778-3.764 3.969v11.905z",
                      fill: "#FFF",
                    }),
                    SVG.el("path", {
                      d:
                        "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V16.502c0-2.19 1.686-3.969 3.764-3.969h15.06-3.766c-2.078 0-3.764 1.778-3.764 3.969v11.905z",
                      stroke: "#7C87A5",
                      "stroke-width": ".893",
                    }),
                    SVG.el("path", {
                      d:
                        "M12.941 12.533H11.06c-1.559 0-2.824 1.334-2.824 2.977v1.986c0 .547.422.992.941.992H12c.52 0 .941-.445.941-.992V15.51c0-1.643 1.265-2.977 2.824-2.977h.94-3.764z",
                      fill: "#4C97FF",
                    }),
                    SVG.el("path", {
                      d:
                        "M12.941 12.533H11.06c-1.559 0-2.824 1.334-2.824 2.977v1.986c0 .547.422.992.941.992H12c.52 0 .941-.445.941-.992V15.51c0-1.643 1.265-2.977 2.824-2.977h.94-3.764z",
                      stroke: "#3D79CC",
                      "stroke-width": ".893",
                    }),
                    SVG.el("path", { stroke: "#7C87A5", "stroke-width": ".893", d: "M4.47 20.474h27.961l2.157 2.974" }),
                    SVG.el("path", {
                      d:
                        "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V16.502c0-2.19 1.686-3.969 3.764-3.969h15.06-3.766c-2.078 0-3.764 1.778-3.764 3.969v11.905z",
                      stroke: "#7C87A5",
                      "stroke-width": ".893",
                    }),
                    SVG.el("path", {
                      d: "M21.307 18.964h-.73c-.319 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479",
                      fill: "#7C87A5",
                    }),
                    SVG.el("path", {
                      d: "M21.307 18.964h-.73c-.319 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479z",
                    }),
                    SVG.el("path", {
                      d: "M24.178 18.964h-.728c-.32 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.258-.479-.578-.479",
                      fill: "#7C87A5",
                    }),
                    SVG.el("path", {
                      d: "M24.178 18.964h-.728c-.32 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.258-.479-.578-.479z",
                    }),
                    SVG.el("path", {
                      d: "M27.051 18.964h-.73c-.318 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.257-.479-.576-.479",
                      fill: "#7C87A5",
                    }),
                    SVG.el("path", {
                      d: "M27.051 18.964h-.73c-.318 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.257-.479-.576-.479z",
                    }),
                    SVG.el("path", {
                      d: "M29.923 18.964h-.729c-.32 0-.576.214-.576.479v1.08h1.883v-1.08c0-.265-.258-.479-.578-.479",
                      fill: "#7C87A5",
                    }),
                    SVG.el("path", {
                      d: "M29.923 18.964h-.729c-.32 0-.576.214-.576.479v1.08h1.883v-1.08c0-.265-.258-.479-.578-.479z",
                    }),
                    SVG.el("path", {
                      d: "M33.647 28.407H15.765V20.47H32.43l2.157 2.978v3.966c0 .548-.421.993-.94.993",
                      fill: "#E6E7E8",
                    }),
                    SVG.el("path", {
                      d: "M33.647 28.407H15.765V20.47H32.43l2.157 2.978v3.966c0 .548-.421.993-.94.993z",
                      stroke: "#7C87A5",
                      "stroke-width": ".893",
                    }),
                    SVG.el("path", {
                      d: "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V20.47h11.294v7.937z",
                      fill: "#E6E7E8",
                    }),
                    SVG.el("path", {
                      d: "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V20.47h11.294v7.937z",
                      stroke: "#7C87A5",
                      "stroke-width": ".893",
                    }),
                    SVG.el("path", { fill: "#E6E7E8", d: "M19.53 24.438h11.294V20.47H19.529z" }),
                    SVG.el("path", {
                      stroke: "#7C87A5",
                      "stroke-width": ".893",
                      d: "M19.53 24.438h11.294V20.47H19.529zm12.902-3.964l2.157-2.794",
                    }),
                  ]),
                  { id: "wedo", fill: "none", transform: "scale(0.65)" }
                ),
                SVG.setProps(
                  SVG.group([
                    SVG.el("rect", {
                      stroke: "#7C87A5",
                      fill: "#FFF",
                      x: ".5",
                      y: "3.59",
                      width: "28",
                      height: "25.81",
                      rx: "1",
                    }),
                    SVG.el("rect", {
                      stroke: "#7C87A5",
                      fill: "#E6E7E8",
                      x: "2.5",
                      y: ".5",
                      width: "24",
                      height: "32",
                      rx: "1",
                    }),
                    SVG.el("path", { stroke: "#7C87A5", fill: "#FFF", d: "M2.5 14.5h24v13h-24z" }),
                    SVG.el("path", { d: "M14.5 10.5v4", stroke: "#7C87A5", fill: "#E6E7E8" }),
                    SVG.el("rect", { fill: "#414757", x: "4.5", y: "2.5", width: "20", height: "10", rx: "1" }),
                    SVG.el("rect", {
                      fill: "#7C87A5",
                      opacity: ".5",
                      x: "13.5",
                      y: "20.13",
                      width: "2",
                      height: "2",
                      rx: ".5",
                    }),
                    SVG.el("path", {
                      d:
                        "M9.06 20.13h1.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1.5a1 1 0 0 1 0-2zM19.93 22.13h-1.51a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1.5a1 1 0 0 1 .01 2zM8.23 17.5H5a.5.5 0 0 1-.5-.5v-2.5h6l-1.85 2.78a.51.51 0 0 1-.42.22zM18.15 18.85l-.5.5a.49.49 0 0 0-.15.36V20a.5.5 0 0 1-.5.5h-.5a.5.5 0 0 1-.5-.5.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5H12a.5.5 0 0 1-.5-.5v-.29a.49.49 0 0 0-.15-.36l-.5-.5a.51.51 0 0 1 0-.71l1.51-1.49a.47.47 0 0 1 .35-.15h3.58a.47.47 0 0 1 .35.15l1.51 1.49a.51.51 0 0 1 0 .71zM10.85 23.45l.5-.5a.49.49 0 0 0 .15-.36v-.29a.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 .5.5v.29a.49.49 0 0 0 .15.36l.5.5a.5.5 0 0 1 0 .7l-1.51 1.5a.47.47 0 0 1-.35.15h-3.58a.47.47 0 0 1-.35-.15l-1.51-1.5a.5.5 0 0 1 0-.7z",
                      fill: "#7C87A5",
                      opacity: ".5",
                    }),
                    SVG.el("path", { d: "M21.5 27.5h5v4a1 1 0 0 1-1 1h-4v-5z", stroke: "#CC4C23", fill: "#F15A29" }),
                  ]),
                  _defineProperty({ transform: "translate(5.5 3.5)", id: "ev3" }, "transform", "scale(0.65)")
                ),
                SVG.setProps(
                  SVG.group([
                    SVG.el("path", {
                      d: "M35 28H5a1 1 0 0 1-1-1V12c0-.6.4-1 1-1h30c.5 0 1 .4 1 1v15c0 .5-.5 1-1 1z",
                      fill: "#fff",
                    }),
                    SVG.el("path", {
                      fill: "red",
                      d: "M4 25h32v2.7H4zm9-1h-2.2a1 1 0 0 1-1-1v-9.7c0-.6.4-1 1-1H13c.6 0 1 .4 1 1V23c0 .6-.5 1-1 1z",
                    }),
                    SVG.el("path", {
                      fill: "red",
                      d: "M6.1 19.3v-2.2c0-.5.4-1 1-1h9.7c.5 0 1 .5 1 1v2.2c0 .5-.5 1-1 1H7.1a1 1 0 0 1-1-1z",
                    }),
                    SVG.el("circle", { fill: "red", cx: "22.8", cy: "18.2", r: "3.4" }),
                    SVG.el("circle", { fill: "red", cx: "30.6", cy: "18.2", r: "3.4" }),
                    SVG.el("path", { fill: "red", d: "M4.2 27h31.9v.7H4.2z" }),
                    SVG.el("circle", { fill: "#e0e0e0", cx: "22.8", cy: "18.2", r: "2.3" }),
                    SVG.el("circle", { fill: "#e0e0e0", cx: "30.6", cy: "18.2", r: "2.3" }),
                    SVG.el("path", {
                      fill: "#e0e0e0",
                      d: "M12.5 22.9h-1.2c-.3 0-.5-.2-.5-.5V14c0-.3.2-.5.5-.5h1.2c.3 0 .5.2.5.5v8.4c0 .3-.2.5-.5.5z",
                    }),
                    SVG.el("path", {
                      fill: "#e0e0e0",
                      d:
                        "M7.2 18.7v-1.2c0-.3.2-.5.5-.5h8.4c.3 0 .5.2.5.5v1.2c0 .3-.2.5-.5.5H7.7c-.3 0-.5-.2-.5-.5zM4 26h32v2H4z",
                    }),
                    SVG.el("path", {
                      stroke: "#666",
                      "stroke-width": ".5",
                      d: "M35.2 27.9H4.8a1 1 0 0 1-1-1V12.1c0-.6.5-1 1-1h30.5c.5 0 1 .4 1 1V27a1 1 0 0 1-1.1.9z",
                    }),
                    SVG.el("path", {
                      stroke: "#666",
                      "stroke-width": ".5",
                      d: "M35.2 27.9H4.8a1 1 0 0 1-1-1V12.1c0-.6.5-1 1-1h30.5c.5 0 1 .4 1 1V27a1 1 0 0 1-1.1.9z",
                    }),
                  ]),
                  { id: "makeymakey", fill: "none", transform: "scale(0.65)" }
                ),
              ];
            },
            makeStyle: function makeStyle() {
              var a = SVG.el("style");
              return a.appendChild(SVG.cdata(Style.cssContent)), a;
            },
            bevelFilter: function bevelFilter(a, b) {
              var c = new Filter(a),
                d = "SourceAlpha",
                e = b ? -1 : 1,
                g = c.blur(1, d);
              return (
                c.merge([
                  "SourceGraphic",
                  c.comp("in", c.flood("#fff", 0.15), c.subtract(d, c.offset(+e, +e, g))),
                  c.comp("in", c.flood("#0f0", 0.7), c.subtract(d, c.offset(-e, -e, g))),
                ]),
                c.el
              );
            },
            darkFilter: function darkFilter(a) {
              var b = new Filter(a);
              return b.merge(["SourceGraphic", b.comp("in", b.flood("#000", 0.2), "SourceAlpha")]), b.el;
            },
            desaturateFilter: function desaturateFilter(a) {
              var b = new Filter(a),
                c = 0.333,
                d = 0.333;
              return b.colorMatrix("SourceGraphic", [c, d, d, 0, 0, d, c, d, 0, 0, d, d, c, 0, 0, 0, 0, 0, 1, 0]), b.el;
            },
            darkRect: function darkRect(a, b, c, d) {
              return SVG.setProps(SVG.group([SVG.setProps(d, { class: ["sb-" + c, "sb-darker"].join(" ") })]), {
                width: a,
                height: b,
              });
            },
            defaultFontFamily: "'Helvetica Neue', Helvetica, sans-serif",
          });
      },
      { "./draw.js": 4, "./filter.js": 5 },
    ],
    9: [
      function (require, module, exports) {
        "use strict";
        module.exports = (function () {
          function a(M, N) {
            return Object.assign({}, N, M);
          }
          function d(M) {
            return M && M.constructor === Array;
          }
          function e(M, N) {
            if (!M) throw "Assertion failed! " + (N || "");
          }
          function g(M, N, O) {
            var P = [];
            d(N[N.length - 1]) && (P = N.pop());
            for (var S, Q = [], R = 0; R < N.length; R++)
              (S = N[R]), S.isLabel ? Q.push(S.value) : S.isIcon ? Q.push("@" + S.name) : Q.push("_");
            var T = (M.hash = E(Q.join(" "))),
              U = F(T, M, N, O);
            if (U) {
              var V = U.lang,
                W = U.type;
              (M.language = V),
                (M.isRTL = -1 < I.indexOf(V.code)),
                ("ring" === W.shape ? "reporter" === M.shape : "stack" === M.shape) && (M.shape = W.shape),
                (M.category = W.category),
                (M.categoryIsDefault = !1),
                W.selector && (M.selector = W.selector),
                (M.hasLoopArrow = W.hasLoopArrow),
                ". . ." === W.spec && (N = [new q(". . .")]);
            }
            H(M, P), M.hasLoopArrow && N.push(new r("loopArrow"));
            var X = new u(M, N);
            return (W && J.test(W.spec) && X.translate(V, !0), "+" === M.diff) ? new w(X) : ((X.diff = M.diff), X);
          }
          function h(M, N) {
            function O() {
              da = M[++ea];
            }
            function P() {
              return M[ea + 1];
            }
            function Q() {
              for (var ha = ea + 1; ha < M.length; ha++) if (" " !== M[ha]) return M[ha];
            }
            function R(ha) {
              return -1 < ga.indexOf(ha);
            }
            function S(ha, ia) {
              var ja = !!ia.filter(function (la) {
                  return !la.isLabel;
                }).length,
                ka = {
                  shape: ha,
                  category: "define-hat" === ha ? "custom" : "reporter" !== ha || ja ? "obsolete" : "variables",
                  categoryIsDefault: !0,
                  hasLoopArrow: !1,
                };
              return g(ka, ia, N);
            }
            function T(ha, ia) {
              var ja = C(ia, N) || ia;
              return new t(ha, ia, ja);
            }
            function U(ha) {
              for (var ja, ia = []; da && "\n" !== da; ) {
                if ("<" === da || (">" === da && ">" === ha)) {
                  var ka = ia[ia.length - 1],
                    la = Q();
                  if (ka && !ka.isLabel && ("[" === la || "(" === la || "<" === la || "{" === la)) {
                    (ja = null), ia.push(new q(da)), O();
                    continue;
                  }
                }
                if (da === ha) break;
                if ("/" === da && "/" === P() && !ha) break;
                switch (da) {
                  case "[":
                    (ja = null), ia.push(V());
                    break;
                  case "(":
                    (ja = null), ia.push(X());
                    break;
                  case "<":
                    (ja = null), ia.push(Y());
                    break;
                  case "{":
                    (ja = null), ia.push(Z());
                    break;
                  case " ":
                  case "\t":
                    if ((O(), ja && R(ja.value))) return ia.push(ba()), ia;
                    ja = null;
                    break;
                  case "\u25C2":
                  case "\u25B8":
                    ia.push($()), (ja = null);
                    break;
                  case "@":
                    O();
                    for (var ma = ""; da && /[a-zA-Z]/.test(da); ) (ma += da), O();
                    "cloud" === ma
                      ? ia.push(new q("\u2601"))
                      : ia.push(r.icons.hasOwnProperty(ma) ? new r(ma) : new q("@" + ma)),
                      (ja = null);
                    break;
                  case "\\":
                    O();
                  case ":":
                    if (":" === da && ":" === P()) return ia.push(_(ha)), ia;
                  default:
                    ja || ia.push((ja = new q(""))), (ja.value += da), O();
                }
              }
              return ia;
            }
            function V() {
              O();
              for (var ha = "", ia = !1; da && "]" !== da && "\n" !== da; ) {
                if ("\\" !== da) ia = !1;
                else if ((O(), "v" === da && (ia = !0), !da)) break;
                (ha += da), O();
              }
              return (
                "]" === da && O(),
                D.test(ha)
                  ? new t("color", ha)
                  : !ia && / v$/.test(ha)
                  ? T("dropdown", ha.slice(0, ha.length - 2))
                  : new t("string", ha)
              );
            }
            function W(ha) {
              var ia = U(ha);
              if ((da && "\n" === da && ((fa = !0), O()), 0 !== ia.length)) {
                var ja = ia[0];
                if (ja && ja.isLabel && R(ja.value))
                  return 2 > ia.length && ia.push(S("outline", [])), S("define-hat", ia);
                if (1 === ia.length) {
                  var ka = ia[0];
                  if (ka.isBlock && (ka.isReporter || ka.isBoolean || ka.isRing)) return ka;
                }
                return S("stack", ia);
              }
            }
            function X() {
              if ((O(), " " === da)) {
                if ((O(), "vv" === da && ")" === P())) return O(), O(), new t("number-dropdown", "");
                if ("v" === da && ")" === P()) return O(), O(), new t("round-dropdown", "");
              }
              var ha = U(")");
              if ((da && ")" === da && O(), 0 === ha.length)) return new t("number", "");
              if (1 === ha.length && ha[0].isLabel) {
                var ia = ha[0].value;
                if (/^[0-9e.-]*$/.test(ia)) return new t("number", ia);
              }
              for (var ja = 0; ja < ha.length && !!ha[ja].isLabel; ja++);
              if (ja === ha.length) {
                var ka = ha[ja - 1];
                if (1 < ja && "vv" === ka.value) {
                  ha.pop();
                  var ia = ha
                    .map(function (na) {
                      return na.value;
                    })
                    .join(" ");
                  return T("number-dropdown", ia);
                }
                if (1 < ja && "v" === ka.value) {
                  ha.pop();
                  var ia = ha
                    .map(function (na) {
                      return na.value;
                    })
                    .join(" ");
                  return T("round-dropdown", ia);
                }
              }
              var la = S("reporter", ha);
              if ("ring" === la.info.shape) {
                var ma = la.children[0];
                ma && ma.isInput && "number" === ma.shape && "" === ma.value
                  ? (la.children[0] = new t("reporter"))
                  : ((ma && ma.isScript && ma.isEmpty) || (ma && ma.isBlock && !ma.children.length)) &&
                    (la.children[0] = new t("stack"));
              }
              return la;
            }
            function Y() {
              O();
              var ha = U(">");
              return da && ">" === da && O(), 0 === ha.length ? new t("boolean") : S("boolean", ha);
            }
            function Z() {
              O(), (fa = !1);
              var ia = j(function f() {
                  for (; da && "}" !== da; ) {
                    var ka = W("}");
                    if (ka) return ka;
                  }
                }),
                ja = [];
              return (
                ia.forEach(function (ka) {
                  ja = ja.concat(ka.blocks);
                }),
                "}" === da && O(),
                fa ? new y(ja) : (e(1 >= ja.length), ja.length ? ja[0] : S("stack", []))
              );
            }
            function $() {
              var ha = da;
              return O(), "\u25B8" === ha ? new r("addInput") : "\u25C2" === ha ? new r("delInput") : void 0;
            }
            function _(ha) {
              O(), O();
              for (var ia = [], ja = ""; da && "\n" !== da && da !== ha; ) {
                if (" " === da) ja && (ia.push(ja), (ja = ""));
                else if ("/" === da && "/" === P()) break;
                else ja += da;
                O();
              }
              return ja && ia.push(ja), ia;
            }
            function aa(ha) {
              O(), O();
              for (var ia = ""; da && "\n" !== da && da !== ha; ) (ia += da), O();
              return da && "\n" === da && O(), new v(ia, !0);
            }
            function ba() {
              function ha(ka, la) {
                (ja = null), O();
                var ma = U(la);
                da === la && O(),
                  ia.push(
                    g({ shape: "boolean" === ka ? "boolean" : "reporter", argument: ka, category: "custom-arg" }, ma, N)
                  );
              }
              for (var ja, ia = []; da && "\n" !== da && ("/" !== da || "/" !== P()); )
                switch (da) {
                  case "(":
                    ha("number", ")");
                    break;
                  case "[":
                    ha("string", "]");
                    break;
                  case "<":
                    ha("boolean", ">");
                    break;
                  case " ":
                    O(), (ja = null);
                    break;
                  case "\\":
                    O();
                  case ":":
                    if (":" === da && ":" === P()) {
                      ia.push(_());
                      break;
                    }
                  default:
                    ja || ia.push((ja = new q(""))), (ja.value += da), O();
                }
              return S("outline", ia);
            }
            function ca() {
              var ha;
              ("+" === da || "-" === da) && ((ha = da), O());
              var ia = W();
              if ("/" === da && "/" === P()) {
                var ja = aa();
                if (((ja.hasBlock = ia && ia.children.length), !ja.hasBlock)) return ja;
                ia.comment = ja;
              }
              return ia && (ia.diff = ha), ia;
            }
            var fa,
              da = M[0],
              ea = 0,
              ga = [];
            return (
              N.map(function (ha) {
                ga = ga.concat(ha.define);
              }),
              function () {
                if (da) {
                  var ha = ca();
                  return ha || "NL";
                }
              }
            );
          }
          function j(M) {
            function N() {
              R = M();
            }
            function P() {
              var S = R;
              if ((N(), S.hasScript))
                for (;;) {
                  var T = Q();
                  if ((S.children.push(new y(T)), R && R.isElse)) {
                    for (var U = 0; U < R.children.length; U++) S.children.push(R.children[U]);
                    N();
                    continue;
                  }
                  R && R.isEnd && N();
                  break;
                }
              return S;
            }
            function Q() {
              for (var S = []; R; ) {
                if ("NL" === R) {
                  N();
                  continue;
                }
                if (!R.isCommand) return S;
                var T = P(),
                  U = "+" === T.diff;
                if ((U && (T.diff = null), U)) {
                  var V = S[S.length - 1],
                    W = [];
                  if (V && V.isGlow) {
                    S.pop();
                    var W = V.child.isScript ? V.child.blocks : [V.child];
                  }
                  W.push(T), S.push(new w(new y(W)));
                } else S.push(T);
              }
              return S;
            }
            var R = M();
            return (function () {
              for (; "NL" === R; ) N();
              for (var T, S = []; R; ) {
                for (T = []; R && "NL" !== R; ) {
                  var U = P(),
                    V = "+" === U.diff;
                  if (
                    (V && (U.diff = null),
                    (U.isElse || U.isEnd) && (U = new u(a(U.info, { shape: "stack" }), U.children)),
                    V)
                  ) {
                    var W = T[T.length - 1],
                      X = [];
                    if (W && W.isGlow) {
                      T.pop();
                      var X = W.child.isScript ? W.child.blocks : [W.child];
                    }
                    X.push(U), T.push(new w(new y(X)));
                  } else if (U.isHat) T.length && S.push(new y(T)), (T = [U]);
                  else if (U.isFinal) {
                    T.push(U);
                    break;
                  } else if (U.isCommand) T.push(U);
                  else {
                    T.length && S.push(new y(T)), S.push(new y([U])), (T = []);
                    break;
                  }
                }
                for (T.length && S.push(new y(T)); "NL" === R; ) N();
              }
              return S;
            })();
          }
          function k(M, N) {
            M.isScript
              ? M.blocks.forEach(function (O) {
                  k(O, N);
                })
              : M.isBlock
              ? (N(M),
                M.children.forEach(function (O) {
                  k(O, N);
                }))
              : M.isGlow && k(M.child, N);
          }
          function m(M) {
            var N = {},
              O = {};
            M.forEach(function (P) {
              var Q = {};
              k(P, function (R) {
                if ("define-hat" === R.info.shape) {
                  var S = R.children[1];
                  if (!S) return;
                  for (var W, T = [], U = [], V = 0; V < S.children.length; V++)
                    if (((W = S.children[V]), W.isLabel)) U.push(W.value);
                    else if (W.isBlock) {
                      if (!W.info.argument) return;
                      U.push({ number: "%n", string: "%s", boolean: "%b" }[W.info.argument]);
                      var X = K(W);
                      T.push(X), (Q[X] = !0);
                    }
                  var Y = U.join(" "),
                    Z = G(Y),
                    $ = (N[Z] = { spec: Y, names: T });
                  (R.info.selector = "procDef"),
                    (R.info.call = $.spec),
                    (R.info.names = $.names),
                    (R.info.category = "custom");
                } else if ("doIfElse" === R.info.selector) {
                  var _ = R.children[R.children.length - 2];
                  R.info.selector = _ && _.isLabel && "else" === _.value ? "doIfElse" : "doIf";
                } else if (R.info.categoryIsDefault && (R.isReporter || R.isBoolean)) {
                  var X = K(R);
                  Q[X] &&
                    ((R.info.category = "custom-arg"), (R.info.categoryIsDefault = !1), (R.info.selector = "getParam"));
                } else if (L.hasOwnProperty(R.info.selector)) {
                  var aa = L[R.info.selector],
                    ba = R.children.filter(function (da) {
                      return !da.isLabel;
                    }),
                    ca = ba[aa];
                  ca && ca.isInput && (O[ca.value] = !0);
                }
              });
            }),
              M.forEach(function (P) {
                k(P, function (Q) {
                  if (Q.info.categoryIsDefault && "obsolete" === Q.info.category) {
                    var R = N[Q.info.hash];
                    R &&
                      ((Q.info.selector = "call"),
                      (Q.info.call = R.spec),
                      (Q.info.names = R.names),
                      (Q.info.category = "custom"));
                  } else if (Q.isReporter) {
                    var S = K(Q);
                    if (!S) return;
                    "variables" === Q.info.category &&
                      O[S] &&
                      Q.info.categoryIsDefault &&
                      ((Q.info.category = "list"), (Q.info.categoryIsDefault = !1)),
                      "list" === Q.info.category
                        ? (Q.info.selector = "contentsOfList:")
                        : "variables" === Q.info.category && (Q.info.selector = "readVariable");
                  }
                });
              });
          }
          var p = require("./model.js"),
            q = p.Label,
            r = p.Icon,
            t = p.Input,
            u = p.Block,
            v = p.Comment,
            w = p.Glow,
            y = p.Script,
            z = p.Document,
            A = require("./blocks.js"),
            B = A.allLanguages,
            C = A.lookupDropdown,
            D = A.hexColorPat,
            E = A.minifyHash,
            F = A.lookupHash,
            G = A.hashSpec,
            H = A.applyOverrides,
            I = A.rtlLanguages,
            J = A.iconPat,
            K = A.blockName,
            L = {
              "append:toList:": 1,
              "deleteLine:ofList:": 1,
              "insert:at:ofList:": 2,
              "setLine:ofList:to:": 1,
              "showList:": 0,
              "hideList:": 0,
            };
          return {
            parse: function (M, N) {
              var N = a({ inline: !1, languages: ["en"] }, N);
              (M = M.replace(/&lt;/g, "<")), (M = M.replace(/&gt;/g, ">")), N.inline && (M = M.replace(/\n/g, " "));
              var O = N.languages.map(function (R) {
                  return B[R];
                }),
                P = h(M, O),
                Q = j(P);
              return m(Q), new z(Q);
            },
          };
        })();
      },
      { "./blocks.js": 2, "./model.js": 7 },
    ],
  },
  {},
  [1]
);
