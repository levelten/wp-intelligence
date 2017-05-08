var _l10iq = _l10iq || [];

function L10iAbr(_ioq, config) {
    var ioq = _ioq;
    var io = _ioq.io;
    this.pageHeight;
    this.viewportHeight;
    this.scrollDistanceMax;
    var $ = jQuery;

    this.init = function init() {
        console.log('L10iAbr.init');
        var $window = $(window);
        this.pageHeight = $(document).height();
        this.viewPortHeight = window.innerHeight ? window.innerHeight : $window.height();
        this.scrollDistanceMax = $window.scrollTop() + this.viewPortHeight;

        var ths = this;
        //$window.on('beforeunload', function (event) { io('abr:doUnload', event); });
        $window.on('beforeunload', function (event) { ths.doUnload(event); }); // do this for efficency

        //$('a').on('hover', function (event) { ths.doUnload(event) });
    };

    this.setStickTimeout = function setStickTimeout() {

    };

    this.checkStick = function checkStick() {

    };

    this.doUnload = function doUnload() {
        ga('set', 'transport', 'beacon');
        // detect if
        var td0, m, s, si, inc;
        var td = (window.performance) ? performance.now() / 1000 : (_ioq.getTime() - _ioq.pageviewSent);
        var tdr = Math.round(td);
        var ts = [];
        if (td < 120) {
            inc = 10;
        }
        else if (td < 300) {
            inc = 30;
        }
        else if (td < 600) {
            inc = 60;
        }

        if (inc) {
            td0 = tdr - inc;
            m = Math.floor(td0 / 60);
            s = td0 % 60;
            si = (inc * Math.floor(s / inc));
            ts.push((m < 10) ? '0' + m : m);
            ts.push(':');
            ts.push((si < 10) ? '0' + si : si);
            ts.push(' - ');
            m = Math.floor(tdr / 60);
            s = tdr % 60;
            si = (inc * Math.floor(s / inc));
            ts.push((m < 10) ? '0' + m : m);
            ts.push(':');
            ts.push((si < 10) ? '0' + si : si);
            ts = ts.join('');
        }
        else {
            ts = '10:00+';
        }

        var evtDef = {
            eventCategory: 'Page time',
            eventAction: ts,
            eventLabel: toString(tdr),
            eventValue: tdr,
            nonInteraction: true
        };
        io('event', evtDef);
        io('ga.send', 'timing', 'Page visibility', 'visible', Math.round(1000 * td));
    };



    this.init();
}

_l10iq.push(['providePlugin', 'abr', L10iAbr, {}]);