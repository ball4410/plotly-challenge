function init(){
    console.log("hello world");

    //Reference the dropdown id selDataset
    var selector = d3.select("#selDataset");
    
    //GEt sample names for dropdown
    d3.json("samples.json").then(function(data){
      //console.log(data);
      var sampleNames = data.names;

      sampleNames.forEach(function(name){
          selector
          .append("option")
          .text(name)
          .property("value", name)
      })
    })
}

init()