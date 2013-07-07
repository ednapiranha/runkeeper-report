(function() {
var templates = {};
templates["activities.html"] = (function() {
function root(env, context, frame, runtime) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"column\">\n  <h2 class=\"header\">7 Day Overview</h2>\n  <div class=\"overview\">\n    <h3>Minutes</h3>\n    <span>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"minutes", env.autoesc), env.autoesc);
output += "</span>\n  </div>\n  <div class=\"overview\">\n    <h3>Distance</h3>\n    <span class=\"distance-value\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"distance", env.autoesc), env.autoesc);
output += "</span> <small>km</small>\n  </div>\n  <div class=\"overview\">\n    <h3>Calories</h3>\n    <span class=\"calorie-value\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"calories", env.autoesc), env.autoesc);
output += "</span>\n  </div>\n</div>\n<div class=\"column\">\n  <h2 class=\"header\">Recent Activity</h2>\n  <ul class=\"activities\">\n    ";
frame = frame.push();
var t_2 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"activities", env.autoesc);
if(t_2 !== undefined) {for(var t_1=0; t_1 < t_2.length; t_1++) {
var t_3 = t_2[t_1];
frame.set("activity", t_3);
output += "\n      <li class=\"";
output += runtime.suppressValue((lineno = 19, colno = 43, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((t_3),"type", env.autoesc)),"toLowerCase", env.autoesc), "activity[\"type\"][\"toLowerCas\"]", [])), env.autoesc);
output += "\">\n        <a href=\"javascript:;\" class=\"activity-link\"\n           data-action=\"show-activity\" data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_3),"id", env.autoesc), env.autoesc);
output += "\">\n          <p>";
output += runtime.suppressValue(runtime.memberLookup((t_3),"type", env.autoesc), env.autoesc);
output += "</p>\n          <p class=\"duration\">";
output += runtime.suppressValue(runtime.memberLookup((t_3),"duration", env.autoesc), env.autoesc);
output += "</p>\n          <time>";
output += runtime.suppressValue(runtime.memberLookup((t_3),"startTime", env.autoesc), env.autoesc);
output += "</time>\n        </a>\n      </li>\n    ";
}
}frame = frame.pop();
output += "\n  </ul>\n</div>\n<div id=\"detail\" class=\"hidden\">\n  <h2 class=\"activity-type\"><span></span></h2>\n  <a href=\"javascript:;\" class=\"close\" data-action=\"close\">x</a>\n  <div id=\"map-canvas\"></div>\n  <div class=\"detail-meta\">\n    <p class=\"duration\">Duration: <span></span></p>\n    <p class=\"calories\">Calories: <span></span></p>\n    <time></time>\n  </div>\n</div>\n";
return output;
} catch (e) {
  runtime.handleError(e, lineno, colno);
}
}
return {
root: root
};

})();
if(typeof define === "function" && define.amd) {
    define(["nunjucks"], function(nunjucks) {
        nunjucks.env = new nunjucks.Environment([], null);
        nunjucks.env.registerPrecompiled(templates);
        return nunjucks;
    });
}
else if(typeof nunjucks === "object") {
    nunjucks.env = new nunjucks.Environment([], null);
    nunjucks.env.registerPrecompiled(templates);
}
else {
    console.error("ERROR: You must load nunjucks before the precompiled templates");
}
})();
