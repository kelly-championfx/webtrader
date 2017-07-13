FRACTAL=function(a,b,c){IndicatorBase.call(this,a,b,c),this.priceData=[],this.BULL=1,this.BEAR=2,this.middleBar_shift=0|Math.floor(this.options.numberOfBars/2),this.BULL_IMAGE_URL="url(images/indicators/down_fractal.svg)",this.BEAR_IMAGE_URL="url(images/indicators/up_fractal.svg)",this.CalculateFRACTALValue=function(a,b,c){if(b-this.middleBar_shift<0||b+this.middleBar_shift>a.length-1)return null;var d=a[b].high,e=a[b].low,f=_.range(b-this.middleBar_shift,b+this.middleBar_shift+1).map(function(b){return a[b]}),g=f.map(function(a){return a.low}),h=f.map(function(a){return a.high}),i=_.min(g),j=_.max(h),k=i===e,l=j===d,m=e;return c===this.BEAR&&(m=d),new FractalUpdateObject(a[b].time||a[b].x,m,k&&c===this.BULL||l&&c===this.BEAR?" ":"","Fractal: "+m,{symbol:c===this.BULL?this.BULL_IMAGE_URL:c===this.BEAR?this.BEAR_IMAGE_URL:null},k&&c===this.BULL,l&&c===this.BEAR)};for(var d=0;d<a.length;d++){this.priceData.push(a[d]);var e=this;[this.BULL,this.BEAR].forEach(function(b){var c=e.CalculateFRACTALValue(a,d,b);c&&!_.isEmpty(c.text)&&!_.isEmpty(c.title)&&c.marker&&c.marker.symbol&&e.indicatorData.push(c)})}this.addOrUpdateFractalData=function(a){var b=this.priceData.length-1-this.middleBar_shift,c=this,d=[];return[this.BULL,this.BEAR].forEach(function(e){var f=c.CalculateFRACTALValue(c.priceData,b,e);f&&f.marker&&f.marker.symbol&&"add"===a&&(c.indicatorData.push(f),d.push({id:c.uniqueID,value:f})),"update"===a&&d.push({id:c.uniqueID,value:f})}),d}},FractalUpdateObject=function(a,b,c,d,e,f,g){this.y=b,this.x=a,this.title=c,this.text=d,this.marker=e,this.isBull=f,this.isBear=g,this.toJSObject=function(){return{x:a,y:b,title:c,text:d,marker:e}}},FRACTAL.prototype=Object.create(IndicatorBase.prototype),FRACTAL.prototype.constructor=FRACTAL,FRACTAL.prototype.addPoint=function(a){return this.priceData.push(a),this.addOrUpdateFractalData("add")},FRACTAL.prototype.update=function(a){var b=this.priceData.length-1;return this.priceData[b].open=a.open,this.priceData[b].high=a.high,this.priceData[b].low=a.low,this.priceData[b].close=a.close,this.addOrUpdateFractalData("update")},FRACTAL.prototype.toString=function(){return"FRACTAL ("+this.options.numberOfBars+")"},FRACTAL.prototype.buildSeriesAndAxisConfFromData=function(a){return[{seriesConf:{id:this.uniqueID,name:this.toString(),data:this.indicatorData,type:"scatter",turboThreshold:0,onChartIndicator:a.onChartIndicator,enableMouseTracking:!1,onSeries:this.options.onSeriesID}}]};