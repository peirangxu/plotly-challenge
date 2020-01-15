// Unpack function 
function unpack(data,idSelected){
    var selectedData = data.samples.filter(x=>x.id === idSelected)
    var otu = [];

    for (var i=0;i<selectedData[0].sample_values.length;i++){
        dict={};
        dict["sample_values"]=selectedData[0].sample_values[i];
        dict["otu_labels"]=selectedData[0].otu_labels[i];
        dict["otu_ids"]=`OTU ${selectedData[0].otu_ids[i]}`;
        dict["otu_ids_original"]=selectedData[0].otu_ids[i];
        otu.push(dict);
    };
    return otu;
};

// Function return data for horizontal bar plot
function plotlyData(otu){
    top10 = otu.sort((firstNum,secondNum)=>secondNum.sample_values-firstNum.sample_values).slice(0,10).reverse();

    data = [{
        y:top10.map(x=>x.otu_ids),
        x:top10.map(x=>x.sample_values),
        type:"bar",
        orientation:"h",
        text:top10.map(x=>x.otu_labels)
    }];

    layout = {
        margin: {
            l:50,
            r:50,
            t:50
        }
    }
    var barPlot = [data,layout];
    return barPlot;
};

// Function return data for bubble plot
function BubbleData(otu){
    data = [{
        x: otu.map(x=>x.otu_ids_original),
        y: otu.map(x=>x.sample_values),
        mode:"markers",
        text:otu.map(x=>x.otu_labels),
        marker:{
            color:otu.map(x=>x.otu_ids_original),
            size:otu.map(x=>x.sample_values)
        }
    }];
    return data;
};

// Init function
function init(){
    // Import local json file
    d3.json("data/samples.json").then(function(data){
        console.log(data);
        
        // Append test subject ID No.
        var dropdown = d3.select("#selDataset").selectAll("option");
        dropdown.data(data.names).enter().append("option").text(x=>x);
        
        //Extract data from json.
        otu_940 =unpack(data,"940");
        console.log(otu_940);

        
        // Initial bar plot
        data1 = plotlyData(otu_940)
        console.log(data1)
        Plotly.newPlot("bar",data1[0],data1[1]);
        
        // Initial Bubble plot
        data2 = BubbleData(otu_940);
        Plotly.newPlot("bubble",data2);

        // Demographic Info
        var metadata_940 = data.metadata.filter(x=>x.id === 940);
        console.log(metadata_940);

        row = d3.select("#sample-metadata");
        Object.entries(metadata_940[0]).forEach(([key,value])=>
            row.append("p").text(`${key}: ${value}`));
    });
};

d3.selectAll("#selDataset").on("change",updatePlotly);

function updatePlotly(){

    //Import local json file
    d3.json("data/samples.json").then(function(data){

        // Define variables and extract sample data selected
        var dropdownMenu = d3.select("#selDataset");
        var idSelected = dropdownMenu.property("value");
        console.log(idSelected);

        var otuSelected = unpack(data,idSelected);

        // Update bar plot
        var dataSelected = plotlyData(otuSelected);

        Plotly.restyle("bar","x",[dataSelected[0].x]);
        Plotly.restyle("bar","y",[dataSelected[0].y]);

        // Update bubble plot
        var dataSelected_bubble = BubbleData(otuSelected);

        Plotly.restyle("bubble","x",[dataSelected_bubble[0].x]);
        Plotly.restyle("bubble","y",[dataSelected_bubble[0].y]);

        // Update demographic Info
        var metadataSelected = data.metadata.filter(x=>x.id === parseInt(idSelected));
        console.log(metadataSelected);

        row = d3.select("#sample-metadata");
        row.html("");
        Object.entries(metadataSelected[0]).forEach(([key,value])=>
            row.append("p").text(`${key}: ${value}`));
    });
    

};

init();
