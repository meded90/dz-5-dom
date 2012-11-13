
var EventList = Backbone.Collection.extend({
    model: EventModel,
    initialize: function () {
        'use strict';
        this.bind("all", function (nemeEvent) {
            console.log(nemeEvent);
        });
        this.bind("cheng", function () {
            console.log(this);
        });
    },
    endEvintListNow: function () {
        'use strict';
        return new EventList(this.filter(function (item) {
            return isLessNow(item.get("endEvent"));
        }));
    },
    startEventisMoreNow: function () {
        'use strict';
        return new EventList(this.filter(function (item) {
            return isMoreNow(item.get("startEvent"));
        }));
    },
    evinteNow: function () {
        'use strict';
        return new EventList(this.filter(function (item) {
            return isLessNow(item.get("startEvent"));
        }).filter(function (item) {
                return isMoreNow(item.get("endEvent"));
            }));
    },
    withFriends: function (nemeFriends) {
        'use strict';
        return new EventList(this.filter(function (item) {
            return searchAnArray(item.get("friends"), nemeFriends);
        }));
    },
    withAlex_eho: function () {
        'use strict';
        return new EventList(this.filter(function (item) {
            return searchAnArray(item.get("friends"), "http://vk.com/alex_eho");
        }));
    },
    atOneTime:  function () {
        'use strict';
        return new EventList(this.map(
            function (item, index, array) {

                var MoreThisItemStart = partial(isMore, item.get("startEvent"));
                var LessThisItemEnd = partial(isLess, item.get("endEvent"));
                var EqualThisItemEnd = partial(isEqual, item.get("endEvent"));
                return array
                    .map(function (el, index, array) {
                        if (new MoreThisItemStart(el.get("startEvent"))) {
                            return el;
                        }
                    })
                    .map(function (el) {
                        if (!el) {
                            return
                        };
                        if (new  LessThisItemEnd(el.get("endEvent"))) {
                            return el;
                        }
                    });
            }
        ));
    },
    sortStartEvinte: function () {
        'use strict';
        return new EventList(this.sort(function (a, b) {
            return 0 + isMore(a.get("startEvent").getTime(), b.get("startEvent").getTime());

        }));
    }
});

var eventList = new EventList();