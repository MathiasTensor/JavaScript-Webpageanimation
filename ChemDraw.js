var chemdrawjs;
perkinelmer.ChemdrawwebManager.attach({
  id: "chemdrawjsContainer",
  callback: function (chemdrawweb) {
    chemdrawjs = chemdrawweb;
  }
});

chemdrawjs.addReactant("CDXML content...");