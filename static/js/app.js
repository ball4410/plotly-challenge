function buildMetaData(sample){
    
}

function buildCharts(sample){
    d3.json("samples.json").then(function(data){
        var samples = data.samples;
        //console.log(samples)
        var resultsArray = samples.filter(function(data){
            return data.id === sample;
        })
        console.log(resultsArray)
    })
}

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

      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetaData(firstSample);

    })
}

init()