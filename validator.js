// Hàm Validator : contructor function
function Validator(options) {
    //DÙng nhiều rule cho cùng 1 trường
    var selectorRules = {};


    //Hàm thực hiện validate
    var inputElement = formElement.querySelector(rule.selector);
    var validate = function (inputElement, rule){
        var errorMessage = rule.test(inputElement.value); 
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);

                if (errorMessage){
                    errorElement.innerText = errorMessage;
                    inputElement.parentElement.classList.add('invalid');
                } else {
                    errorElement.innerText = ' ';
                    inputElement.parentElement.classList.remove('invalid');
                }
            return !errorMessage;
    }


// Lấy elements của form
    var formElement = document.querySelector(options.form);
    if (formElement){
            //khi submit form
        formElement.onsubmit = function (e){
            e.preventDefault();
            var isFormValid = true;

            //Thực hiện validate khi submit
        options.rules.forEach(function (rule){
            var inputElement = formElement.querySelector(rule.selector);
            var isValid = validate(inputElement,rule);
            if(!isValid){
                isFormValid = false;
            }
        });
        var enableInputs = formElement.querySelector('[name]:not([disabled])');
        console.log(enableInputs);

        if (isFormValid){
                 
            if (typeof options.onSubmit === 'function'){
            options.onSubmit({

            })
           }
        }

    }
        

        //lặp qua rule và xử lý sự kiện blur , input
        options.rules.forEach(function (rule){
            //lưu lại các Rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }else {
                selectorRules[rule.selector] = rule.test;
            }



            var inputElement = formElement.querySelector(rule.selector);
            if(inputElement){
                // value : inputElement.value : ng dùng nhập vào
                //test func = rule.test

                //xử lý trường hợp blur khỏi input                
                inputElement.onblur = function() {
                validate(inputElement,rule);

                //xử lý khi người dùng nhập vào input
                inputElement.oninput = function() {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                
                    errorElement.innerText = ' ';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        }
     });
 }
}


//Định nghĩa rules
// nguyên tắc rule : 
// khi có lỗi  => trả message lỗi 
// Khi hợp lệ => không trả cái gì cả
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value){  // hàm này để kiểm tra 
            return value.trim() ? undefined : 'Vui lòng nhập lại' //trim loại bỏ các
        }
    };
}

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Đây phải là email';
        }
    };
}

Validator.minLength = function (selector , min , ) {
    return {
        selector: selector,
        test: function (value) {
          return value.lenghth >= min ? undefined : `nhập lại password tối thiểu ${min} kí tự`;
        }
    };
}

Validator.isConfirmed = function (selector , getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value){  // hàm này để kiểm tra 
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    };
}
