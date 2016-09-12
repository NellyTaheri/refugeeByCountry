// $('#world-map').vectorMap({map: 'us_aea'});

    var val = 1990;
        statesValues = jvm.values.apply({}, jvm.values(data.states));

        console.log( statesValues );
        // metroPopValues = Array.prototype.concat.apply([], jvm.values(data.metro.population)),
        // metroUnemplValues = Array.prototype.concat.apply([], jvm.values(data.metro.unemployment));
    const $rangeValue = $('.js-range-value');
    $('input[type="range"]').rangeslider({
      polyfill: false,
      onSlide: function( position, value ) {
        $rangeValue.text( value )
        mapObject.series.regions[0].setValues(data.states[value]);
        val = value;
      }
    });

    $('#world-map').vectorMap({
      map: 'world_mill',
      backgroundColor: 'transparent',
      regionStyle: {
        initial: {
          stroke: '#000',
          "stroke-width": 0.05,
          fill: '#e5f3fe'
        },
      },
      // markers: data.metro.coords,
      series: {
        // markers: [{
        //   attribute: 'fill',
        //   scale: ['#FEE5D9', '#A50F15'],
        //   values: data.metro.unemployment[val],
        //   min: jvm.min(metroUnemplValues),
        //   max: jvm.max(metroUnemplValues)
        // },{
        //   attribute: 'r',
        //   scale: [5, 20],
        //   values: data.metro.population[val],
        //   min: jvm.min(metroPopValues),
        //   max: jvm.max(metroPopValues)
        // }],
        regions: [{
          scale: ['#d5e5f1', '#fb4a5f'],
          attribute: 'fill',
          values: data.states[val],
          min: jvm.min(statesValues),
          max: jvm.max(statesValues)
        }]
      },
      onMarkerTipShow: function(event, label, index){
        label.html(
          '<b>'+data.metro.names[index]+'</b><br/>'+
          '<b>Population: </b>'+data.states[val][index]+'</br>'
        );
      },
      onRegionTipShow: function(event, label, code){
        label.html(
          '<b>'+label.html()+'</b></br>'+
          '<b>Refugees Accepted: </b>'+data.states[val][code]+'</b>'
        );
      }
    });

    var mapObject = $('#world-map').vectorMap('get', 'mapObject');

