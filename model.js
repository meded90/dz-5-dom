/**
 * Описания собития
 * @param {Object}          eventOptions                      Обекс с параметарми
 * @param {Number | Date}   eventOptions.startEvent           Начало собития
 * @param {Number | Date}   eventOptions.endEvent             Конец события
 * @param {string}          eventOptions.name                 Заголовок
 * @param {string}          eventOptions.description          Описание
 * @param {string}          eventOptions.tegs                 Теги
 * @param {string}          eventOptions.place                Адрес собития
 * @param {string}          eventOptions.coordinates          Кардинаты собития
 * @param {string}          eventOptions.colorFon             Цвети стикира
 * @param {boolean}         eventOptions.reminders            Индекатор уведомлений
 * @param {Number | Date}   eventOptions.reminderTimeBefore   Время уведомления
 * @param {string}          eventOptions.friends              сылки на друзей из соц сетей
 *
 * @return {Object}
 */
var EventModel = Backbone.Model.extend({
    defaults: {
        startEvent: new Date(),
        endEvent: new Date(),
        name:  "Событие",
        description: "",
        tegs: undefined,
        place:  "",
        coordinates:  "",
        color:  "#fff",
        reminders:  false,
//        reminderTimeBeforeEvent: this.get(startEvent),
        friends:  undefined
    },
    initialize: function () {
        'use strict';
        this.bind("error", function (Error) {
            console.log(Error);
        });
    },
    validate: function (attrs) {
        'use strict';
        var Error = {}, regColorcode = /^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/;
        function isData(time, attr) {
            if ('string' === typeof (time)) {
                var timeToData = new Date(time);
                if ('Invalid Date' === timeToData) {
                    Error[attr] = "не верный формат даты";
                    return timeToData;
                }
            } else {
                return time;
            }
        }
        attrs.startEvent = isData(attrs.startEvent, "startEvent");
        attrs.endEvent = isData(attrs.endEvent, "endEvent");

        if (regColorcode.test(attrs.color) !== false) {
            attrs.color = "";
            Error.color = "все плохо это не цвет";
        }

        if (!_.isEmpty(Error)) {
            return Error;
        } else {
            return false;
        }
    }
});