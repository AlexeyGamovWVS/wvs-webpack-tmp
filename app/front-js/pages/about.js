/* START_EXCLUDE_JS_BUNDLE */
import "../../front-scss/pages/about.scss";
/* END_EXCLUDE_JS_BUNDLE */
import test from "../utils/utils";

// constants
const CONFIG = {
  TEXT: "I am about js",
  NAME: "hello",
};

// functions
function logConfig(config) {
  Object.values(config).forEach((value) => {
    console.log(value);
  });
}

// init
export default function aboutPage() {
  test();
  logConfig(CONFIG);
}

/* START_EXCLUDE_JS_BUNDLE */
aboutPage();
/* END_EXCLUDE_JS_BUNDLE */
