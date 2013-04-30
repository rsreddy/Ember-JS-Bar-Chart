/*
Ember JS Bar Chart
Author: Carlos Rodriguez
2013
*/

Observe = {
    init: function (opts) {
        App = Em.Application.create({});
        Observe.textfield(opts.box);
        Observe.selects(opts.names);
        Observe.bar();
    },
    selects: function (names) {
        App.names = names;
        App.SelView = Em.Select.extend({
            selectedPerson: null
			/* save for later
            valueDidChange: function (sender, key, value, context, rev) {
                //console.log(this.get('value'));        
            }.observes('value'),
            */
        });
    },
	bar: function () {
        App.BarView = Em.CollectionView.create({
            content: App.names,
            itemViewClass: Em.View.extend({
                template: Em.Handlebars.compile("{{view.content}}"),
                classNames: ['bar-chart']
            })
        });
        //App.BarView.appendTo('body');
    },
    textfield: function (box) {
        App.TFView = Em.TextField.extend({
            placeholder: '1 of 1',
            valueDidChange: function (sender, key, value, context, rev) {
                var val = this.get('value');
                var box = $(box);
                var boxH = parseInt(box.height());

                /* save for later: var val = val/boxH*100; */
                
                //Example: 1 of 1 returns 100%
				var splitkey;
				if(val.indexOf('of') !== -1){splitkey = 'of'};
				if(val.indexOf('/') !== -1){splitkey = '/'};
                if (splitkey) {
                    val = $.trim(val);
                    val = val.split(splitkey);
                    val = (val[0] / val[1]) * 100;
                }
                //Validate for Integer
                if (isNaN(val)) {
                    console.log('Please enter a number, or something like 1 of 1');
                } else {
                    var selected = App.SelView.selectedPerson;
                    var selectedIndex = App.names.indexOf(selected);
                    var count = $('.bar-chart').length;
                    var barWidth = $('.bar-chart').parents().width() / count;
                    $('.bar-chart').width(barWidth - barWidth / (count * 2));
                    $('.bar-chart').each(function (index, element) {
                        $(this).css({
                            position: 'absolute',
                            left: barWidth * index,
                        });
                    });
                    $('.bar-chart').eq(selectedIndex).html(selected + '\n' + Math.round(val) + '%');
                    $('.bar-chart').fadeIn();
                    if (isFinite(val) && val < 101) {
                        console.log(val + '%');
                        $('.bar-chart').eq(selectedIndex).animate({
                            height: val + '%'
                        });
                    }
                }
            }.observes('value'),
        });
    } //
}

$(document).ready(function (e) {
    Observe.init({
        box: '#chart',
        names: ['Carlos B.', 'Joakim N.', 'Luol D.', 'Nate R.', 'Jimmy B.', 'Taj G.', 'Marco B.', 'Nazr M.']
    });
});