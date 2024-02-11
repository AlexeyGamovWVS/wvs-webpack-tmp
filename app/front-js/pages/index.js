/* START_EXCLUDE_JS_BUNDLE */
import "../../front-scss/pages/index.scss";
/* END_EXCLUDE_JS_BUNDLE */
import test from "../utils/utils";

// constants
const CONFIG = {
  TEXT: "I am index script",
  NAME: "Alex",
};

// functions
function logConfig(config) {
  Object.values(config).forEach((value) => {
    console.log(value);
  });
}
function destination() {
  const summ = 1 + 15;
  console.log(summ);
}
// init
export default function mainPage() {
  test();
  logConfig(CONFIG);
  destination();
}

/* START_EXCLUDE_JS_BUNDLE */
// start in separate files
mainPage();
/* END_EXCLUDE_JS_BUNDLE */
