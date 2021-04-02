function buildMetaData(sample){
    d3.json("samples.json").then(function(data){
        var metadata = data.metadata;
        var resultsArray = metadata.filter(function(data){
            return data.id == sample;
        })
        var result = resultsArray[0];
        var PANEL = d3.select("#sample-metadata");

        //Clear any existing data
        PANEL.html("");

        Object.entries(result).forEach(function([key, value]){
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        })

        //Bonus build gauge
        // buildGuage(result.wfreq)
    })
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

        var yticks = otu_ids.slice(0, 10).map(function(otuID){
            return `OTU ${otuID}`;
        }).reverse();

        var barData = [
            {
                y: yticks,
                x: sample_values.slice(0, 10).reverse(),
                text: otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h"

            }
        ];

        var barLayout = {
            title: "Top Bacteria Culture Found",
            marigin: {t: 30, l: 150}
        };

        Plotly.newPlot("bar", barData, barLayout);
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

function optionChanged(newSample){
    buildCharts(newSample);
    buildMetaData(newSample);
}

init()