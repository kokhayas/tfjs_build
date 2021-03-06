import cosSimilarity from "../_snowpack/pkg/cos-similarity.js";
import React, {useState} from "../_snowpack/pkg/react.js";
import {useCopyToClipboard} from "../_snowpack/pkg/usehooks-ts.js";
import "./App.css.proxy.js";
import copyJson from "./data/copy.json.proxy.js";
import datastructure from "./data/datastructure.json.proxy.js";
import datastructureSimple from "./data/datastructure_simple.json.proxy.js";
import allVectors from "./data/round.json.proxy.js";
import pic from "./utdslogo.png.proxy.js";
let t = "Peace is a journey of a thousand miles and it must be taken one step at a time.";
let nationalHistory = new Array();
let internationalHistory = new Array();
export function Slide(props) {
  if (props.flag)
    return /* @__PURE__ */ React.createElement("div", {
      className: "slide"
    }, props.flag);
  else {
    return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
}
export function NationalModal(props) {
  let json_dict = datastructure["national"][props.index];
  if (true) {
    return /* @__PURE__ */ React.createElement("div", {
      className: "sets",
      key: props.index
    }, /* @__PURE__ */ React.createElement("div", {
      className: "titles"
    }, json_dict.title), Object.values(json_dict.rounds).map((e) => {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
        className: "set"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "parant"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "child1"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "title2"
      }, e.round), /* @__PURE__ */ React.createElement("div", {
        className: "motion2"
      }, e.motion), /* @__PURE__ */ React.createElement(Slide, {
        flag: e.slide
      })))));
    }), /* @__PURE__ */ React.createElement("div", {
      className: "index-close"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "index"
    }, props.index, "/", datastructure["national"].length)));
  } else {
    return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
}
export function InternationalModal(props) {
  let json_dict = datastructure["international"][props.index];
  if (true) {
    return /* @__PURE__ */ React.createElement("div", {
      className: "sets",
      key: props.index
    }, /* @__PURE__ */ React.createElement("div", {
      className: "titles"
    }, json_dict.title), Object.values(json_dict.rounds).map((e) => {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
        className: "set"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "parant"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "child1"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "title2"
      }, e.round), /* @__PURE__ */ React.createElement("div", {
        className: "motion2"
      }, e.motion), /* @__PURE__ */ React.createElement(Slide, {
        flag: e.slide
      })))));
    }), /* @__PURE__ */ React.createElement("div", {
      className: "index-close"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "index"
    }, props.index, "/", datastructure["international"].length)));
  } else {
    return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
}
export function SearchModal(props) {
  if (props.started) {
    return /* @__PURE__ */ React.createElement("div", {
      className: "sets"
    }, props.ranks.map((e) => {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
        className: "set"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "parant"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "child1"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "title"
      }, datastructureSimple.data.find((v) => v.id == e).title + " / " + datastructureSimple.data.find((v) => v.id == e).round), /* @__PURE__ */ React.createElement("div", {
        className: "motion"
      }, datastructureSimple.data.find((v) => v.id == e).motion), /* @__PURE__ */ React.createElement(Slide, {
        flag: datastructureSimple.data.find((v) => v.id == e).slide
      })))));
    }));
  } else {
    return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
}
function App({}) {
  const [text, setText] = useState(t);
  const [ranks, setRanks] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [nationalIndex, setNationalIndex] = useState(0);
  const [internationalIndex, setInternationalIndex] = useState(0);
  const [value, copy] = useCopyToClipboard();
  const [nationalIsClicked, setNationalIsClicked] = useState(true);
  const [internationalIsClicked, setInternationalIsClicked] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);
  const [l, setL] = useState(10);
  const [Length, setLLength] = useState(10);
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  if (loading) {
    return /* @__PURE__ */ React.createElement("div", null, loading ? "loading..." : /* @__PURE__ */ React.createElement(React.Fragment, null));
  }
  function text2embed() {
    if (true) {
      use.load().then((model) => {
        const sentences = [text];
        model.embed(sentences).then(async (embeddings) => {
          setLoading(true);
          embeddings.print(true);
          let vec = await embeddings.array();
          let similarities = {};
          let similarity = -1;
          for (let i = 0; i < allVectors.length; i++) {
            let vecs = allVectors[i];
            similarity = cosSimilarity(vec[0], vecs);
            similarities[i] = similarity;
          }
          let arr = similarities;
          var keys = [];
          for (let key in arr)
            keys.push(key);
          function compare(a, b) {
            return arr[b] - arr[a];
          }
          let result = [];
          keys.sort(compare);
          for (let i = 0; i < l; i++) {
            result.push(keys[i]);
          }
          setRanks(result);
          setLoading(false);
        });
      });
    }
  }
  function handleClick() {
    setLLength(l);
    setIsWaiting(true);
    setIsClicked(!isClicked);
    text2embed();
    setIsWaiting(false);
  }
  function handleNationalClick() {
    setNationalIndex(Math.floor(Math.random() * datastructure["national"].length));
    nationalHistory.push(nationalIndex);
    setNationalIsClicked(!nationalIsClicked);
  }
  function handleInternationalClick() {
    setInternationalIndex(Math.floor(Math.random() * datastructure["international"].length));
    internationalHistory.push(internationalIndex);
    setInternationalIsClicked(!internationalIsClicked);
  }
  function handleNationalBackwardClick() {
    setNationalIndex(nationalHistory.pop());
  }
  function handleInternationalBackwardClick() {
    setInternationalIndex(internationalHistory.pop());
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "App"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "picParent"
  }, /* @__PURE__ */ React.createElement("img", {
    src: pic,
    alt: "picture"
  })), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("div", {
    className: "parent-input-button"
  }, /* @__PURE__ */ React.createElement("input", {
    className: "searchInput",
    type: "text",
    onChange: (e) => {
      setText(e.target.value);
    },
    value: text
  }), /* @__PURE__ */ React.createElement("button", {
    className: "search",
    onClick: (e) => {
      handleClick();
      e.target.style.backgroundColor = "skyblue";
      setStarted(true);
    },
    disabled: isWaiting
  }, "search")), /* @__PURE__ */ React.createElement("div", {
    className: "searchName"
  }, text), /* @__PURE__ */ React.createElement(SearchModal, {
    className: "searchModal",
    isClicked,
    ranks,
    started
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("div", {
    className: "seperator"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "backward",
    onClick: handleNationalBackwardClick
  }, "back"), /* @__PURE__ */ React.createElement("button", {
    className: "button",
    onClick: () => {
      handleNationalClick();
    }
  }, "national motion"), /* @__PURE__ */ React.createElement("button", {
    className: "copy",
    onClick: () => copy(copyJson[nationalIndex])
  }, "copy")), /* @__PURE__ */ React.createElement(NationalModal, {
    className: "nationalModal",
    index: nationalIndex,
    flag: nationalIsClicked,
    type: "national"
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("div", {
    className: "flex"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "backward",
    onClick: handleInternationalBackwardClick
  }, "back"), /* @__PURE__ */ React.createElement("button", {
    className: "button",
    onClick: () => {
      handleInternationalClick();
    }
  }, "international motion"), /* @__PURE__ */ React.createElement("button", {
    className: "copy",
    onClick: () => copy(copyJson[internationalIndex + datastructure["national"].length - 1])
  }, "copy")), /* @__PURE__ */ React.createElement(InternationalModal, {
    className: "internationalModal",
    index: internationalIndex,
    flag: internationalIsClicked,
    type: "international"
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("a", {
    href: "http://resources.tokyodebate.org/debate-motion/motion/",
    className: "explain"
  }, "utds motion"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("p", null, " The University of Tokyo, Debating Society. UTDS"), /* @__PURE__ */ React.createElement("br", null));
}
export default App;
