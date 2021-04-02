function buildMetaData(sample){
    
}

function buildCharts(sample){
    d3.json("samples.json").then(function(data){
        var samples = data.samples;
        //console.log(samples)
        var resultsArray = samples.filter(function(data){
            return data.id === sample;
        })
        //console.log(resultsArray)
        var result = resultsArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        //Build bubble chart
        var bubbleLayout = {
            title: "Bacteria Cultures per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
            margin: {t: 30}
        }
        var bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }];
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
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